const withDefault = require('@kabartolo/gatsby-theme-chicago-docs-core/utils/with-default');

module.exports = (options) => {
  const themeOptions = withDefault(options);

  return {
    plugins: [
      {
        resolve: '@kabartolo/gatsby-theme-chicago-docs-core',
        options: themeOptions,
      },
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-styled-components',
      {
        resolve: 'gatsby-plugin-google-fonts',
        options: {
          fonts: [
            'Raleway',
          ],
        },
      },
      'gatsby-plugin-sass',
      'gatsby-plugin-fontawesome-css',
      'gatsby-plugin-theme-ui',
    ],
  }
};
