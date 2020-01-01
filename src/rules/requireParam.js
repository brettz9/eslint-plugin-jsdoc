import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  utils,
}) => {
  const functionParameterNames = utils.getFunctionParameterNames();
  const jsdocParameterNames = utils.getJsdocTagsDeep('param');
  if (!jsdocParameterNames) {
    return;
  }

  if (utils.avoidDocs()) {
    return;
  }

  // Param type is specified by type in @type
  if (utils.hasTag('type')) {
    return;
  }

  const preferredTagName = utils.getPreferredTagName({tagName: 'param'});

  const findExpectedIndex = (jsdocTags, indexAtFunctionParams) => {
    const functionTags = jsdocTags.filter(({tag}) => {
      return tag === preferredTagName;
    });
    let expectedIndex = jsdocTags.length;
    jsdocTags.forEach((tag, index) => {
      if (tag.tag === preferredTagName) {
        expectedIndex = index;
        if (functionTags.indexOf(tag) < indexAtFunctionParams) {
          expectedIndex += 1;
        }
      }
    });

    return expectedIndex;
  };

  const missingTags = [];

  functionParameterNames.forEach((functionParameterName, functionParameterIdx) => {
    if (functionParameterName && typeof functionParameterName === 'object' &&
      functionParameterName.type === 'ArrayPattern'
    ) {
      // No formal array destructuring syntax in jsdoc yet: https://github.com/google/closure-compiler/issues/1970
      return;
    }

    // Todo: Handle `functionParameterName.names` and `jsdocParameterNames`
    //   with periods
    /**
    Cases:
    1. OK: jsdocParameterNames with no period; functionParameterName as string
    2. OK: jsdocParameterNames with period; functionParameterName.names
    3. BAD: jsdocParameterNames with no period; functionParameterName.names
    4. BAD: jsdocParameterNames with period; functionParameterName as string
    5. BAD: jsdocParameterNames with period but no preceding non-nested
    */
    if (jsdocParameterNames && !jsdocParameterNames.find(({name}) => {
      return name === functionParameterName;
    })) {
      missingTags.push({
        functionParameterIdx,
        functionParameterName,
      });
    }
  });

  const fixAll = (missings, tags) => {
    missings.forEach(({functionParameterIdx, functionParameterName}) => {
      const expectedIdx = findExpectedIndex(tags, functionParameterIdx);
      tags.splice(expectedIdx, 0, {
        name: functionParameterName,
        tag: preferredTagName,
      });
    });
  };

  missingTags.forEach(({functionParameterName}, index) => {
    // Fix all missing tags the first time.
    const fixer = index > 0 ? null : () => {
      if (!jsdoc.tags) {
        jsdoc.tags = [];
      }

      fixAll(missingTags, jsdoc.tags);
    };
    utils.reportJSDoc(`Missing JSDoc @${preferredTagName} "${functionParameterName}" declaration.`, null, fixer);
  });
}, {
  meta: {
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          exemptedBy: {
            items: {
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
