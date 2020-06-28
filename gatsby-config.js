module.exports = ({ postsPath }) => {
  return {
    plugins: [
      'gatsby-plugin-eslint',
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
        }
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