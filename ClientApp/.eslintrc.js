module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
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
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-inferrable-types": 0,
        "@typescript-eslint/indent": [1, 2],
        "react/jsx-indent": [2, 2]
    }
};
