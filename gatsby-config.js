module.exports = ({ postsPath }) => {
  return {
    plugins: [
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-eslint',
      'gatsby-plugin-styled-components',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'posts',
          path: postsPath,
        }
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
          ],
        },
      },
      {
        resolve: 'gatsby-plugin-sass',
        options: {
          data: `@import "${__dirname}/src/styles/global";`,
          cssLoaderOptions: {
            camelCase: true,
          }
        },
        includePaths: [`${__dirname}/src/styles/`],
      },
      'gatsby-plugin-fontawesome-css',
      {
        resolve: 'gatsby-plugin-theme-ui',
        options: {
          prismPreset: 'night-owl',
        },
      },
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