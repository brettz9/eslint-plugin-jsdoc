### `require-param`

Requires that all function parameters are documented.

#### Options

An options object accepts one optional property:

- `exemptedBy` - Array of tags (e.g., `['type']`) whose presence on the
    document block avoids the need for a `@param`. Defaults to an empty array.
- `permittedTags` - Array of tags (e.g., `['typedef']`) whose presence will
    indicate that the rule will only be enforced when the whitelisted tags
    are present. (When absent, the default behavior will be followed of the
    rule being enforced on all blocks in all allowable contexts (assuming
    there are no `exemptedBy` tags present).)

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Options|`exemptedBy`, `permittedTags`|
|Settings|`overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

<!-- assertions requireParam -->
