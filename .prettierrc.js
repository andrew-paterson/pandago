module.exports = {
  plugins: ['prettier-plugin-go-template'],
  overrides: [
    {
      files: ['*.html'],
      options: {
        parser: 'go-template',
      },
    },
  ],
  goTemplateBracketSpacing: true,
};
