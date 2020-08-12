const { createFilePath } = require('gatsby-source-filesystem');
const crypto = require('crypto');
const mdx = require('@mdx-js/mdx');
const grayMatter = require('gray-matter');

const SIDEBAR_MENU_ID = 'SidebarMenu < Site';
const SIDEBAR_MENU_TYPE = 'SidebarMenu';

const createContentDigest = (data) => (
  crypto
    .createHash('md5')
    .update(JSON.stringify(data))
    .digest('hex')
);

const flattenItem = ({ url = '', title = '', items = [] }) => (
  [{ url, title }, ...flattenTOC(items)]
);

const flattenTOC = (items = []) => (
  items.flatMap((item) => flattenItem(item))
);

const getParagraphs = (AST) => {
  let nearestHeading = '';

  const paragraphs = AST.children.map((child) => {
    if (child.type === 'heading') {
      nearestHeading = child.children.map((part) => part.value).join('');
      return null;
    } else if (child.type === 'paragraph') {
      return {
        heading: nearestHeading,
        content: child.children.map((part) => part.value).join(''),
        id: Math.floor(Math.random() * 100000),
      };
    }

    return null;
  });

  return paragraphs.filter((paragraph) => paragraph != null);
};

const createSidebarMenuInterface = (menus) => {
  const itemData = (item) => ({
    id: item,
    name: item,
    type: item,
    path: null,
    items: null,
  });

  const sidebarMenus = menus.map((menu) => ({
    ...menu,
    items: menu.items.map((item) => {
      if (typeof item === 'string') return itemData(item);
      return {
        id: item.type,
        name: item.name,
        type: item.type,
        path: item.path,
        items: item.items ? item.items.map((post) => itemData(post)) : [],
      };
    })
  }));

  return ({
    id: SIDEBAR_MENU_ID,
    parent,
    children: [],
    menus: sidebarMenus,
    internal: {
      type: SIDEBAR_MENU_TYPE,
      content: JSON.stringify(sidebarMenus),
      contentDigest: createContentDigest(sidebarMenus),
      description: 'Carraway Docs sidebar menus',
    },
  });
};

const appendToMenu = (
  { menus },
  postType,
  groupFolder,
  slug,
  name,
  path,
) => {
  const newMenus = menus.slice();
  const postMenu = newMenus.find((menu) => menu.type === postType);

  if (postMenu) {
    const groupMenu = postMenu.items.find((group) => group.type === groupFolder);
    const postData = groupMenu
      ? groupMenu.items.find((post) => post.type === slug)
      : postMenu.items.find((post) => post.type === slug);

    if (postData) {
      postData.name = name;
      postData.path = path;
    } else if (groupMenu && slug != 'index') {
      groupMenu.items.push({
        id: slug,
        name,
        type: slug,
        slug,
        path,
      });
    }
  }
  const content = JSON.stringify(newMenus);
  return {
    id: SIDEBAR_MENU_ID,
    parent: '___SOURCE___',
    children: [],
    menus: newMenus,
    internal: {
      type: SIDEBAR_MENU_TYPE,
      content,
      contentDigest: createContentDigest(content),
      description: 'Carraway Docs sidebar menus',
    },
  }
}

