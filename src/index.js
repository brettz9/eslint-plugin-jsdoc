import checkAccess from './rules/checkAccess.js';
import checkAlignment from './rules/checkAlignment.js';
import checkExamples from './rules/checkExamples.js';
import checkIndentation from './rules/checkIndentation.js';
import checkLineAlignment from './rules/checkLineAlignment.js';
import checkParamNames from './rules/checkParamNames.js';
import checkPropertyNames from './rules/checkPropertyNames.js';
import checkSyntax from './rules/checkSyntax.js';
import checkTagNames from './rules/checkTagNames.js';
import checkTypes from './rules/checkTypes.js';
import checkValues from './rules/checkValues.js';
import emptyTags from './rules/emptyTags.js';
import implementsOnClasses from './rules/implementsOnClasses.js';
import matchDescription from './rules/matchDescription.js';
import matchName from './rules/matchName.js';
import multilineBlocks from './rules/multilineBlocks.js';
import newlineAfterDescription from './rules/newlineAfterDescription.js';
import noBadBlocks from './rules/noBadBlocks.js';
import noDefaults from './rules/noDefaults.js';
import noMissingSyntax from './rules/noMissingSyntax.js';
import noMultiAsterisks from './rules/noMultiAsterisks.js';
import noRestrictedSyntax from './rules/noRestrictedSyntax.js';
import noTypes from './rules/noTypes.js';
import noUndefinedTypes from './rules/noUndefinedTypes.js';
import requireAsteriskPrefix from './rules/requireAsteriskPrefix.js';
import requireDescription from './rules/requireDescription.js';
import requireDescriptionCompleteSentence from './rules/requireDescriptionCompleteSentence.js';
import requireExample from './rules/requireExample.js';
import requireFileOverview from './rules/requireFileOverview.js';
import requireHyphenBeforeParamDescription from './rules/requireHyphenBeforeParamDescription.js';
import requireJsdoc from './rules/requireJsdoc.js';
import requireParam from './rules/requireParam.js';
import requireParamDescription from './rules/requireParamDescription.js';
import requireParamName from './rules/requireParamName.js';
import requireParamType from './rules/requireParamType.js';
import requireProperty from './rules/requireProperty.js';
import requirePropertyDescription from './rules/requirePropertyDescription.js';
import requirePropertyName from './rules/requirePropertyName.js';
import requirePropertyType from './rules/requirePropertyType.js';
import requireReturns from './rules/requireReturns.js';
import requireReturnsCheck from './rules/requireReturnsCheck.js';
import requireReturnsDescription from './rules/requireReturnsDescription.js';
import requireReturnsType from './rules/requireReturnsType.js';
import requireThrows from './rules/requireThrows.js';
import requireYields from './rules/requireYields.js';
import requireYieldsCheck from './rules/requireYieldsCheck.js';
import tagLines from './rules/tagLines.js';
import validTypes from './rules/validTypes.js';

export default {
  configs: {
    recommended: {
      plugins: ['jsdoc'],
      rules: {
        'jsdoc/check-access': 'warn',
        'jsdoc/check-alignment': 'warn',
        'jsdoc/check-examples': 'off',
        'jsdoc/check-indentation': 'off',
        'jsdoc/check-line-alignment': 'off',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-property-names': 'warn',
        'jsdoc/check-syntax': 'off',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/check-values': 'warn',
        'jsdoc/empty-tags': 'warn',
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/match-description': 'off',
        'jsdoc/match-name': 'off',
        'jsdoc/multiline-blocks': 'warn',
        'jsdoc/newline-after-description': 'warn',
        'jsdoc/no-bad-blocks': 'off',
        'jsdoc/no-defaults': 'off',
        'jsdoc/no-missing-syntax': 'off',
        'jsdoc/no-multi-asterisks': 'warn',
        'jsdoc/no-restricted-syntax': 'off',
        'jsdoc/no-types': 'off',
        'jsdoc/no-undefined-types': 'warn',
        'jsdoc/require-asterisk-prefix': 'off',
        'jsdoc/require-description': 'off',
        'jsdoc/require-description-complete-sentence': 'off',
        'jsdoc/require-example': 'off',
        'jsdoc/require-file-overview': 'off',
        'jsdoc/require-hyphen-before-param-description': 'off',
        'jsdoc/require-jsdoc': 'warn',
        'jsdoc/require-param': 'warn',
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-param-type': 'warn',
        'jsdoc/require-property': 'warn',
        'jsdoc/require-property-description': 'warn',
        'jsdoc/require-property-name': 'warn',
        'jsdoc/require-property-type': 'warn',
        'jsdoc/require-returns': 'warn',
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-returns-type': 'warn',
        'jsdoc/require-throws': 'off',
        'jsdoc/require-yields': 'warn',
        'jsdoc/require-yields-check': 'warn',
        'jsdoc/tag-lines': 'warn',
        'jsdoc/valid-types': 'warn',
      },
    },
  },
  rules: {
    'check-access': checkAccess,
    'check-alignment': checkAlignment,
    'check-examples': checkExamples,
    'check-indentation': checkIndentation,
    'check-line-alignment': checkLineAlignment,
    'check-param-names': checkParamNames,
    'check-property-names': checkPropertyNames,
    'check-syntax': checkSyntax,
    'check-tag-names': checkTagNames,
    'check-types': checkTypes,
    'check-values': checkValues,
    'empty-tags': emptyTags,
    'implements-on-classes': implementsOnClasses,
    'match-description': matchDescription,
    'match-name': matchName,
    'multiline-blocks': multilineBlocks,
    'newline-after-description': newlineAfterDescription,
    'no-bad-blocks': noBadBlocks,
    'no-defaults': noDefaults,
    'no-missing-syntax': noMissingSyntax,
    'no-multi-asterisks': noMultiAsterisks,
    'no-restricted-syntax': noRestrictedSyntax,
    'no-types': noTypes,
    'no-undefined-types': noUndefinedTypes,
    'require-asterisk-prefix': requireAsteriskPrefix,
    'require-description': requireDescription,
    'require-description-complete-sentence': requireDescriptionCompleteSentence,
    'require-example': requireExample,
    'require-file-overview': requireFileOverview,
    'require-hyphen-before-param-description': requireHyphenBeforeParamDescription,
    'require-jsdoc': requireJsdoc,
    'require-param': requireParam,
    'require-param-description': requireParamDescription,
    'require-param-name': requireParamName,
    'require-param-type': requireParamType,
    'require-property': requireProperty,
    'require-property-description': requirePropertyDescription,
    'require-property-name': requirePropertyName,
    'require-property-type': requirePropertyType,
    'require-returns': requireReturns,
    'require-returns-check': requireReturnsCheck,
    'require-returns-description': requireReturnsDescription,
    'require-returns-type': requireReturnsType,
    'require-throws': requireThrows,
    'require-yields': requireYields,
    'require-yields-check': requireYieldsCheck,
    'tag-lines': tagLines,
    'valid-types': validTypes,
  },
};
