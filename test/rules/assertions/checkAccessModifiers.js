export default {
  invalid: [
    {
      code: `
        class A {
          /** @private */
          count = 0;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Private elements with @private tag must use the # symbol to be truly private',
        },
      ],
    },
    {
      code: `
        class A {
          /** @private */
          count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Private elements with @private tag must use the # symbol to be truly private',
        },
      ],
    },
    {
      code: `
        class A {
          /** @public */
          #count = 0;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Private elements must not use the @public tag',
        },
      ],
    },
    {
      code: `
        class A {
          /** @public */
          #count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Private elements must not use the @public tag',
        },
      ],
    },
    {
      code: `
        class A {
          /** @access private */
          count = 0;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Private elements with @access private tag must use the # symbol to be truly private',
        },
      ],
    },
    {
      code: `
        class A {
          /** @access private */
          count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Private elements with @access private tag must use the # symbol to be truly private',
        },
      ],
    },
    {
      code: `
        class A {
          /** @access public */
          #count = 0;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Private elements must not use the @access public tag',
        },
      ],
    },
    {
      code: `
        class A {
          /** @access public */
          #count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Private elements must not use the @access public tag',
        },
      ],
    },
    {
      code: `
        class A {
          /** @public */
          count = 0;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @public tag - the lack of a # symbol already indicates this field is public',
        },
      ],
      options: [
        {
          reportRedundantAccessTags: true,
        },
      ],
      output: `
        class A {
          count = 0;
        }
      `,
    },
    {
      code: `
        class A {
          /** @public */
          count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @public tag - the lack of a # symbol already indicates this field is public',
        },
      ],
      options: [
        {
          reportRedundantAccessTags: true,
        },
      ],
      output: `
        class A {
          count () {}
        }
      `,
    },
    {
      code: `
        class A {
          /** @public */
          count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @public tag - the lack of a # symbol already indicates this field is public',
        },
      ],
      options: [
        {
          enableRedundantAccessTagsFixer: false,
          reportRedundantAccessTags: true,
        },
      ],
    },
    {
      code: `
        class A {
          /** @private */
          #count = 0;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @private tag - the # symbol already indicates this field is private',
        },
      ],
      options: [
        {
          reportRedundantAccessTags: true,
        },
      ],
      output: `
        class A {
          #count = 0;
        }
      `,
    },
    {
      code: `
        class A {
          /** @private */
          #count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @private tag - the # symbol already indicates this field is private',
        },
      ],
      options: [
        {
          reportRedundantAccessTags: true,
        },
      ],
      output: `
        class A {
          #count () {}
        }
      `,
    },
    {
      code: `
        class A {
          /** @private */
          #count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @private tag - the # symbol already indicates this field is private',
        },
      ],
      options: [
        {
          enableRedundantAccessTagsFixer: false,
          reportRedundantAccessTags: true,
        },
      ],
    },
    {
      code: `
        class A {
          /** @access public */
          count = 0;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @access public tag - the lack of a # symbol already indicates this field is public',
        },
      ],
      options: [
        {
          reportRedundantAccessTags: true,
        },
      ],
      output: `
        class A {
          count = 0;
        }
      `,
    },
    {
      code: `
        class A {
          /** @access public */
          count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @access public tag - the lack of a # symbol already indicates this field is public',
        },
      ],
      options: [
        {
          reportRedundantAccessTags: true,
        },
      ],
      output: `
        class A {
          count () {}
        }
      `,
    },
    {
      code: `
        class A {
          /** @access public */
          count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @access public tag - the lack of a # symbol already indicates this field is public',
        },
      ],
      options: [
        {
          enableRedundantAccessTagsFixer: false,
          reportRedundantAccessTags: true,
        },
      ],
    },
    {
      code: `
        class A {
          /** @access private */
          #count = 0;
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @access private tag - the # symbol already indicates this field is private',
        },
      ],
      options: [
        {
          reportRedundantAccessTags: true,
        },
      ],
      output: `
        class A {
          #count = 0;
        }
      `,
    },
    {
      code: `
        class A {
          /** @access private */
          #count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @access private tag - the # symbol already indicates this field is private',
        },
      ],
      options: [
        {
          reportRedundantAccessTags: true,
        },
      ],
      output: `
        class A {
          #count () {}
        }
      `,
    },
    {
      code: `
        class A {
          /** @access private */
          #count () {}
        }
      `,
      errors: [
        {
          line: 3,
          message: 'Remove @access private tag - the # symbol already indicates this field is private',
        },
      ],
      options: [
        {
          enableRedundantAccessTagsFixer: false,
          reportRedundantAccessTags: true,
        },
      ],
    },
  ],
  valid: [
    {
      code: `
        class A {
          count = 0;
        }
      `,
    },
    {
      code: `
        class A {
          count () {}
        }
      `,
    },
    {
      code: `
        class A {
          #count = 0;
        }
      `,
    },
    {
      code: `
        class A {
          #count () {}
        }
      `,
    },
    {
      code: `
        class A {
          /** @public */
          count = 0;
        }
      `,
      options: [
        {
          reportRedundantAccessTags: false,
        },
      ],
    },
    {
      code: `
        class A {
          /** @public */
          count () {}
        }
      `,
      options: [
        {
          reportRedundantAccessTags: false,
        },
      ],
    },
    {
      code: `
        class A {
          /** @private */
          #count = 0;
        }
      `,
      options: [
        {
          reportRedundantAccessTags: false,
        },
      ],
    },
    {
      code: `
        class A {
          /** @private */
          #count () {}
        }
      `,
      options: [
        {
          reportRedundantAccessTags: false,
        },
      ],
    },
    {
      code: `
        class A {
          /** @access public */
          count = 0;
        }
      `,
      options: [
        {
          reportRedundantAccessTags: false,
        },
      ],
    },
    {
      code: `
        class A {
          /** @access public */
          count () {}
        }
      `,
      options: [
        {
          reportRedundantAccessTags: false,
        },
      ],
    },
    {
      code: `
        class A {
          /** @access private */
          #count = 0;
        }
      `,
      options: [
        {
          reportRedundantAccessTags: false,
        },
      ],
    },
    {
      code: `
        class A {
          /** @access private */
          #count () {}
        }
      `,
      options: [
        {
          reportRedundantAccessTags: false,
        },
      ],
    },
  ],
};
