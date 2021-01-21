### `require-cli-args`

Expects a (non-standard) `@cli-arg` for each `process.argv` above `2` found on
the page (or at least a single one if `process.argv` is used but not
destructured or otherwise detected for number of arguments in use).

Note that because this tag and its structure is experimental, changes may be
made in the future to the expected structure.

#### Options

While these options may not normally be needed, as their semantics are
universal to Node, one might use them to document *whether* one's script is
making explicit use of these and if so, how.

- `checkArgv0` - Requires that `process.argv[0]` is documented. Defaults to
    `false`. Should not normally be needed as refers to the Node executable path.
- `checkArgv1` - Requires that `process.argv[1]` is documented. Defaults to
    `false`. Should not normally be needed as refers to the current file path.
- `checkExecArgv` - Checks that `process.execArgv` is documented. Defaults to
    `false`. Should not normally be needed as refers to arguments passed in to
    Node itself.

|||
|---|---|
|Context|everywhere|
|Tags|`@cli-arg`|
|Recommended|false|
|Settings||
|Options||

<!-- assertions requireCliArgs -->
