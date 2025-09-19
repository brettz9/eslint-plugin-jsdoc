export default {
  invalid: [
    {
      code: `
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import * as eslint from 'eslint'; */
        /**
         * @type {eslint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          enableFixer: false,
        },
      ],
    },
    {
      code: `
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          outputType: 'named-import',
        },
      ],
      output: `
        /** @import {Rule} from 'eslint'; */
        /**
         * @type {Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          outputType: 'namespaced-import',
        },
      ],
      output: `
        /** @import {Rule} from 'eslint'; */
        /**
         * @type {Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint').Rule['Node']}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          outputType: 'named-import',
        },
      ],
      output: `
        /** @import {Rule} from 'eslint'; */
        /**
         * @type {Rule['Node']}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint').Rule['Node']}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      options: [
        {
          outputType: 'namespaced-import',
        },
      ],
      output: `
        /** @import * as eslint from 'eslint'; */
        /**
         * @type {eslint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint2').Rule.Node} RuleNode  */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 2,
          message: 'Inline `import()` found; prefer `@import`',
        },
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import * as eslint2 from 'eslint2'; */
        /** @import * as eslint from 'eslint'; */
        /** @typedef {eslint2.Rule.Node} RuleNode  */
        /**
         * @type {eslint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint')}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import * as eslint from 'eslint'; */
        /**
         * @type {eslint}
         */
      `,
    },
    {
      code: `
        /**
         * @type {import('eslint').default}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import eslint from 'eslint'; */
        /**
         * @type {eslint}
         */
      `,
    },
    {
      code: `
        /** @import eslint from 'eslint'; */
        /**
         * @type {import('eslint').default}
         */
      `,
      errors: [
        {
          line: 3,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import eslint from 'eslint'; */
        /**
         * @type {eslint}
         */
      `,
    },
    {
      code: `
        /** @import {Rule} from 'eslint' */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import {Rule} from 'eslint' */
        /**
         * @type {Rule.Node}
         */
      `,
    },
    {
      code: `
        /** @import * as eslint2 from 'eslint' */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /** @import * as eslint2 from 'eslint' */
        /**
         * @type {eslint2.Rule.Node}
         */
      `,
    },
    {
      code: `
        /** @import LinterDef2, * as LinterDef3 from "eslint" */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /**
         * @import LinterDef2, * as LinterDef3 from "eslint"
         */
        /**
         * @type {eslint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @import LinterDef2, * as LinterDef3 from "eslint"
         */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /**
         * @import LinterDef2, * as LinterDef3 from "eslint"
         */
        /**
         * @type {eslint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @import LinterDef2,
         *   * as LinterDef3 from "eslint"
         */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /**
         * @import LinterDef2, * as LinterDef3 from "eslint"
         */
        /**
         * @type {eslint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @import {
         *   ESLint
         * } from "eslint"
         */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; prefer `@import`',
        },
      ],
      output: `
        /**
         * @import {
         *   ESLint
         * } from "eslint"
         */
        /**
         * @type {ESLint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; use `@typedef`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {Rule.Node}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {import('eslint').Rule.Node.Abc.Def}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; use `@typedef`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {Rule.Node.Abc.Def}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {import('eslint').Rule.Node.Abc['Def']}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; use `@typedef`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `
        /** @typedef {import('eslint').Rule} Rule  */
        /**
         * @type {Rule.Node.Abc['Def']}
         */
      `,
    },
    {
      code: `
        /** @typedef {import('eslint').Rule.Node} RuleNode  */
        /**
         * @type {import('eslint').Rule.Node}
         */
      `,
      errors: [
        {
          line: 4,
          message: 'Inline `import()` found; use `@typedef`',
        },
      ],
      options: [
        {
          exemptTypedefs: true,
        },
      ],
      output: `
        /** @typedef {import('eslint').Rule.Node} RuleNode  */
        /**
         * @type {RuleNode}
         */
      `,
    },
  ],
  valid: [
    {
      code: `
        /** @typedef {import('eslint').Rule.Node} RuleNode  */
        /**
         * @type {RuleNode}
         */
      `,
      options: [
        {
          exemptTypedefs: true,
        },
      ],
    },
    {
      code: `
        /** @import {Rule} from 'eslint' */
        /**
         * @type {Rule.Node}
         */
      `,
    },
    {
      code: `
        /** @import * as eslint from 'eslint' */
        /**
         * @type {eslint.Rule.Node}
         */
      `,
    },
    {
      code: `
        /**
         * @type {Rule['Node']}
         */
      `,
    },
  ],
};
