module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "no-unused-vars": ["warn", { "vars": "local", "args": "after-used", "ignoreRestSiblings": false }],
    'prefer-arrow-callback': ['warn'],
    'no-unused-vars': ['warn']
  },
  "env": {
    "browser": true
  }
};
