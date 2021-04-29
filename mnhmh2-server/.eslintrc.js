module.exports = {
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "strict":                   "error",
        "semi":                     "warn",
        "no-template-curly-in-string":"error",
        "block-scoped-var":         "error",
        "consistent-return":        "error",
        "no-param-reassign":        "error",
        "no-invalid-this":          "error",
        "init-declarations":        "warn",
        "no-label-var":             "error",
        "no-undef-init":            "error",
        "class-methods-use-this":   "warn",
        "indent":                   [1, 4],
        "quotes":                   [1, "double"],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-inferrable-types": 1,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-extra-semi": 1,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/indent": [1, 4],
        "@typescript-eslint/explicit-module-boundary-types": 0
    }
};
