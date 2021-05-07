import {
  getJSDocComment,
} from '@es-joy/jsdoccomment';
import {
  traverse as esFileTraverse,
} from 'es-file-traverse';
import {
  parse as parseType, traverse,
} from 'jsdoctypeparser';
import _ from 'lodash';
import iterateJsdoc, {
  parseComment,
} from '../iterateJsdoc';
import jsdocUtils from '../jsdocUtils';

const extraTypes = [
  'null', 'undefined', 'void', 'string', 'boolean', 'object',
  'function', 'symbol',
  'number', 'bigint', 'NaN', 'Infinity',
  'any', '*',
  'this', 'true', 'false',
  'Array', 'Object', 'RegExp', 'Date', 'Function',
];

const stripPseudoTypes = (str) => {
  return str && str.replace(/(?:\.|<>|\.<>|\[\])$/u, '');
};

export default iterateJsdoc(async ({
  context,
  node: jsdocNode,
  report,
  settings,
  sourceCode,
  utils,
}) => {
  const {scopeManager} = sourceCode;
  const {globalScope} = scopeManager;

  const {
    definedTypes = [],
    entryFiles = [
      // {file, cjs, node}
    ],
    jsdocConfig: {file: jsdocConfigFile},
    typeSources = ['typedefs', 'globals', 'exports', 'locals'],
  } = context.options[0] || {};

  // eslint-disable-next-line no-console
  console.log('entryFiles', entryFiles, jsdocConfigFile, typeSources);

  // No async rules yet per ESLint Discord
  // chat response from nzakas
  await Promise.all(entryFiles.map(({file, node, cjs}) => {
    if ([
      '<main>', '<exports>', '<exports.imports>', '<exports.require>',
    ].includes(file)) {
      // Todo: Replace `file` with `package.json`-pointed value
    }

    return esFileTraverse({
      /**
       * @callback PromiseReturner
       * @returns {Promise<void>}
       */
      /**
       * @typedef {PlainObject} ESFileTraverseInfo
       * @property {string} fullPath
       * @property {string} text
       * @property {AST} ast
       * @property {"esm"|"cjs"|"amd"} [type]
       * @property {PromiseReturner[]} [promMethods]
       * @property {Set<string>} [resolvedSet]
       */
      /**
       * @param {"enter"|"exit"} state
       * @param {ESFileTraverseInfo} info
       * @returns {void}
       */
      callback (state, info) {
        // Todo: Handle
        // eslint-disable-next-line no-console
        console.log('state', state, info);
      },

      cjs,
      file,
      node,
    });
  }));

  let definedPreferredTypes = [];
  const {preferredTypes, structuredTags, mode} = settings;
  if (Object.keys(preferredTypes).length) {
    definedPreferredTypes = Object.values(preferredTypes).map((preferredType) => {
      if (typeof preferredType === 'string') {
        // May become an empty string but will be filtered out below
        return stripPseudoTypes(preferredType);
      }
      if (!preferredType) {
        return undefined;
      }
      if (typeof preferredType !== 'object') {
        utils.reportSettings(
          'Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.',
        );
      }

      return stripPseudoTypes(preferredType.replacement);
    }).filter((preferredType) => {
      return preferredType;
    });
  }

  const typedefDeclarations = _(context.getAllComments())
    .filter((comment) => {
      return comment.value.startsWith('*');
    })
    .map((commentNode) => {
      return parseComment(commentNode, '');
    })
    .flatMap((doc) => {
      return doc.tags.filter(({tag}) => {
        return utils.isNamepathDefiningTag(tag);
      });
    })
    .map((tag) => {
      return tag.name;
    })
    .value();

  const ancestorNodes = [];
  let currentScope = scopeManager.acquire(jsdocNode);

  while (currentScope && currentScope.block.type !== 'Program') {
    ancestorNodes.push(currentScope.block);
    currentScope = currentScope.upper;
  }

  // `currentScope` may be `null` or `Program`, so in such a case,
  //  we look to present tags instead
  let templateTags = ancestorNodes.length ?
    _(ancestorNodes).flatMap((ancestorNode) => {
      const commentNode = getJSDocComment(sourceCode, ancestorNode, settings);
      if (!commentNode) {
        return [];
      }

      const jsdoc = parseComment(commentNode, '');

      return jsdocUtils.filterTags(jsdoc.tags, (tag) => {
        return 'template' === tag.tag;
      });
    }).value() :
    utils.getPresentTags('template');

  const classJsdoc = utils.getClassJsdoc();
  if (classJsdoc?.tags) {
    templateTags = templateTags.concat(
      classJsdoc.tags
        .filter(({tag}) => {
          return tag === 'template';
        }),
    );
  }

  const closureGenericTypes = _.flatMap(templateTags, (tag) => {
    return utils.parseClosureTemplateTag(tag);
  });

  // In modules, including Node, there is a global scope at top with the
  //  Program scope inside
  const cjsOrESMScope = globalScope.childScopes[0]?.block.type === 'Program';

  const allDefinedTypes = new Set(globalScope.variables.map(({name}) => {
    return name;
  })

    // If the file is a module, concat the variables from the module scope.
    .concat(
      cjsOrESMScope ?
        _.flatMap(globalScope.childScopes, ({variables}) => {
          return variables;
        }, []).map(({name}) => {
          return name;
        }) : [],
    )
    .concat(extraTypes)
    .concat(typedefDeclarations)
    .concat(definedTypes)
    .concat(definedPreferredTypes)
    .concat(settings.mode === 'jsdoc' ? [] : closureGenericTypes));

  const jsdocTagsWithPossibleType = utils.filterTags(({tag}) => {
    return utils.tagMightHaveTypePosition(tag);
  });

  jsdocTagsWithPossibleType.forEach((tag) => {
    let parsedType;

    try {
      parsedType = parseType(tag.type, {mode});
    } catch {
      // On syntax error, will be handled by valid-types.
      return;
    }

    traverse(parsedType, ({type, name}) => {
      if (type === 'NAME') {
        const structuredTypes = structuredTags[tag.tag]?.type;
        if (!allDefinedTypes.has(name) &&
          (!Array.isArray(structuredTypes) || !structuredTypes.includes(name))
        ) {
          report(`The type '${name}' is undefined.`, null, tag);
        } else if (!extraTypes.includes(name)) {
          context.markVariableAsUsed(name);
        }
      }
    });
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Checks that types in jsdoc comments are defined.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-undefined-types',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          definedTypes: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          entryFiles: {
            items: {
              properties: {
                cjs: {
                  type: 'boolean',
                },
                file: {
                  items: {
                    type: 'string',
                  },
                  type: 'array',
                },
                node: {
                  type: 'boolean',
                },
              },
              require: ['file'],
              type: 'object',
            },
            type: 'array',
          },
          jsdocConfig: {
            properties: {
              file: {
                type: 'string',
              },
            },
            type: 'object',
          },
          typeSources: {
            items: {
              enum: [
                'globals', 'exports', 'locals',
              ],
              type: 'string',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
