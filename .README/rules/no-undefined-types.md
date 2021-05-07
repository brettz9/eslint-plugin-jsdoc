### `no-undefined-types`

Checks that types in jsdoc comments are defined. This can be used to check
unimported types.

When enabling this rule, types in jsdoc comments will resolve as used
variables, i.e. will not be marked as unused by `no-unused-vars`.

In addition to considering globals found in code (or in ESLint-indicated
`globals`) as defined, the following tags will also be checked for
name(path) definitions to also serve as a potential "type" for checking
the tag types in the table below:

`@callback`, `@class` (or `@constructor`), `@constant` (or `@const`),
`@event`, `@external` (or `@host`), `@function` (or `@func` or `@method`),
`@interface`, `@member` (or `@var`), `@mixin`, `@name`, `@namespace`,
`@template` (for "closure" or "typescript" `settings.jsdoc.mode` only),
`@typedef`.

The following tags will also be checked but only when the mode is `closure`:

`@package`, `@private`, `@protected`, `@public`, `@static`

The following types are always considered defined.

- `null`, `undefined`, `void`, `string`, `boolean`, `object`,
  `function`, `symbol`
- `number`, `bigint`, `NaN`, `Infinity`
- `any`, `*`
- `this`, `true`, `false`
- `Array`, `Object`, `RegExp`, `Date`, `Function`

Note that preferred types indicated within `settings.jsdoc.preferredTypes` will
also be assumed to be defined.

Also note that if there is an error [parsing](https://github.com/jsdoctypeparser/jsdoctypeparser)
types for a tag, the function will silently ignore that tag, leaving it to
the `valid-types` rule to report parsing errors.

If you define your own tags, you can use `settings.jsdoc.structuredTags`
to indicate that a tag's `name` is "namepath-defining" (and should prevent
reporting on use of that namepath elsewhere) and/or that a tag's `type` is
`false` (and should not be checked for types). If the `type` is an array, that
array's items will be considered as defined for the purposes of that tag.

#### Options

An option object may have the following keys, helping indicate types or
file sources of types:

- `definedTypes` - This array can be populated to indicate other types which
  are automatically considered as defined (in addition to globals, etc.).
  Defaults to an empty array.

- `entryFiles` - Array of entry files objects indicating JavaScript or HTML
  files whose `import` or `require` statements should be resolved recursively
  and be analyzed for `@typedef`'s, globals, etc. (see `typeSources`) to treat
  as "defined" for the purposes of this rule. Each object should have a
  `file` array and with an optional `node` boolean property to indicate whether
  to use the Node Resolution Algorithm (e.g., for Node.js) and/or a `cjs`
  boolean property (if following `require`) properties. Set one of the `file`
  items to `<main>`, `<exports>`, `<exports.imports>`, or `<exports.require>`
  to use the file referenced in the correpsonding property in `package.json`.

- `jsdocConfig` - Object with:
  - `file` string pointing to a path for a
    [jsdoc config file](https://jsdoc.app/about-configuring-jsdoc.html)
    which will be parsed for [input files](https://jsdoc.app/about-configuring-jsdoc.html#specifying-input-files),
    including `include`, `exclude`, `includePattern`, and `excludePattern`
    properties within the file as well as `opts.recurse`. See `entryFiles`
    on how the (JavaScript) files will be treated (with
    `sourceType: 'module'` in the jsdoc config file causing "cjs" to be
    set to `false`).

- `typeSources` - Array with `globals`, `exports`, and/or `locals` indicating
    the source types that will be treated as valid types when found in the
    current file or any entry files (`locals` will only apply to the
    current file). Defaults to `['typedefs', 'globals', 'exports', 'locals']`.

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Recommended|true|
|Options|`definedTypes`|
|Settings|`preferredTypes`, `mode`, `structuredTags`|

<!-- assertions noUndefinedTypes -->
