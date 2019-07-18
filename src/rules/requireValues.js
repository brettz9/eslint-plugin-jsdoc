import _ from 'lodash';
import {parse} from 'jsdoctypeparser';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  context,
}) => {
  const options = context.options[0] || {};
  _.forEach(jsdoc.tags, (tag) => {
    const hasEmail = /<.+?>\s*$/;
    let authorInfo;

    // const hasEmailNoAuthor = /^\s*<.+?>\s*$/;

    switch (tag.tag) {
    case 'author':
      authorInfo = tag.source.trim().slice('@author'.length).trim();
      if (hasEmail.test(authorInfo) && options.authorEmailRequired) {
        report('Missing email for @author: ' + authorInfo, null, tag);
      }
      if (!authorInfo) {
        report('Missing author', null, tag);
      }
      break;

/*
1. Review docs for these (and above @author) to see if might just mention in
`matchDescription` rule instead (if not already mentioned)

  @summary and @file/@fileoverview/@overview, fields which are descriptive in
    content and broad in purpose
  While the current code checks classes, I'm not sure whether @classdesc can occur
  separately from a class, e.g., as its own separate comment, and if so, its
  text should also be queryable.
  Some additional fields, though fairly specialized, like @copyright,
  @see, @since, @deprecated, @todo also have descriptive text areas which should
  never or rarely be empty; @throws, @yields/@yield and @property do likewise
  along with a possible type

2. These probably need special rules or jsdoctypeparser parsing:
  https://github.com/jsdoctypeparser/jsdoctypeparser/issues/86

  Expect something additional; less like "descriptions":

- a concrete name (@class (optional), @constructs (optional)); @function (optional),
  @event or @fires/@emits or @listens (<className>#[event:]<eventName>),
  @exports, @external/@host,
  @interface, @kind, @mixin, @requires
- a type @enum (optional), @implements; @package (for Closure only),
  @private (for Closure only), @protected (for Closure only); not
  @public or @static for Closure?; @throws, @type, @typedef (type and name path))
- a type and name (@constant/@const (optional), @member/@var, @module, @namespace)
- a name path (@alias, @augments/@extends, @borrows (namepath "as"
  namepath), @callback (optional), @lends, @memberof, @mixes, @name, @see, @this)
- a value (@default/@defaultvalue) (optional); jsdoc auto-detects types:
    string, a number, a boolean or null
- a link (@link (inline), @tutorial (inline))
  - check for undefined types (@tutorial inline)
  - check for namepath (@link)
  - aliases for @link are @linkcode and @linkplain
- @tutorial (block)
  - ID (@tutorial) (what structure?)

3. These may require new specialized rules:
  (These are less like "descriptions" even if `matchDescription` regexes would
    be adequate to handle certain cases).

a. @example (require caption setting): Add to description rules, e.g., require
  description, complete sentence, newline after description (but not require
  hyphen rule, and matchDescription not needed given `check-examples`, though
  could mention `check-examples` in `matchDescription` docs as an option, as
  well as mention potential use of `matchDescription` if not using caption);
  ensure @license is mentioned in `matchDescription` too

b. requires a version or identifier be present on a particular context
  (@license, @since, @variation, @version, @author); (`check-values` ensures
  if present that it is valid, whereas this would ensure a tag is present);
  could also insist on presence of empty-tags, access tags, etc.;
  require arbitrary set of tags?

c. Though non-standard, these appear very worth supporting as well:
  1. `@promise`/`@fulfill`/`@reject` https://github.com/jsdoc/jsdoc/issues/1197#issuecomment-312948746
  2. A special form of `@since` allowing multiple items with version AND
     date/description: https://stackoverflow.com/questions/39750032/what-is-the-correct-way-to-document-changes-to-an-object-function-in-jsdoc/58485174
  3. `@use`: https://github.com/gajus/eslint-plugin-jsdoc/issues/128
*/
    }
    if (tag.type) {
      try {
        /*
          // For:
            @some-tag {Type} [optionalName=someDefault]

          "line": 0,
          "description": "Singleline or multiline description text. Line breaks are preserved.",
          "source": "................"
          "tags": [
            "tag": "some-tag",
            "type": "Type",
            "name": "optionalName",
            "optional": true,
            "description": "",
            "line": 7,
            "default": "someDefault",
            "source": "@some-tag {Type} [optionalName=someDefault]"

         */
        parse(tag.type);
      } catch (error) {
        if (error.name === 'SyntaxError') {
          report('Syntax error in type: ' + tag.type, null, tag);
        }
      }
    }
  });
});
