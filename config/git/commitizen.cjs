"use strict"

module.exports = {
  // Add description to all types
  types: [
    {
      value: "build",
      name: "build:     Building a project or changing external dependencies",
    },
    { value: "ci", name: "ci:        Setting up CI and working with scripts" },
    { value: "docs", name: "docs:      Documentation update" },
    { value: "feat", name: "feat:      Adding new functionality" },
    { value: "fix", name: "fix:       Error correction" },
    {
      value: "perf",
      name: "perf:      Changes to improve performance",
    },
    {
      value: "refactor",
      name: "refactor:  Code edits without fixing bugs or adding new features",
    },
    { value: "revert", name: "revert:    Rollback to previous commits" },
    {
      value: "style",
      name: "style:     Codestyle edits (tabs, indents, dots, commas, etc.)",
    },
    { value: "test", name: "test:      Adding Tests" },
  ],

  // Area. It characterizes the code fragment that was affected by the changes.
  scopes: [
    { name: "components" },
    { name: "tutorial" },
    { name: "catalog" },
    { name: "product" },
  ],

  // Ability to set a special AREA for a specific commit type (example for 'fix')
  /*
  scopeOverrides: {
    fix: [
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */

  // Change the default questions
  messages: {
    type: "What changes are you making?",
    scope: "\nSelect the AREA you have modified (optional):",
    // Ask if allowCustomScopes is true
    customScope: "Specify your AREA:",
    subject: "Write a SHORT description in the IMPERATIVE:\n",
    body: 'Write a DETAILED description (optional). Use "|" for newline:\n',
    breaking: "BREAKING CHANGES list (optional):\n",
    footer:
      "Place for meta data (tickets, links, etc.). For example: issue5, TASK-100:\n",
    confirmCommit: "Are you satisfied with the resulting commit?",
  },

  // Let's allow our own AREA
  allowCustomScopes: true,

  // Ban on Breaking Changes
  allowBreakingChanges: false,

  // Prefix for footer
  footerPrefix: "META DATA:",

  // Limit subject length
  subjectLimit: 72,
}
