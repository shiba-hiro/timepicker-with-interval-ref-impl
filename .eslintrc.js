module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "jest": true
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "import",
        "jsx-a11y",
        "react",
        "import",
        "react-native",
        "flowtype",
        "jest"
    ],
    "rules": {
        "react/jsx-filename-extension": [
            1,
            {
              "extensions": [
                ".js",
              ]
            }
          ],
          "camelcase": [0],
          "no-underscore-dangle": 0,
          "no-use-before-define": 0,
          "global-require": 0,
    },
    "settings": {
        "import/resolver": "reactnative"
    },
};