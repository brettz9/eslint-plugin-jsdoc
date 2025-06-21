<a name="user-content-type-formatting"></a>
<a name="type-formatting"></a>
# <code>type-formatting</code>

Formats JSDoc type values.

Currently offers the following options for formatting types.

Note that this rule should be considered experimental. The stringification
might not preserve other aspects of your original formatting.

<a name="user-content-type-formatting-options"></a>
<a name="type-formatting-options"></a>
## Options

<a name="user-content-type-formatting-options-arraybrackets"></a>
<a name="type-formatting-options-arraybrackets"></a>
### <code>arrayBrackets</code>

Determines how array generics are represented. Set to `angle` for the style `Array<type>` or `square` for the style `type[]`. Defaults to "square".

<a name="user-content-type-formatting-options-enablefixer"></a>
<a name="type-formatting-options-enablefixer"></a>
### <code>enableFixer</code>

Whether to enable the fixer. Defaults to `true`.

<a name="user-content-type-formatting-options-genericdot"></a>
<a name="type-formatting-options-genericdot"></a>
### <code>genericDot</code>

Boolean value of whether to use a dot before the angled brackets of a generic (e.g., `SomeType.<AnotherType>`). Defaults to `false`.

<a name="user-content-type-formatting-options-objectfieldquote"></a>
<a name="type-formatting-options-objectfieldquote"></a>
### <code>objectFieldQuote</code>

Whether and how object field properties should be quoted (e.g., `{"a": string}`).
Set to `single`, `double`, or `null`. Defaults to `null` (no quotes unless
required due to whitespace within the field).

<a name="user-content-type-formatting-options-propertyquotes"></a>
<a name="type-formatting-options-propertyquotes"></a>
### <code>propertyQuotes</code>

Whether and how namepath properties should be quoted (e.g., `ab."cd"."ef"`).
Set to `single`, `double`, or `null`. Defaults to `null` (no quotes unless
required due to whitespace within the property).

<a name="user-content-type-formatting-options-stringquotes"></a>
<a name="type-formatting-options-stringquotes"></a>
### stringQuotes

How string literals should be quoted (e.g., `"abc"`). Set to `single`
or `double`. Defaults to 'single'.

<a name="user-content-type-formatting-options-propertyseparator"></a>
<a name="type-formatting-options-propertyseparator"></a>
### <code>propertySeparator</code>

For object properties, specify whether a "semicolon", "comma",
or "linebreak" should be used after each object property-value pair.

Defaults to `null` which is equivalent to "semicolon".

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options|`arrayBrackets`, `enableFixer`, `genericDot`, `objectFieldQuote`, `propertyQuotes`, `propertySeparator`, `stringQuotes`|

<a name="user-content-type-formatting-failing-examples"></a>
<a name="type-formatting-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {{a: string; b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"propertySeparator":"semicolon"}]
// Message: Inconsistent semicolon usage

/**
 * @param {{a: string; b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"enableFixer":false,"propertySeparator":"semicolon"}]
// Message: Inconsistent semicolon usage

/**
 * @param {{a: string, b: number; c: boolean;}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"propertySeparator":"comma"}]
// Message: Inconsistent comma usage

/**
 * @param {{a: string, b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"propertySeparator":"linebreak"}]
// Message: Inconsistent linebreak usage

/**
 * @param {'abc'} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"stringQuotes":"double"}]
// Message: Inconsistent double string quotes usage

/**
 * @param {Array<string>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"arrayBrackets":"square"}]
// Message: Array bracket style should be square

/**
 * @param {SomeType<string>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"genericDot":true}]
// Message: Dot usage should be true

/**
 * @param {{a: string}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldQuote":"double"}]
// Message: Inconsistent object field quotes double

/**
 * @param {ab.cd.ef} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"propertyQuotes":"double"}]
// Message: Inconsistent double property quotes usage
````



<a name="user-content-type-formatting-passing-examples"></a>
<a name="type-formatting-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {{a: string; b: number; c: boolean}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"propertySeparator":"semicolon"}]

/**
 * @param {"abc"} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"stringQuotes":"double"}]

/**
 * @param {string[]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"arrayBrackets":"square"}]

/**
 * @param {SomeType.<string>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"genericDot":true}]

/**
 * Due to jsdoc-type-pratt-parser representing the separator at the
 *   object level, this will not be reported.
 * @param {{a: string, b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"propertySeparator":"comma"}]

/**
 * @param {A<} badParam
 */

/**
 * @param {{"a bc": string}} quotedKeyParam
 */

/**
 * @param {ab.cd.ef} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"propertyQuotes":null}]

/**
 * @param {ab."cd ef".gh} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"propertyQuotes":null}]
````

