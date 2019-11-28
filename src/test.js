/* eslint-disable import/unambiguous, import/no-commonjs */
const English = require('parse-english');

const english = new English();
const parsed = english.parse('etc. how are you? My friend, hello!\nWhat\'s up?');

// eslint-disable-next-line no-console
console.log('parsed', parsed.children[0].children[0].children[0]);
