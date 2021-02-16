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
    "settings": {
        "react": {
            "createClass": "createReactClass", // Regex for Component Factory to use, default to "createReactClass"
            "pragma": "React",  // Pragma to use, default to "React"
            "fragment": "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
            "version": "detect", // React version. "detect" automatically picks the version you have installed.
                                // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                                // default to latest and warns if missing
                                // It will default to "detect" in the future
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
        "indent":                   [1, 4],
        "quotes":                   [1, "double"],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-inferrable-types": 1,
        "@typescript-eslint/no-extra-semi": 1,
        "@typescript-eslint/indent": [1, 4],
        "react/jsx-indent": [1, 4]
    }
};
