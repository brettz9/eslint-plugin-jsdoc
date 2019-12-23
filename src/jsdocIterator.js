// eslint-disable-next-line import/no-named-default
import {default as commentParser, stringify as commentStringify} from 'comment-parser';
import _ from 'lodash';
import jsdocUtils from './jsdocUtils';
import getJSDocComment from './eslint/getJSDocComment';

const skipSeeLink = (parser) => {
  return (str, data) => {
    if (data.tag === 'see' && str.match(/\{@link.+?\}/u)) {
      return null;
    }

    return parser(str, data);
  };
};

/**
 *
 * @param {object} commentNode
 * @param {string} indent Whitespace
 * @param {boolean} [trim=true]
 * @returns {object}
 */
const parseComment = (commentNode, indent, trim = true) => {
  // Preserve JSDoc block start/end indentation.
  return commentParser(`${indent}/*${commentNode.value}${indent}*/`, {
    // @see https://github.com/yavorskiy/comment-parser/issues/21
    parsers: [
      commentParser.PARSERS.parse_tag,
      skipSeeLink(commentParser.PARSERS.parse_type),
      skipSeeLink(
        (str, data) => {
          if ([
            'example', 'return', 'returns', 'throws', 'exception',
            'access', 'version', 'since', 'license', 'author',
          ].includes(data.tag)) {
            return null;
          }

          return commentParser.PARSERS.parse_name(str, data);
        },
      ),

      // parse_description
      (str, data) => {
        // Only expected throw in previous step is if bad name (i.e.,
        //   missing end bracket on optional name), but `@example`
        //  skips name parsing
        /* istanbul ignore next */
        if (data.errors && data.errors.length) {
          return null;
        }

        // Tweak original regex to capture only single optional space
        const result = str.match(/^ ?((.|\s)+)?/u);

        // Always has at least whitespace due to `indent` we've added
        /* istanbul ignore next */
        if (result) {
          return {
            data: {
              description: result[1] === undefined ? '' : result[1],
            },
            source: result[0],
          };
        }

        // Always has at least whitespace due to `indent` we've added
        /* istanbul ignore next */
        return null;
      },
    ],
    trim,
  })[0] || {};
};

const getUtils = (
  node,
  jsdoc,
  jsdocNode,
  {
    tagNamePreference,
    maxLines,
    minLines,
    mode,
  },
  report,
  context,
) => {
  const ancestors = context.getAncestors();
  const sourceCode = context.getSourceCode();

  const utils = {};

  utils.stringify = (tagBlock) => {
    const indent = jsdocUtils.getIndent(sourceCode);

    return commentStringify([tagBlock], {indent}).slice(indent.length - 1);
  };

  utils.getFunctionParameterNames = () => {
    return jsdocUtils.getFunctionParameterNames(node);
  };

  utils.isConstructor = () => {
    return node.parent && node.parent.kind === 'constructor';
  };

  utils.isSetter = () => {
    return node.parent.kind === 'set';
  };

  utils.getJsdocParameterNamesDeep = () => {
    const param = utils.getPreferredTagName({tagName: 'param'});
    if (!param) {
      return false;
    }

    return jsdocUtils.getJsdocParameterNamesDeep(jsdoc, param);
  };

  utils.getJsdocParameterNames = () => {
    const param = utils.getPreferredTagName({tagName: 'param'});
    if (!param) {
      return false;
    }

    return jsdocUtils.getJsdocParameterNames(jsdoc, param);
  };

  utils.getPreferredTagName = ({tagName, skipReportingBlockedTag = false, allowObjectReturn = false, defaultMessage = `Unexpected tag \`@${tagName}\``}) => {
    const ret = jsdocUtils.getPreferredTagName(context, mode, tagName, tagNamePreference);
    const isObject = ret && typeof ret === 'object';
    if (utils.hasTag(tagName) && (ret === false || isObject && !ret.replacement)) {
      if (skipReportingBlockedTag) {
        return {
          blocked: true,
          tagName,
        };
      }
      const message = isObject && ret.message || defaultMessage;
      report(message, null, utils.getTags(tagName)[0]);

      return false;
    }

    return isObject && !allowObjectReturn ? ret.replacement : ret;
  };

  utils.isValidTag = (name, definedTags) => {
    return jsdocUtils.isValidTag(context, mode, name, definedTags);
  };

  utils.hasATag = (name) => {
    return jsdocUtils.hasATag(jsdoc, name);
  };

  utils.hasTag = (name) => {
    return jsdocUtils.hasTag(jsdoc, name);
  };

  utils.tagMustHaveEitherTypeOrNamePosition = (tagName) => {
    return jsdocUtils.tagMustHaveEitherTypeOrNamePosition(tagName);
  };

  utils.tagMightHaveEitherTypeOrNamePosition = (tagName) => {
    return jsdocUtils.tagMightHaveEitherTypeOrNamePosition(mode, tagName);
  };

  utils.tagMustHaveNamePosition = (tagName) => {
    return jsdocUtils.tagMustHaveNamePosition(tagName);
  };

  utils.tagMightHaveNamePosition = (tagName) => {
    return jsdocUtils.tagMightHaveNamePosition(tagName);
  };

  utils.tagMustHaveTypePosition = (tagName) => {
    return jsdocUtils.tagMustHaveTypePosition(mode, tagName);
  };

  utils.tagMightHaveTypePosition = (tagName) => {
    return jsdocUtils.tagMightHaveTypePosition(mode, tagName);
  };

  utils.isNamepathDefiningTag = (tagName) => {
    return jsdocUtils.isNamepathDefiningTag(tagName);
  };

  utils.hasDefinedTypeReturnTag = (tag) => {
    return jsdocUtils.hasDefinedTypeReturnTag(tag);
  };

  utils.hasReturnValue = () => {
    return jsdocUtils.hasReturnValue(node);
  };

  utils.isAsync = () => {
    return node.async;
  };

  utils.getTags = (tagName) => {
    return utils.filterTags((item) => {
      return item.tag === tagName;
    });
  };

  utils.getPresentTags = (tagList) => {
    return utils.filterTags((tag) => {
      return tagList.includes(tag.tag);
    });
  };

  utils.filterTags = (filter) => {
    return jsdocUtils.filterTags(jsdoc.tags, filter);
  };

  utils.getTagsByType = (tags) => {
    return jsdocUtils.getTagsByType(context, mode, tags, tagNamePreference);
  };

  utils.getClassNode = () => {
    // Ancestors missing in `Program` comment iteration
    const greatGrandParent = ancestors.length ?
      ancestors.slice(-3)[0] :
      jsdocUtils.getAncestor(sourceCode, jsdocNode, 3);

    const greatGrandParentValue = greatGrandParent && sourceCode.getFirstToken(greatGrandParent).value;

    if (greatGrandParentValue === 'class') {
      return greatGrandParent;
    }

    return false;
  };

  utils.getClassJsdoc = () => {
    const classNode = utils.getClassNode();
    const classJsdocNode = getJSDocComment(sourceCode, classNode, {
      maxLines,
      minLines,
    });

    if (classJsdocNode) {
      const indent = ' '.repeat(classJsdocNode.loc.start.column);

      return parseComment(classJsdocNode, indent);
    }

    return null;
  };

  utils.classHasTag = (tagName) => {
    const classJsdoc = utils.getClassJsdoc();

    return classJsdoc && jsdocUtils.hasTag(classJsdoc, tagName);
  };

  utils.forEachPreferredTag = (tagName, arrayHandler, skipReportingBlockedTag = false) => {
    const targetTagName = utils.getPreferredTagName({
      skipReportingBlockedTag,
      tagName,
    });
    if (!targetTagName ||
      skipReportingBlockedTag && targetTagName && typeof targetTagName === 'object'
    ) {
      return;
    }
    const matchingJsdocTags = _.filter(jsdoc.tags || [], {
      tag: targetTagName,
    });

    matchingJsdocTags.forEach((matchingJsdocTag) => {
      arrayHandler(matchingJsdocTag, targetTagName);
    });
  };

  return utils;
};

