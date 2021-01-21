export default {
  invalid: [
    {
      code: `
          /**
           * @cli-arg [0]
           */

          const firstArg = process.argv[2];
          const secondArg = process.argv[3];
      `,
      errors: [
        {
          line: 3,
          message: 'Missing @cli-tag [1] for `process.argv[3]`.',
        },
      ],
    },
  ],
  valid: [],
};
