import iterateJsdoc, {
  parseComment,
} from '../iterateJsdoc.js';
import {
  commentParserToESTree,
  estreeToString,
  // getJSDocComment,
  parse as parseType,
  stringify,
  traverse,
  tryParse as tryParseType,
} from '@es-joy/jsdoccomment';
import {
  parseImportsExports,
} from 'parse-imports-exports';

export default iterateJsdoc(({
  context,
  jsdoc,
  settings,
  sourceCode,
  utils,
}) => {
  const {
    mode,
  } = settings;

  const {
    enableFixer = true,
    exemptTypedefs = true,
    outputType = 'namespaced-import',
  } = context.options[0] || {};

  const allComments = sourceCode.getAllComments();
  const comments = allComments
    .filter((comment) => {
      return (/^\*(?!\*)/v).test(comment.value);
    })
    .map((commentNode) => {
      return commentParserToESTree(
        parseComment(commentNode, ''), mode === 'permissive' ? 'typescript' : mode,
      );
    });

  const typedefs = comments
    .flatMap((doc) => {
      return doc.tags.filter(({
        tag,
      }) => {
        return utils.isNamepathDefiningTag(tag);
      });
    });

  const imports = comments
    .flatMap((doc) => {
      return doc.tags.filter(({
        tag,
      }) => {
        return tag === 'import';
      });
    }).map((tag) => {
      // Causes problems with stringification otherwise
      tag.delimiter = '';
      return tag;
    });

  /**
   * @param {import('@es-joy/jsdoccomment').JsdocTagWithInline} tag
   */
  const iterateInlineImports = (tag) => {
    const potentialType = tag.type;
    let parsedType;
    try {
      parsedType = mode === 'permissive' ?
        tryParseType(/** @type {string} */ (potentialType)) :
        parseType(/** @type {string} */ (potentialType), mode);
    } catch {
      return;
    }

    traverse(parsedType, (nde, parentNode) => {
      // @ts-expect-error Adding our own property for use below
      nde.parentNode = parentNode;
    });

    traverse(parsedType, (nde) => {
      const {
        element,
        type,
      } = /** @type {import('jsdoc-type-pratt-parser').ImportResult} */ (nde);
      if (type === 'JsdocTypeImport') {
        let currentNode = nde;

        /** @type {string[]} */
        const pathSegments = [];

        /** @type {import('jsdoc-type-pratt-parser').NamePathResult[]} */
        const nodes = [];

        /** @type {string[]} */
        const extraPathSegments = [];

        /** @type {(import('jsdoc-type-pratt-parser').QuoteStyle|undefined)[]} */
        const quotes = [];

        const propertyOrBrackets = /** @type {import('jsdoc-type-pratt-parser').NamePathResult['pathType'][]} */ ([]);

        // @ts-expect-error Referencing our own property added above
        while (currentNode && currentNode.parentNode) {
          // @ts-expect-error Referencing our own property added above
          currentNode = currentNode.parentNode;
          if (currentNode.type !== 'JsdocTypeNamePath') {
            break;
          }

          pathSegments.unshift(currentNode.right.value);
          nodes.unshift(currentNode);
          propertyOrBrackets.unshift(currentNode.pathType);
          quotes.unshift(currentNode.right.meta.quote);
        }

        const findMatchingTypedef = () => {
          const pthSegments = [
            ...pathSegments,
          ];
          return typedefs.find((typedef) => {
            let typedefNode = typedef.parsedType;
            let namepathMatch;
            while (typedefNode && typedefNode.type === 'JsdocTypeNamePath') {
              const pathSegment = pthSegments.shift();
              if (!pathSegment) {
                namepathMatch = false;
                break;
              }

              if (typedefNode.right.value !== pathSegment) {
                if (namepathMatch === true) {
                  // It stopped matching, so stop
                  break;
                }

                extraPathSegments.push(pathSegment);
                namepathMatch = false;
                continue;
              }

              namepathMatch = true;

              typedefNode = typedefNode.left;
            }

            return namepathMatch &&

              // `import('eslint')` matches
              typedefNode &&
              typedefNode.type === 'JsdocTypeImport' &&
              typedefNode.element.value === element.value;
          });
        };

        // Check @typedef's first as should be longest match, allowing
        //   for shorter abbreviations
        const matchingTypedef = findMatchingTypedef();
        if (matchingTypedef) {
          utils.reportJSDoc('Inline `import()` found; use `@typedef`', tag, enableFixer ? () => {
            /** @type {import('jsdoc-type-pratt-parser').NamePathResult|undefined} */
            const node = nodes.at(0);
            if (!node) {
              throw new Error('TS');
            }

            const keys = /** @type {(keyof import('jsdoc-type-pratt-parser').NamePathResult)[]} */ (
              Object.keys(node)
            );

            for (const key of keys) {
              delete node[key];
            }

            if (extraPathSegments.length) {
              let newNode = /** @type {import('jsdoc-type-pratt-parser').NamePathResult} */ (
                /** @type {unknown} */
                (node)
              );
              while (extraPathSegments.length && newNode) {
                newNode.type = 'JsdocTypeNamePath';
                newNode.right = {
                  meta: {
                    quote: quotes.shift(),
                  },
                  type: 'JsdocTypeProperty',
                  value: /** @type {string} */ (extraPathSegments.shift()),
                };

                newNode.pathType = /** @type {import('jsdoc-type-pratt-parser').NamePathResult['pathType']} */ (
                  propertyOrBrackets.shift()
                );
                // @ts-expect-error Temporary
                newNode.left = {};
                newNode = /** @type {import('jsdoc-type-pratt-parser').NamePathResult} */ (
                  newNode.left
                );
              }

              const nameNode = /** @type {import('jsdoc-type-pratt-parser').NameResult} */ (
                /** @type {unknown} */
                (newNode)
              );
              nameNode.type = 'JsdocTypeName';
              nameNode.value = matchingTypedef.name;
            } else {
              const newNode = /** @type {import('jsdoc-type-pratt-parser').NameResult} */ (
                /** @type {unknown} */
                (node)
              );
              newNode.type = 'JsdocTypeName';
              newNode.value = matchingTypedef.name;
            }

            for (const src of tag.source) {
              if (src.tokens.type) {
                src.tokens.type = `{${stringify(parsedType)}}`;
                break;
              }
            }
          } : null);
        }

        const findMatchingImport = () => {
          for (const imprt of imports) {
            const parsedImport = parseImportsExports(
              estreeToString(imprt).replace(/^\s*@/v, '').trim(),
            );

            const namedImportsModuleSpecifier = Object.keys(parsedImport.namedImports || {})[0];

            const namedImports = Object.values(parsedImport.namedImports || {})[0]?.[0];
            const namedImportNames = (namedImports && namedImports.names && Object.keys(namedImports.names)) ?? [];

            const namespaceImports = Object.values(parsedImport.namespaceImports || {})[0]?.[0];

            const namespaceImportsDefault = namespaceImports && namespaceImports.default;
            const namespaceImportsNamespace = namespaceImports && namespaceImports.namespace;
            const namespaceImportsModuleSpecifier = Object.keys(parsedImport.namespaceImports || {})[0];

            const lastPathSegment = pathSegments.at(-1);

            if (
              (namespaceImportsDefault &&
                namespaceImportsModuleSpecifier === element.value) ||
              (element.value === namedImportsModuleSpecifier && (
                (lastPathSegment && namedImportNames.includes(lastPathSegment)) ||
                (pathSegments.length === 1 && lastPathSegment === 'default') ||
                namespaceImportsNamespace
              ))
            ) {
              return {
                namedImportNames,
                namedImportsModuleSpecifier,
                namespaceImports,
                namespaceImportsDefault,
                namespaceImportsModuleSpecifier,
              };
            }

            console.log('1111', estreeToString(imprt).replace(/^\s*@/v, '').trim());
          }

          return undefined;
        };

        const matchingImport = findMatchingImport();
        if (matchingImport) {
          console.log('ok1');
        }
      }
    });
  };

  for (const tag of jsdoc.tags) {
    const mightHaveTypePosition = utils.tagMightHaveTypePosition(tag.tag);
    const hasTypePosition = mightHaveTypePosition === true && Boolean(tag.type);
    if (hasTypePosition && (!exemptTypedefs || !utils.isNamepathDefiningTag(tag.tag))) {
      iterateInlineImports(tag);
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Prefer `@import` tags to inline `import()` statements.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/prefer-import-tag.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          enableFixer: {
            description: 'Whether or not to enable the fixer to add `@import` tags.',
            type: 'boolean',
          },
          exemptTypedefs: {
            description: 'Whether to allow `import()` statements within `@typedef`',
            type: 'boolean',
          },

          // We might add `typedef` and `typedef-local-only`, but also raises
          //   question of how deep the generated typedef should be
          outputType: {
            description: 'What kind of `@import` to generate when no matching `@typedef` or `@import` is found',
            enum: [
              'named-import',
              'namespaced-import',
            ],
            type: 'string',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
