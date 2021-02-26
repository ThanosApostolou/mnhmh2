module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended"
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
    "settings": {
        "react": {
            "createClass": "createReactClass", // Regex for Component Factory to use, default to "createReactClass"
            "pragma": "React",  // Pragma to use, default to "React"
            "fragment": "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
            "version": "detect",
            "flowVersion": "0.53" // Flow version
        },
        "propWrapperFunctions": [
            // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
            "forbidExtraProps",
            {"property": "freeze", "object": "Object"},
            {"property": "myFavoriteWrapper"}
        ],
        "linkComponents": [
            // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
            "Hyperlink",
            {"name": "Link", "linkAttribute": "to"}
        ]
    },
    "rules": {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "strict":                   "error",
        "semi":                     "warn",
        "no-template-curly-in-string":"error",
        "block-scoped-var":         "error",
        "class-methods-use-this":   "error",
        "consistent-return":        "error",
        "no-param-reassign":        "error",
        "no-invalid-this":          "error",
        "init-declarations":        "warn",
        "no-label-var":             "error",
        "no-undef-init":            "error",
        "no-undefined":             "error",
        "no-use-before-define":     "error",
        "class-methods-use-this":   "off",
        "indent":                   [1, 4],
        "quotes":                   [1, "double"],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-inferrable-types": 1,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-extra-semi": 1,
        "@typescript-eslint/indent": [1, 4],
        "react/jsx-indent": 0
    }
};
