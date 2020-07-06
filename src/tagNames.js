const jsdocTagsUndocumented = {
  // Undocumented but present; see
  // https://github.com/jsdoc/jsdoc/issues/1283#issuecomment-516816802
  // https://github.com/jsdoc/jsdoc/blob/master/packages/jsdoc/lib/jsdoc/tag/dictionary/definitions.js#L594
  modifies: [],
};

const jsdocCommonTags = {
  abstract: [
    'virtual',
  ],
  access: [],
  alias: [],
  async: [],
  augments: [
    'extends',
  ],
  author: [],
  borrows: [],
  callback: [],
  class: [
    'constructor',
  ],
  classdesc: [],
  constructs: [],
  copyright: [],
  default: [
    'defaultvalue',
  ],
  deprecated: [],
  description: [
    'desc',
  ],
  enum: [],
  event: [],
  example: [],
  exports: [],
  external: [
    'host',
  ],
  file: [
    'fileoverview',
    'overview',
  ],
  fires: [
    'emits',
  ],
  function: [
    'func',
    'method',
  ],
  generator: [],
  global: [],
  hideconstructor: [],
  ignore: [],
  implements: [],

  inner: [],
  instance: [],
  interface: [],
  kind: [],
  lends: [],
  license: [],
  listens: [],
  member: [
    'var',
  ],
  mixes: [],
  mixin: [],

  module: [],
  name: [],
  namespace: [],
  override: [],
  package: [],
  param: [
    'arg',
    'argument',
  ],
  private: [],
  property: [
    'prop',
  ],
  protected: [],
  public: [],
  requires: [],
  returns: [
    'return',
  ],
  see: [],
  since: [],
  static: [],
  summary: [],

  this: [],
  throws: [
    'exception',
  ],
  todo: [],
  tutorial: [],
  type: [],
  typedef: [],
  variation: [],
  version: [],
};

const jsdocTags = {
  ...jsdocCommonTags,
  ...jsdocTagsUndocumented,
  constant: [
    'const',
  ],

  inheritdoc: [],

  // Allowing casing distinct from jsdoc `definitions.js` (required in Closure)
  inheritDoc: [],

  memberof: [],
  'memberof!': [],

  readonly: [],

  yields: [
    'yield',
  ],
};

const typeScriptTags = {
  ...jsdocCommonTags,

  // `@template` is also in TypeScript per:
  //      https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc
  template: [],
};

const undocumentedClosureTags = {
  // These are in Closure source but not in jsdoc source nor in the Closure
  //  docs: https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/parsing/Annotation.java
  closurePrimitive: [],
  customElement: [],
  expose: [],
  hidden: [],
  idGenerator: [],
  meaning: [],
  mixinClass: [],
  mixinFunction: [],
  ngInject: [],
  owner: [],
  typeSummary: [],
  wizaction: [],
};

const {
  /* eslint-disable no-unused-vars */
  inheritdoc,

  // Will be inverted to prefer `return`
  returns,
  /* eslint-enable no-unused-vars */
  ...typeScriptTagsInClosure
} = {
  ...typeScriptTags,
  ...jsdocTags,
};

const closureTags = {
  ...typeScriptTagsInClosure,
  ...undocumentedClosureTags,

  // From https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler
  // These are all recognized in https://github.com/jsdoc/jsdoc/blob/master/packages/jsdoc/lib/jsdoc/tag/dictionary/definitions.js
  //   except for the experimental `noinline` and the casing differences noted below

  // Defined as a synonym of `const` in jsdoc `definitions.js`
  define: [],

  dict: [],
  export: [],
  externs: [],
  final: [],

  // With casing distinct from jsdoc `definitions.js`
  implicitCast: [],

  noalias: [],
  nocollapse: [],
  nocompile: [],
  noinline: [],
  nosideeffects: [],
  polymer: [],
  polymerBehavior: [],
  preserve: [],

  // Defined as a synonym of `interface` in jsdoc `definitions.js`
  record: [],

  return: [
    'returns',
  ],

  struct: [],
  suppress: [],

  unrestricted: [],
};

export {jsdocTags, closureTags, typeScriptTags};
