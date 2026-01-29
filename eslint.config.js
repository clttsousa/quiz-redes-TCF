export default [
  {
    ignores: ["dist/**"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off"
    }
  }
];
