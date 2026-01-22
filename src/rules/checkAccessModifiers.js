import iterateJsdoc from '../iterateJsdoc.js';

const requireHash = 'Private elements with @private tag must use the # symbol to be truly private';
const requireNoHash = 'Private elements must not use the @public tag';
const requireAccessHash = 'Private elements with @access private tag must use the # symbol to be truly private';
const requireAccessNoHash = 'Private elements must not use the @access public tag';
const noPrivateWithHash = 'Remove @private tag - the # symbol already indicates this field is private';
const noPrivateAccessWithHash = 'Remove @access private tag - the # symbol already indicates this field is private';
const noPublicWithHash = 'Remove @public tag - the lack of a # symbol already indicates this field is public';
const noPublicAccessWithHash = 'Remove @access public tag - the lack of a # symbol already indicates this field is public';

export default iterateJsdoc(({
  context,
  jsdoc,
  node,
  utils,
}) => {
  /* c8 ignore next 3 -- Guard */
  if (!node) {
    return;
  }

  const {
    enableRedundantAccessTagsFixer = true,
    reportRedundantAccessTags = true,
  } = context.options[0] || {};

  if ((node.type === 'PropertyDefinition' || node.type === 'MethodDefinition') &&
    node.key) {
    if (utils.hasTag('private')) {
      if (node.key.type !== 'PrivateIdentifier') {
        utils.forEachPreferredTag('private', (privateNode) => {
          utils.reportJSDoc(
            requireHash,
            privateNode,
          );
        });
      } else if (reportRedundantAccessTags) {
        utils.forEachPreferredTag('private', (privateNode) => {
          utils.reportJSDoc(
            noPrivateWithHash,
            privateNode,
            enableRedundantAccessTagsFixer ?
              () => {
                jsdoc.tags.some((tag, idx) => {
                  if (tag === privateNode) {
                    utils.removeTag(idx, {
                      removeEmptyBlock: true,
                    });
                  }

                  return true;
                });
              } :
              null,
          );
        });
      }
    } else if (utils.hasTag('public')) {
      if (node.key.type === 'PrivateIdentifier') {
        utils.forEachPreferredTag('public', (publicNode) => {
          utils.reportJSDoc(
            requireNoHash,
            publicNode,
          );
        });
      } else if (reportRedundantAccessTags) {
        utils.forEachPreferredTag('public', (publicNode) => {
          utils.reportJSDoc(
            noPublicWithHash,
            publicNode,
            enableRedundantAccessTagsFixer ?
              () => {
                jsdoc.tags.some((tag, idx) => {
                  if (tag === publicNode) {
                    utils.removeTag(idx, {
                      removeEmptyBlock: true,
                    });
                  }

                  return true;
                });
              } :
              null,
          );
        });
      }
    } else if (utils.hasTag('access')) {
      utils.forEachPreferredTag('access', (accessNode) => {
        const accessType = accessNode.description.trim();
        if (accessType === 'public') {
          if (node.key.type === 'PrivateIdentifier') {
            utils.reportJSDoc(
              requireAccessNoHash,
              accessNode,
            );
          } else if (reportRedundantAccessTags) {
            utils.reportJSDoc(
              noPublicAccessWithHash,
              accessNode,
              enableRedundantAccessTagsFixer ?
                () => {
                  jsdoc.tags.some((tag, idx) => {
                    if (tag === accessNode) {
                      utils.removeTag(idx, {
                        removeEmptyBlock: true,
                      });
                    }

                    return true;
                  });
                } :
                null,
            );
          }
        } else if (accessType === 'private') {
          if (node.key.type !== 'PrivateIdentifier') {
            utils.reportJSDoc(
              requireAccessHash,
              accessNode,
            );
          } else if (reportRedundantAccessTags) {
            utils.reportJSDoc(
              noPrivateAccessWithHash,
              accessNode,
              enableRedundantAccessTagsFixer ?
                () => {
                  jsdoc.tags.some((tag, idx) => {
                    if (tag === accessNode) {
                      utils.removeTag(idx, {
                        removeEmptyBlock: true,
                      });
                    }

                    return true;
                  });
                } :
                null,
            );
          }
        }
      });
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Require # symbol on private elements (class fields and methods) that use @private JSDoc tag',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-access-modifiers.md#repos-sticky-header',
    },
    fixable: 'code',
    messages: {
      requireAccessHash,
      requireAccessNoHash,
      requireHash,
      requireNoHash,
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          enableRedundantAccessTagsFixer: {
            description: 'Whether to enable the fixer for redundant access modifier tags',
            type: 'boolean',
          },
          reportRedundantAccessTags: {
            description: 'Whether to report redundant access modifier tags like @public or @private. Defaults to `true`.',
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
