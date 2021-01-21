/* eslint jsdoc/check-tag-names: ['error', {definedTags: ['cli-arg', 'stderr', 'stdout']}] */

/**
 * @file Node command line script for adding two numbers
 * @cli-arg {number} number1|n1 The first number (called as `--number1` or `-n1`)
 * @cli-arg {number} [number2|n2=0] The second number (called as `--number2` or `-n2`). Defaults to 0.
 * @stderr A message that an argument was not a number
 * @stdout {number} The added result
 */

/**
 * @file Node command line script for adding two numbers
 * @cli-arg {number} 0 The first number
 * @cli-arg {number} [1=0] The second number. Defaults to 0.
 * @stderr A message that an argument was not a number
 * @stdout {number} The added result
 */

/**
 * @cli-arg {...number} [0] The numbers to add
 * @cli-arg {...number} [num|n] The numbers to add
 */

import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  context,
  report,
  utils,
}) => {
  // eslint-disable-next-line no-console
  console.log('ccc', context, report, utils);

  // https://github.com/jsdoc/jsdoc/issues/1750

  // Predefine but overridable selectors array with selectors for `commander`,
  //   `command-line-args`, `command-line-basics`, `optimist`, etc. (requiring
  //   or import statements if not usage); even detect the structuring to
  //   insist the names are documented; might also use approach of Node plugin
  //   of checking whether the file is specified as `bin` in `package.json`
  //   and ensuring at least one `@cli-arg` is present or if it doesn't take
  //   arguments, maybe another `@cli` tag?

  // Option to check that if tag used that process.argv exists?

  // Check tag structure
  // Convert it to schema with jsdoc-jsonschema and channel to command-line-args?

  // 'MemberExpression[object.name="process"][object.type="Identifier"] > Identifier[name="argv"]';
  /*
abc.def

function a () {
    const process = {};
    abc(process.argv)
}

const def = process.argv[1];

const [b, c, xyz] = process.argv;
*/

  /*
  const {checkArgv0, checkArgv1, checkExecArgv} = context.options[0] ?? {};

  // Todo: Check for `process.argv` (positional or destructured)
  // Todo: Report duplicate positional params/names
  // Todo: Use `checkArgv0` (also checks process.argv0?), `checkArgv1`, `checkExecArgv`
  utils.forEachPreferredTag('cli-arg', (jsdocParameter, targetTagName) => {
    const {name} = jsdocParameter;

    if (!accessLevels.includes(desc.trim())) {
      report(
        `Missing valid JSDoc @${targetTagName} level.`,
        null,
        jsdocParameter,
      );
    }
  });
  */
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Checks that `@cli-arg` tags exist for `process.argv`.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-cli-args',
    },
    type: 'suggestion',
  },
});
