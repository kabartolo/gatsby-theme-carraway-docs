const { createFilePath } = require('gatsby-source-filesystem');
const crypto = require('crypto');

exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions;
  createTypes([
    schema.buildObjectType({
      interfaces: ['Node'],
      name: 'Post',
      fields: {
        id: { type: 'ID!' },
        title: {
          type: 'String!',
          resolve({ title }, args, context, info) {
            return (title == null || title === '')
              ? 'Untitled'
              : title
          },
        },
        label: { type: 'String' },
        description: { type: 'String' },
        excerpt: {
          type: 'String!',
          resolve: async (source, args, context, info) => {
            const type = info.schema.getType('Mdx');
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields()['excerpt'].resolve;
            const excerpt = await resolver(
              mdxNode,
              { pruneLength: 140 },
              context,
              { fieldName: 'excerpt' },
            );
            return excerpt;
          },
        },
        body: {
          type: 'String!',
          resolve(source, args, context, info) {
            const type = info.schema.getType('Mdx');
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields()['body'].resolve;
            return resolver(mdxNode, {}, context, {
              fieldName: 'body',
            });
          },
        },
      },
    }),
  ]);
}

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
}) => {
  const {
    createNodeField,
    createNode,
    createParentChildLink,
  } = actions;

  if (node.internal.type === 'Mdx') {
    const { frontmatter } = node;
    const parent = getNode(node.parent);

    if (
      parent.internal.type === 'File' &&
      parent.sourceInstanceName === 'posts'
    ) {
      const path = createFilePath({ node, getNode });
      const slug = parent.name;
      const [postType, group] = parent.relativeDirectory.split('/');

      const fieldData = {
        title: node.frontmatter.title,
        label: node.frontmatter.label,
        description: node.frontmatter.description,
        path,
        postType,
        slug,
        group,
      }

      createNode({
        ...fieldData,
        id: createNodeId(`${node.id} >>> Post`),
        parent: node.id,
        children: [],
        internal: {
          type: 'Post',
          contentDigest: crypto
            .createHash('md5')
            .update(JSON.stringify(fieldData))
            .digest('hex'),
          content: JSON.stringify(fieldData),
          description: 'Carraway Docs post',
        },
      });

      createParentChildLink({
        parent: parent,
        child: node,
      });
    } 
  }
};

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
    const config = getConfig();
    config.node = {
        fs: 'empty',
    };
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allPost {
        edges {
          node {
            id
            path
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allPost.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.path,
      component: require.resolve('./src/components/Post'),
      context: { id: node.id },
    });
  });
}
