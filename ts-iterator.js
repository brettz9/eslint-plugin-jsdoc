const parser = require('@typescript-eslint/typescript-estree');

const parser2 = require('@typescript-eslint/parser');

const code = `const hello: string = 'world';`;
const ast = parser.parse(code, {
  range: false,
  loc: false,
});

const ast2 = parser2.parse(code, {
  range: false,
  loc: false,
});

console.log(JSON.stringify(ast) === JSON.stringify(ast2));
console.log(JSON.stringify(ast));


// Stripped of loc and range
const obj = {
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "hello",
            "typeAnnotation": {
              "type": "TSTypeAnnotation",
              "typeAnnotation": {
                "type": "TSStringKeyword"
              }
            }
          },
          "init": {
            "type": "Literal",
            "raw": "'world'",
            "value": "world"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "script"
};
/**/

const jsdoc = parser.parse(
`
/**
 * @type {Boolean}
 */
`
  , {
  range: false,
  loc: false,
  comment: true
});

console.log(JSON.stringify(jsdoc));

/*
{"type":"Program","body":[],"sourceType":"script","range":[28,28],"loc":{
  "start":{"line":5,"column":0},"end":{"line":5,"column":0}},
  "comments":[{"type":"Block","value":"*\n * @type {Boolean}\n ",
    "range":[1,27],"loc":{"start":{"line":2,"column":0},"end":{"line":4,"column":3}}}]}
*/