exports.sourceNodes = ({ actions, getNodes, schema }, themeOptions) => {
  const { createTypes, touchNode } = actions;

  // Prevent custom nodes from being garbage collected
  const nodes = getNodes().filter((node) => (
    node.internal.owner === 'gatsby-theme-carraway-docs'
  ));
  nodes.forEach((node) => touchNode(node.id));

  createTypes([
    schema.buildObjectType({
      name: 'Menu',
      fields: {
        id: 'String!',
        name: 'String',
        type: 'String',
        path: 'String',
        items: '[Menu]',
      },
    }),
    schema.buildObjectType({
      interfaces: ['Node'],
      name: `${SIDEBAR_MENU_TYPE}`,
      fields: {
        menus: '[Menu]',
      },
    }),
    schema.buildObjectType({
      name: 'Paragraph',
      fields: {
        heading: 'String',
        content: 'String',
        id: 'Int!',
      },
    }),
    schema.buildObjectType({
      name: 'Heading',
      fields: {
        title: 'String',
        url: 'String',
      },
    }),
    schema.buildObjectType({
      name: 'Breadcrumb',
      fields: {
        name: 'String',
        type: 'String',
        path: 'String',
      },
    }),
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
        path: { type: 'String' },
        slug: { type: 'String' },
        postType: {
          type: 'Breadcrumb!',
          resolve({ postType }, args, context, info) {
            const type = (postType.type == null || postType.type === '')
              ? 'root'
              : postType.type;
            return {
              name: postType.name,
              type,
              path: postType.path,
            };
          }},
        group: { type: 'Breadcrumb!' },
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
        sections: { type: '[Paragraph]' },
        paragraphs: { type: '[String]' },
        headers: { type: '[String]' },
        headerFlatMap: {
          type: '[Heading]',
          resolve: async (source, args, context, info) => {
            const type = info.schema.getType('Mdx');
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields()['tableOfContents'].resolve;
            const tableOfContents = await resolver(mdxNode, {}, context, {
              fieldName: 'tableOfContents',
            });
            return flattenTOC(tableOfContents.items);
          },          
        },
        tableOfContents: {
          type: '[Heading]',
          resolve: async (source, args, context, info) => {
            const type = info.schema.getType('Mdx');
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields()['tableOfContents'].resolve;
            const tableOfContents = await resolver(
              mdxNode,
              { depth: 3 },
              context,
              { fieldName: 'tableOfContents' },
            );
            return tableOfContents.items || [];
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
  getNodesByType,
  createNodeId,
}, themeOptions) => {
  const {
    createNodeField,
    createNode,
    createParentChildLink,
  } = actions;

  const { menus } = themeOptions;

  if (node.internal.type === 'Mdx') {
    const { frontmatter } = node;
    const parent = getNode(node.parent);

    if (
      parent.internal.type === 'File' &&
      parent.sourceInstanceName === 'posts'
    ) {

      const title = node.frontmatter.title;
      const label = node.frontmatter.label;
      const description = node.frontmatter.description;
      const path = createFilePath({ node, getNode });
      const slug = parent.name;

      let [type, groupFolder] = parent.relativeDirectory.split('/');
      if (themeOptions.usePostTypes === false) {
        groupFolder = type;
        type = 'root';
      }

      const menu = menus.sidebar.find((menu) => menu.type === type);
      const postType = {
        name: menu && menu.name,
        type,
        path: menu && menu.path,
      };
      const groupMenu = menu && menu.items.find((item) => item.type === groupFolder);
      const group = {
        name: groupMenu && groupMenu.name,
        type: groupFolder,
        path: groupMenu && groupMenu.path,
      };

      // AST used to build search index
      const compiler = mdx.createMdxAstCompiler({ remarkPlugins: [] });
      const { content } = grayMatter(node.rawBody);
      const AST = compiler.parse(content);
      const sections = getParagraphs(AST);
      const paragraphs = sections.map((paragraph) => paragraph.content);
      const headers = sections
        .map((paragraph) => paragraph.heading)
        .filter((heading, index, self) => (
          self.indexOf(heading) === index
        ));

      const sidebarMenus = getNode(SIDEBAR_MENU_ID) || createSidebarMenuInterface(menus.sidebar);
      createNode(appendToMenu(
          sidebarMenus,
          type,
          groupFolder,
          slug,
          label || title,
          path,
      ));

      const postData = {
        title,
        label,
        description,
        path,
        slug,
        postType,
        group,
        sections,
        headers,
        paragraphs,
        AST,
      };

      createNode({
        ...postData,
        id: createNodeId(`${node.id} >>> Post`),
        parent: node.id,
        children: [],
        internal: {
          type: 'Post',
          contentDigest: createContentDigest(postData),
          content: JSON.stringify(postData),
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

exports.createPages = async ({ graphql, actions }) => {
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
