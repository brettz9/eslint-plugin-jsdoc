<a name="user-content-check-access-modifiers"></a>
<a name="check-access-modifiers"></a>
# <code>check-access-modifiers</code>

<a name="user-content-check-access-modifiers-options"></a>
<a name="check-access-modifiers-options"></a>
## Options

A single options object has the following properties.

<a name="user-content-check-access-modifiers-options-enableredundantaccesstagsfixer"></a>
<a name="check-access-modifiers-options-enableredundantaccesstagsfixer"></a>
### <code>enableRedundantAccessTagsFixer</code>

Whether to enable the fixer for redundant access modifier tags

<a name="user-content-check-access-modifiers-options-reportredundantaccesstags"></a>
<a name="check-access-modifiers-options-reportredundantaccesstags"></a>
### <code>reportRedundantAccessTags</code>

Whether to report redundant access modifier tags like <code>@public</code> or <code>@private</code>. Defaults to `true`.


|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|true|
|Settings||
|Options|`enableRedundantAccessTagsFixer`, `reportRedundantAccessTags`|

<a name="user-content-check-access-modifiers-failing-examples"></a>
<a name="check-access-modifiers-failing-examples"></a>
## Failing examples

The following patterns are considered problems:

````ts
class A {
  /** @private */
  count = 0;
}
// Message: Private elements with @private tag must use the # symbol to be truly private

class A {
  /** @private */
  count () {}
}
// Message: Private elements with @private tag must use the # symbol to be truly private

class A {
  /** @public */
  #count = 0;
}
// Message: Private elements must not use the @public tag

class A {
  /** @public */
  #count () {}
}
// Message: Private elements must not use the @public tag

class A {
  /** @access private */
  count = 0;
}
// Message: Private elements with @access private tag must use the # symbol to be truly private

class A {
  /** @access private */
  count () {}
}
// Message: Private elements with @access private tag must use the # symbol to be truly private

class A {
  /** @access public */
  #count = 0;
}
// Message: Private elements must not use the @access public tag

class A {
  /** @access public */
  #count () {}
}
// Message: Private elements must not use the @access public tag

class A {
  /** @public */
  count = 0;
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":true}]
// Message: Remove @public tag - the lack of a # symbol already indicates this field is public

class A {
  /** @public */
  count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":true}]
// Message: Remove @public tag - the lack of a # symbol already indicates this field is public

class A {
  /** @public */
  count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"enableRedundantAccessTagsFixer":false,"reportRedundantAccessTags":true}]
// Message: Remove @public tag - the lack of a # symbol already indicates this field is public

class A {
  /** @private */
  #count = 0;
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":true}]
// Message: Remove @private tag - the # symbol already indicates this field is private

class A {
  /** @private */
  #count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":true}]
// Message: Remove @private tag - the # symbol already indicates this field is private

class A {
  /** @private */
  #count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"enableRedundantAccessTagsFixer":false,"reportRedundantAccessTags":true}]
// Message: Remove @private tag - the # symbol already indicates this field is private

class A {
  /** @access public */
  count = 0;
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":true}]
// Message: Remove @access public tag - the lack of a # symbol already indicates this field is public

class A {
  /** @access public */
  count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":true}]
// Message: Remove @access public tag - the lack of a # symbol already indicates this field is public

class A {
  /** @access public */
  count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"enableRedundantAccessTagsFixer":false,"reportRedundantAccessTags":true}]
// Message: Remove @access public tag - the lack of a # symbol already indicates this field is public

class A {
  /** @access private */
  #count = 0;
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":true}]
// Message: Remove @access private tag - the # symbol already indicates this field is private

class A {
  /** @access private */
  #count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":true}]
// Message: Remove @access private tag - the # symbol already indicates this field is private

class A {
  /** @access private */
  #count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"enableRedundantAccessTagsFixer":false,"reportRedundantAccessTags":true}]
// Message: Remove @access private tag - the # symbol already indicates this field is private
````



<a name="user-content-check-access-modifiers-passing-examples"></a>
<a name="check-access-modifiers-passing-examples"></a>
## Passing examples

The following patterns are not considered problems:

````ts
class A {
  count = 0;
}

class A {
  count () {}
}

class A {
  #count = 0;
}

class A {
  #count () {}
}

class A {
  /** @public */
  count = 0;
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":false}]

class A {
  /** @public */
  count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":false}]

class A {
  /** @private */
  #count = 0;
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":false}]

class A {
  /** @private */
  #count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":false}]

class A {
  /** @access public */
  count = 0;
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":false}]

class A {
  /** @access public */
  count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":false}]

class A {
  /** @access private */
  #count = 0;
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":false}]

class A {
  /** @access private */
  #count () {}
}
// "jsdoc/check-access-modifiers": ["error"|"warn", {"reportRedundantAccessTags":false}]
````

