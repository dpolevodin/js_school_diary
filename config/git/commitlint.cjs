module.exports = {
  rules: {
    // The commit body must start with an empty line
    "body-leading-blank": [2, "always"],

    // The commit footer must start with an empty line
    "footer-leading-blank": [2, "always"],

    // Maximum header length is 72 characters
    "header-max-length": [2, "always", 72],

    // Area is always lowercase only
    "scope-case": [2, "always", "lower-case"],

    // Description cannot be empty
    "subject-empty": [2, "never"],

    // Description must not end with '.'
    "subject-full-stop": [2, "never", "."],

    // Type is always lowercase only
    "type-case": [2, "always", "lower-case"],

    // Type cannot be empty
    "type-empty": [2, "never"],

    // List all possible commits
    "type-enum": [
      2,
      "always",
      [
        "build",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
}
