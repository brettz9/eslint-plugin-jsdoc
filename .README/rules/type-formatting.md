# `type-formatting`

Formats JSDoc type values.

Currently offers the following options for formatting types.

Note that this rule should be considered experimental. The stringification
might not preserve other aspects of your original formatting.

## Options

### `arrayBrackets`

Determines how array generics are represented. Set to `angle` for the style `Array<type>` or `square` for the style `type[]`. Defaults to "square".

### `enableFixer`

Whether to enable the fixer. Defaults to `true`.

### `genericDot`

Boolean value of whether to use a dot before the angled brackets of a generic (e.g., `SomeType.<AnotherType>`). Defaults to `false`.

### `objectFieldQuote`

Whether and how object field properties should be quoted (e.g., `{"a": string}`).
Set to `single`, `double`, or `null`. Defaults to `null` (no quotes unless
required due to whitespace within the field).

### `propertyQuotes`

Whether and how namepath properties should be quoted (e.g., `ab."cd"."ef"`).
Set to `single`, `double`, or `null`. Defaults to `null` (no quotes unless
required due to whitespace within the property).

### stringQuotes

How string literals should be quoted (e.g., `"abc"`). Set to `single`
or `double`. Defaults to 'single'.

### `propertySeparator`

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

## Failing examples

<!-- assertions-failing typeFormatting -->

## Passing examples

<!-- assertions-passing typeFormatting -->
