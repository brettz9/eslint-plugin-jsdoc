export default /** @type {import('../index.js').TestCases} */ ({
  invalid: [
    {
      code: `
          /**
           * @typedef {object} SomeTypedef
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @property.',
        },
      ],
      output: `
          /**
           * @typedef {object} SomeTypedef
           * @property
           */
      `,
    },
    {
      code: `
      class Test {
          /**
           * @typedef {object} SomeTypedef
           */
          quux () {}
      }
      `,
      errors: [
        {
          line: 3,
          message: 'Missing JSDoc @property.',
        },
      ],
      output: `
      class Test {
          /**
           * @typedef {object} SomeTypedef
           * @property
           */
          quux () {}
      }
      `,
    },
    {
      code: `
          /**
           * @typedef {PlainObject} SomeTypedef
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @prop.',
        },
      ],
      output: `
          /**
           * @typedef {PlainObject} SomeTypedef
           * @prop
           */
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            property: 'prop',
          },
        },
      },
    },
    {
      code: `
          /**
           * @namespace {Object} SomeName
           */
      `,
      errors: [
        {
          line: 2,
          message: 'Missing JSDoc @property.',
        },
      ],
      output: `
          /**
           * @namespace {Object} SomeName
           * @property
           */
      `,
    },
  ],
  valid: [
    {
      code: `
        /**
         *
         */
      `,
    },
    {
      code: `
        /**
         * @property
         */
      `,
    },
    {
      code: `
          /**
           * @typedef {Object} SomeTypedef
           * @property {SomeType} propName Prop description
           */
      `,
    },
    {
      code: `
          /**
           * @typedef {object} SomeTypedef
           * @prop {SomeType} propName Prop description
           */
      `,
      settings: {
        jsdoc: {
          tagNamePreference: {
            property: 'prop',
          },
        },
      },
    },
    {
      code: `
          /**
           * @typedef {object} SomeTypedef
           * @property
           * // arbitrary property content
           */
      `,
    },
    {
      code: `
          /**
           * @typedef {object<string, string>} SomeTypedef
           */
      `,
    },
    {
      code: `
          /**
           * @typedef {string} SomeTypedef
           */
      `,
    },
    {
      code: `
          /**
           * @namespace {object} SomeName
           * @property {SomeType} propName Prop description
           */
      `,
    },
    {
      code: `
          /**
           * @namespace {object} SomeName
           * @property
           * // arbitrary property content
           */
      `,
    },
    {
      code: `
          /**
           * @typedef {object} SomeTypedef
           * @property someProp
           * @property anotherProp This with a description
           * @property {anotherType} yetAnotherProp This with a type and desc.
           */
          function quux () {

          }
      `,
    },
  ],
});
