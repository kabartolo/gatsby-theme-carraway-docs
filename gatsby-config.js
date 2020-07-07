module.exports = ({ postsPath }) => {
  return {
    plugins: [
      'gatsby-plugin-eslint',
      {
        resolve: 'gatsby-plugin-typography',
        options: {
          pathToConfigModule: `${__dirname}/src/utils/typography`,
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
        resolve: 'gatsby-plugin-mdx',
        options: {
          extensions: ['.mdx', '.md'],
          gatsbyRemarkPlugins: [
            {
              resolve: 'gatsby-remark-autolink-headers',
              options: 
              { 
                elements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
              },
            }
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
      {
        resolve: 'gatsby-plugin-google-fonts',
        options: {
          fonts: [
            'Material Icons',
          ],
        },
      },
    ],
  }
}