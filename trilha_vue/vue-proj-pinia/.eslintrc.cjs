module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}
