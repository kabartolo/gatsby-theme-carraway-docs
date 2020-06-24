const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  const parent = getNode(node.parent);

  if (node.internal.type === 'Mdx' && parent.internal.type === 'File') {
    const path = createFilePath({ node, getNode });
    const slug = parent.name;
    const [postType, group] = parent.relativeDirectory.split('/');

    createNodeField({
      name: 'path',
      node,
      value: path,
    });

    createNodeField({
      name: 'postType',
      node,
      value: postType,
    });

	  createNodeField({
		  name: 'slug',
		  node,
		  value: slug,
	  });

    createNodeField({
      name: 'group',
      node,
      value: group,
    });
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              path
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMdx.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.path,
      component: require.resolve('./src/components/Post'),
      context: { id: node.id },
    });
  });
}
