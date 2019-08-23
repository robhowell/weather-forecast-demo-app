module.exports = {
  extends: [
    "semipretty",
    "plugin:jest/recommended",
    "plugin:react/recommended"
  ],
  plugins: ["jest"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off"
  }
};
