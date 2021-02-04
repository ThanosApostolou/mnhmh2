module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "strict":                   "error",
    "semi":                     "error",
    "no-template-curly-in-string":"error",
    "block-scoped-var":         "error",
    "class-methods-use-this":   "error",
    "consistent-return":        "error",
    "no-param-reassign":        "error",
    "no-invalid-this":          "error",
    "init-declarations":        "error",
    "no-label-var":             "error",
    "no-undef-init":            "error",
    "no-undefined":             "error",
    "no-use-before-define":     "error",
    "class-methods-use-this":   "warn",
    "indent":                   [1, 2],
    "quotes":                   [1, "double"],
    "vue/html-indent":          [1, 2],
    "vue/script-indent":        [1, 2],
    "vue/html-quotes":          [1, "double"],
    "vue/max-attributes-per-line": 0,
  }
}
