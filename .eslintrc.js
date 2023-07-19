// module.exports = {
//   root: true,
//   extends: '@react-native',
// };
module.exports = {
  root: true,
  extends: ['@react-native', 'prettier', 'plugin:react/jsx-runtime'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    'no-undef': 'off',
    'prettier/prettier': 'error',
    'semi': ['error', 'never'],
    // format on save
    "rules": {
      "react/prop-types": "off",
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [".js", ".jsx", ".ts", ".tsx"]
        }
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", {
        "vars": "all",
        "args": "after-used",
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_"
      }],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_"
        }
      ],
      "no-constant-binary-expression": ["error"],
      "no-sequences": ["error"],
      "no-unused-expressions": ["error"],
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          "pathGroups": [
            {
              "pattern": "react",
              "group": "builtin",
              "position": "before"
            },
            {
              "pattern": "{react,react-native,*}",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "@/**",
              "group": "internal",
              "position": "after"
            },
            {
              "pattern": "../**/styles",
              "group": "parent",
              "position": "after"
            },
            {
              "pattern": "./**/styles",
              "group": "sibling",
              "position": "after"
            }
          ],
          "groups": [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
            "type"
          ]
        }
      ],

      "sort-imports": [
        "error",
        {
          "ignoreDeclarationSort": true
        }
      ]
    }





  }
}