/**
 * @typedef {ReturnType<typeof getUtils>} Utils
 * @typedef {(
 *   arg: {
 *     context: object,
 *     sourceCode: object,
 *     indent: string,
 *     jsdoc: object,
 *     jsdocNode: object,
 *     node: object | null,
 *     report: ReturnType<typeof makeReport>,
 *     utils: Utils,
 *   }
 * ) => any } JsdocVisitor
 */

/**
 * Iterate over all JSDocs, regardless of whether
 * they are attached to a function-like node.
 *
 * @param {JsdocVisitor} iterator
 * @param {{meta: any}} ruleConfig
 */
const iterateAllJsdocs = function *(iterator, ruleConfig, sourceCode) {
  const comments = sourceCode.getAllComments();

  for (const comment of comments) {
    if (!(/^\/\*\*\s/).test(sourceCode.getText(comment))) {
      return;
    }

    const sourceLine = sourceCode.lines[comment.loc.start.line - 1];
    const indent = sourceLine.charAt(0).repeat(comment.loc.start.column);
    const jsdoc = parseComment(comment, indent, !ruleConfig.noTrim);
    const jsdocNode = comment;

    yield iterator({
      indent,
      jsdoc,
      jsdocNode,
      node: null,
      sourceCode,
      utils: getUtils(null, jsdoc, jsdocNode),
    });
  }
};

export {
  parseComment,
};

/**
 * @param {JsdocVisitor} iterator
 * @param {{
 *   meta: any,
 *   contextDefaults?: true | string[],
 *   iterateAllJsdocs?: true,
 * }} ruleConfig
 */
export default function jsdocIterator (iterator, ruleConfig, sourceCode) {
  if (typeof iterator !== 'function') {
    throw new TypeError('The iterator argument must be a function.');
  }

  if (ruleConfig.iterateAllJsdocs) {
    return iterateAllJsdocs(iterator, {
      meta: ruleConfig.meta,
      noTrim: ruleConfig.noTrim,
    });
  }

  return (node) => {
    const jsdocNode = getJSDocComment(sourceCode, node);

    if (!jsdocNode) {
      return;
    }

    const sourceLine = sourceCode.lines[jsdocNode.loc.start.line - 1];

    const indent = sourceLine.charAt(0).repeat(jsdocNode.loc.start.column);

    const jsdoc = parseComment(jsdocNode, indent);

    const utils = getUtils(
      node,
      jsdoc,
      jsdocNode,
    );

    iterator({
      indent,
      jsdoc,
      jsdocNode,
      node,
      sourceCode,
      utils,
    });
  };
}
