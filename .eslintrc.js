module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended'],
  plugins: ['jest'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    "comma-dangle": ["error", "never"],
    "max-len": ["error", 120]
  },
  'env': {
    'jest/globals': true
  }
};
