export default {
  invalid: [
    {
      code: `
        /**
         * @param {{a: string; b: number; c: boolean,}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent semicolon usage',
        },
      ],
      options: [
        {
          propertySeparator: 'semicolon',
        },
      ],
      output: `
        /**
         * @param {{a: string; b: number; c: boolean}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a: string; b: number; c: boolean,}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent semicolon usage',
        },
      ],
      options: [
        {
          enableFixer: false,
          propertySeparator: 'semicolon',
        },
      ],
    },
    {
      code: `
        /**
         * @param {{a: string, b: number; c: boolean;}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent comma usage',
        },
      ],
      options: [
        {
          propertySeparator: 'comma',
        },
      ],
      output: `
        /**
         * @param {{a: string, b: number, c: boolean}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a: string, b: number; c: boolean,}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent linebreak usage',
        },
      ],
      options: [
        {
          propertySeparator: 'linebreak',
        },
      ],
      output: `
        /**
         * @param {{a: string
         * b: number
         * c: boolean
         * }} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {'abc'} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent double string quotes usage',
        },
      ],
      options: [
        {
          stringQuotes: 'double',
        },
      ],
      output: `
        /**
         * @param {"abc"} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {Array<string>} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Array bracket style should be square',
        },
      ],
      options: [
        {
          arrayBrackets: 'square',
        },
      ],
      output: `
        /**
         * @param {string[]} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {SomeType<string>} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Dot usage should be true',
        },
      ],
      options: [
        {
          genericDot: true,
        },
      ],
      output: `
        /**
         * @param {SomeType.<string>} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {{a: string}} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent object field quotes double',
        },
      ],
      options: [
        {
          objectFieldQuote: 'double',
        },
      ],
      output: `
        /**
         * @param {{"a": string}} cfg
         */
      `,
    },
    {
      code: `
        /**
         * @param {ab.cd.ef} cfg
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inconsistent double property quotes usage',
        },
        {
          line: 3,
          message: 'Inconsistent double property quotes usage',
        },
      ],
      options: [
        {
          propertyQuotes: 'double',
        },
      ],
      output: `
        /**
         * @param {ab."cd"."ef"} cfg
         */
      `,
    },
  ],
  valid: [
    {
      code: `
        /**
         * @param {{a: string; b: number; c: boolean}} cfg
         */
      `,
      options: [
        {
          propertySeparator: 'semicolon',
        },
      ],
    },
    {
      code: `
        /**
         * @param {"abc"} cfg
         */
      `,
      options: [
        {
          stringQuotes: 'double',
        },
      ],
    },
    {
      code: `
        /**
         * @param {string[]} cfg
         */
      `,
      options: [
        {
          arrayBrackets: 'square',
        },
      ],
    },
    {
      code: `
        /**
         * @param {SomeType.<string>} cfg
         */
      `,
      options: [
        {
          genericDot: true,
        },
      ],
    },
    {
      code: `
        /**
         * Due to jsdoc-type-pratt-parser representing the separator at the
         *   object level, this will not be reported.
         * @param {{a: string, b: number; c: boolean,}} cfg
         */
      `,
      options: [
        {
          propertySeparator: 'comma',
        },
      ],
    },
    {
      code: `
        /**
         * @param {A<} badParam
         */
      `,
    },
    {
      code: `
        /**
         * @param {{"a bc": string}} quotedKeyParam
         */
      `,
    },
    {
      code: `
        /**
         * @param {ab.cd.ef} cfg
         */
      `,
      options: [
        {
          propertyQuotes: null,
        },
      ],
    },
    {
      code: `
        /**
         * @param {ab."cd ef".gh} cfg
         */
      `,
      options: [
        {
          propertyQuotes: null,
        },
      ],
    },
  ],
};
