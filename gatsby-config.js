const withDefault = require('./src/utils/with-default');

module.exports = (options) => {
  const { postsPath, assetsPath } = withDefault(options);

  return {
    plugins: [
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-eslint',
      'gatsby-plugin-styled-components',
      'gatsby-image',
      'gatsby-plugin-sharp',
      'gatsby-remark-images',
      {
        resolve: 'gatsby-transformer-sharp',
        options: {
          checkSupportedExtensions: false,
        },
      },
      {
        resolve: 'gatsby-plugin-google-fonts',
        options: {
          fonts: [
            'Raleway',
          ],
        },
      },      
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'posts',
          path: postsPath,
        }
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'assets',
          path: assetsPath,
        },
      },
      {
        resolve: 'gatsby-plugin-mdx',
        options: {
          extensions: ['.mdx', '.md'],
          gatsbyRemarkPlugins: [
            {
              resolve: 'gatsby-remark-autolink-headers',
              options: {
                elements: ['h2', 'h3', 'h4', 'h5', 'h6'],
                
              },
            },
            {
              resolve: 'gatsby-remark-images',
              options: {
                maxWidth: 1200,
              },
            },
          ],
        },
      },
      'gatsby-plugin-sass',
      'gatsby-plugin-fontawesome-css',
      'gatsby-plugin-theme-ui',
      {
        resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
        options: {
          fields: [
            'title',
            'description',
            'headers',
            'paragraphs',
          ],
          resolvers: {
            Post: {
              title: (node) => node.title,
              description: (node) => node.description,
              path: (node) => node.path,
              sections: (node) => node.sections,
              headers: (node) => node.headers,
              paragraphs: (node) => node.paragraphs,
            },
          },
        },
      },
    ],
  }
}