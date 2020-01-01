// After `importMeta` no longer experimental, we can use this ESM
//   approach over `__dirname`?
// import {fileURLToPath} from 'url';
// import {join, dirname} from 'path';
// join(dirname(fileURLToPath(import.meta.url)), 'babel-eslint')

export default {
  invalid: [
    {
      code: `
          /**
           * @param Foo
           */
          function quux (foo = 'FOO') {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "foo". Got "Foo".',
        },
      ],
    },
    {
      code: `
          /**
           * @arg Foo
           */
          function quux (foo = 'FOO') {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @arg names to be "foo". Got "Foo".',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: 'arg',
          },
        },
      },
    },
    {
      code: `
          /**
           * @param Foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "foo". Got "Foo".',
        },
      ],
    },
    {
      code: `
          /**
           * @param Foo.Bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: '@param path declaration ("Foo.Bar") appears before any real parameter.',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param Foo.Bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@param path declaration ("Foo.Bar") root node name ("Foo") does not match previous real parameter name ("foo").',
        },
      ],
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].department - The employee's department.
           */
          function assign (employees) {

          };
      `,
      errors: [
        {
          line: 4,
          message: '@param path declaration ("employees[].name") appears before any real parameter.',
        },
      ],
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].name - The employee's department.
           */
          function assign (employees) {

          };
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "employees[].name"',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.bar
           * @param bar
           */
          function quux (bar, foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Expected @param names to be "bar, foo". Got "foo, bar".',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: '@param "bar" does not match an existing function parameter.',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Duplicate @param "foo"',
        },
      ],
      output: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo
           */
          function quux (foo, bar) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Duplicate @param "foo"',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           * @param foo
           */
          function quux (foo, foo) {

          }
      `,
      errors: [
        {
          line: 4,
          message: 'Duplicate @param "foo"',
        },
      ],
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param cfg.foo
           */
          function quux ({foo, bar}) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "cfg.foo"',
        },
      ],
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param [cfg.foo]
           * @param baz
           */
          function quux ({foo, bar}, baz) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "cfg.foo"',
        },
      ],
    },
    {
      code: `
          /**
           * @param cfg
           * @param cfg.foo
           * @param [cfg.foo="with a default"]
           * @param baz
           */
          function quux ({foo, bar}, baz) {

          }
      `,
      errors: [
        {
          line: 5,
          message: 'Duplicate @param "cfg.foo"',
        },
      ],
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param prop
           */
          constructor(private property: string) {}
        }
      `,
      errors: [
        {
          line: 4,
          message: 'Expected @param names to be "property". Got "prop".',
        },
      ],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'Unexpected tag `@param`',
        },
      ],
      settings: {
        jsdoc: {
          tagNamePreference: {
            param: false,
          },
        },
      },
    },
    {
      code: `
          /**
           * @param {Error} error Exit code
           * @param {number} [code = 1] Exit code
           */
          function quux (error, cde = 1) {
          };
      `,
      errors: [
        {
          line: 4,
          message: 'Expected @param names to be "error, cde". Got "error, code".',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux ({a, b}) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'The JSDoc @param "foo" declaration is not nested while its corresponding parameter is a destructured object ("a","b").',
        },
      ],
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux ({a, b} = {}) {

          }
      `,
      errors: [
        {
          line: 3,
          message: 'The JSDoc @param "foo" declaration is not nested while its corresponding parameter is a destructured object ("a","b").',
        },
      ],
    },
    {
      code: `
      /**
       * @param {object} args
       * @param {string} args.bar
       * @param {string} args.baz
       */
      function quux ({bar, baz}, foo) {
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
      /**
       * @param {object} args
       * @param {string} args.bar
       * @param {string} args.baz
       * @param foo
       */
      function quux ({bar, baz}, foo) {
      }
      `,
    },
    {
      code: `
      /**
       *
       */
      function quux (foo, {bar, baz}) {
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
      /**
       * @param foo
       */
      function quux (foo, {bar, baz}) {
      }
      `,
    },
    {
      code: `
      /**
       * @param {string} bar
       * @param {string} baz
       * @param {string} foo
       */
      function quux ({bar, baz}, foo) {
      }
      `,
      errors: [
        {
          message: 'The JSDoc @param "bar" declaration is not nested while the parameter "bar" is nested.',
        },
      ],
    },
    {
      code: `
      /**
       * @param {string} foo
       * @param {string} bar
       * @param {string} baz
       */
      function quux (foo, {bar, baz}) {
      }
      `,
      errors: [
        {
          message: 'The JSDoc @param "bar" declaration is not nested while the parameter "bar" is nested.',
        },
      ],
    },
    {
      code: `
      /**
       * @param {object} args
       * @param {string} args.bar
       * @param {string} args.baz
       * @param {string} foo
       */
      function quux (bar, baz, foo) {
      }
      `,
      errors: [
        {
          message: 'The JSDoc @param "bar" declaration is nested (under "args") while the parameter "bar" is not nested.',
        },
      ],
    },
    {
      code: `
      /**
       * @param {string} foo
       * @param {object} args
       * @param {string} args.bar
       * @param {string} args.baz
       */
      function quux (foo, bar, baz) {
      }
      `,
      errors: [
        {
          message: 'The JSDoc @param "bar" declaration is nested (under "args") while the parameter "bar" is not nested.',
        },
      ],
    },
    {
      code: `
      /**
       * @param {object} args
       * @param {string} args.bar
       * @param {string} args.baz
       * @param {string} foo
       */
      function quux ({bar, bax}, foo) {
      }
      `,
      errors: [
        {
          message: 'The JSDoc @param "baz" declaration (nested under "args") does not match the nested parameter name "bax".',
        },
      ],
    },
    {
      code: `
      /**
       * @param {string} foo
       * @param {object} args
       * @param {string} args.bar
       * @param {string} args.baz
       */
      function quux (foo, {bar, bax}) {
      }
      `,
      errors: [
        {
          message: 'The JSDoc @param "baz" declaration (nested under "args") does not match the nested parameter name "bax".',
        },
      ],
    },
    {
      code: `
      /**
       * @param {string} foo
       * @param {string} args.bar
       * @param {string} args.baz
       */
      function quux (foo, {bar, baz}) {
      }
      `,
      errors: [
        {
          message: '@param path declaration ("args.bar") root node name ("args") does not match previous real parameter name ("foo").',
        },
      ],
    },
    {
      code: `
      /**
       * @param {string} foo
       * @param {object} args
       * @param {string} args.bar
       * @param {string} args.baz
       */
      function quux (foo, {beez: bar, bax}) {
      }
      `,
      errors: [
        {
          message: 'The JSDoc @param "bar" declaration (nested under "args") does not match the nested parameter name "beez".',
        },
      ],
    },
    {
      code: `
      /**
       *
       */
      function quux ([bar, baz], foo) {
      }
      `,
      errors: [
        {
          message: 'Missing JSDoc @param "foo" declaration.',
        },
      ],
      output: `
      /**
       * @param foo
       */
      function quux ([bar, baz], foo) {
      }
      `,
    },
  ],
  valid: [
    {
      code: `
          /**
           *
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux (foo) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo, bar, baz) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.foo
           * @param bar
           */
          function quux (foo, bar) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param foo.bar
           * @param foo.baz
           * @param bar
           */
          function quux (foo, bar) {

          }
      `,
    },
    {
      code: `
          /**
           * @param args
           */
          function quux (...args) {

          }
      `,
    },
    {
      code: `
          /**
           * @param foo
           */
          function quux ([a, b] = []) {

          }
      `,
    },
    {
      code: `
          /**
           * Assign the project to a list of employees.
           * @param {object[]} employees - The employees who are responsible for the project.
           * @param {string} employees[].name - The name of an employee.
           * @param {string} employees[].department - The employee's department.
           */
          function assign (employees) {

          };
      `,
    },
    {
      code: `
        export class SomeClass {
          /**
           * @param property
           */
          constructor(private property: string) {}
        }
      `,
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      code: `
          /**
           * @param {Error} error Exit code
           * @param {number} [code = 1] Exit code
           */
          function quux (error, code = 1) {
          };
      `,
    },
    {
      code: `
          /**
           * @param foo
           * @param bar
           */
          function quux (foo) {

          }
      `,
      options: [
        {
          allowExtraTrailingParamDocs: true,
        },
      ],
    },
  ],
};
