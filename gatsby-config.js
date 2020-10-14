const withDefault = require('gatsby-theme-carraway-docs-core/utils/with-default');

module.exports = (options) => {
  const themeOptions = withDefault(options);

  return {
    plugins: [
      {
        resolve: 'gatsby-theme-carraway-docs-core',
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
