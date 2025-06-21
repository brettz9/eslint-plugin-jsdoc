import iterateJsdoc from '../iterateJsdoc.js';
import {
  parse as parseType,
  stringify,
  traverse,
  tryParse as tryParseType,
} from '@es-joy/jsdoccomment';

export default iterateJsdoc(({
  context,
  settings,
  utils,
}) => {
  const {
    arrayBrackets = 'square',
    enableFixer = true,
    genericDot = false,
    objectFieldQuote = null,
    propertyQuotes = null,
    propertySeparator = null,
    stringQuotes = 'single',
  } = context.options[0] || {};

  const {
    mode,
  } = settings;

  /**
   * @param {import('@es-joy/jsdoccomment').JsdocTagWithInline} tag
   */
  const checkTypeFormats = (tag) => {
    const potentialType = tag.type;
    let parsedType;
    try {
      parsedType = mode === 'permissive' ?
        tryParseType(/** @type {string} */ (potentialType)) :
        parseType(/** @type {string} */ (potentialType), mode);
    } catch {
      return;
    }

    const fix = () => {
      let typeStarted = false;
      let lastNum = tag.source[0].number - 1;
      tag.source = tag.source.flatMap(({
        tokens,
      }) => {
        lastNum++;

        if (tokens.type) {
          if (typeStarted) {
            // Already handled for type, but we need its name/description if present
            if (tokens.name || tokens.description) {
              tokens.type = '';
              tokens.postType = '';
              return {
                number: lastNum,
                source: '',
                tokens,
              };
            }

            lastNum--;
            return [];
          }

          typeStarted = true;
          const typeLines = stringify(parsedType).split('\n');
          return typeLines.map((typeLine, idx) => {
            tokens.type = (idx === 0 ? '{' : '') + typeLine +
              (idx === typeLines.length - 1 ? '}' : '');
            return {
              number: lastNum++,
              source: '',
              tokens,
            };
          });
        }

        return {
          number: lastNum,
          source: '',
          tokens,
        };
      });
    };

    /** @type {string[]} */
    const errorMessages = [];
    let needToReport = false;
    traverse(parsedType, (nde) => {
      let typeFound = true;
      let errorMessage = '';
      const initialType = stringify(
        /** @type {import('jsdoc-type-pratt-parser').RootResult} */ (nde),
      );
      switch (nde.type) {
        case 'JsdocTypeGeneric': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').GenericResult} */ (nde);
          if ('value' in typeNode.left && typeNode.left.value === 'Array') {
            typeNode.meta.brackets = arrayBrackets;
            errorMessage = `Array bracket style should be ${arrayBrackets}`;
          } else {
            typeNode.meta.dot = genericDot;
            errorMessage = `Dot usage should be ${genericDot}`;
          }

          break;
        }

        case 'JsdocTypeObject': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').ObjectResult} */ (nde);
          typeNode.meta.separator = propertySeparator ?? undefined;
          errorMessage = `Inconsistent ${propertySeparator} usage`;
          break;
        }

        case 'JsdocTypeObjectField': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').ObjectFieldResult} */ (nde);
          if (objectFieldQuote ||
            (typeof typeNode.key === 'string' && !(/\s/u).test(typeNode.key))
          ) {
            typeNode.meta.quote = objectFieldQuote ?? undefined;
            errorMessage = `Inconsistent object field quotes ${objectFieldQuote}`;
          } else {
            typeFound = false;
          }

          break;
        }

        case 'JsdocTypeProperty': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').PropertyResult} */ (nde);

          if (propertyQuotes ||
            (typeof typeNode.value === 'string' && !(/\s/u).test(typeNode.value))
          ) {
            typeNode.meta.quote = propertyQuotes ?? undefined;
            errorMessage = `Inconsistent ${propertyQuotes} property quotes usage`;
          } else {
            typeFound = false;
          }

          break;
        }

        case 'JsdocTypeStringValue': {
          const typeNode = /** @type {import('jsdoc-type-pratt-parser').StringValueResult} */ (nde);
          typeNode.meta.quote = stringQuotes;
          errorMessage = `Inconsistent ${stringQuotes} string quotes usage`;
          break;
        }

        default:
          typeFound = false;
          break;
      }

      if (typeFound) {
        const convertedType = stringify(/** @type {import('jsdoc-type-pratt-parser').RootResult} */ (nde));
        if (initialType !== convertedType) {
          needToReport = true;
          errorMessages.push(errorMessage);
        }
      }
    });

    if (needToReport) {
      for (const errorMessage of errorMessages) {
        utils.reportJSDoc(
          errorMessage, tag, enableFixer ? fix : null,
        );
      }
    }
  };

  const tags = utils.getPresentTags([
    'param',
    'returns',
  ]);
  for (const tag of tags) {
    checkTypeFormats(tag);
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Formats JSDoc type values.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/type-formatting.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          arrayBrackets: {
            enum: [
              'angle',
              'square',
            ],
          },
          enableFixer: {
            type: 'boolean',
          },
          genericDot: {
            type: 'boolean',
          },
          objectFieldQuote: {
            enum: [
              'double',
              'single',
              null,
            ],
          },
          propertyQuotes: {
            enum: [
              'double',
              'single',
              null,
            ],
          },
          propertySeparator: {
            enum: [
              'semicolon',
              'comma',
              'linebreak',
              null,
            ],
          },
          stringQuotes: {
            enum: [
              'double',
              'single',
            ],
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
