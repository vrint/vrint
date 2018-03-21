module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    "indent": ["error", 2],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-property-newline': 0,
    'spaced-comment': 0,
    'eqeqeq': 0,
    'semi': 0,
    'no-useless-escape': 0,
    'no-unused-vars': 0,
    'no-useless-computed-key': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0
  }
}
