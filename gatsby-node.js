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


const getSidebarMenu = (menus, postPath) => {
  const sidebarMenu = menus.find((menu) => {
    const basePath = new RegExp(`^/${menu.slug}`, 'i');
    return menu.slug !== '' && !!postPath.match(basePath);
  });

  return sidebarMenu || menus.find((menu) => menu.slug === '');
};

const getGroupMenu = (sidebarMenu, postPath) => {
  return sidebarMenu.items.find((menuItem) => {
    const path = new RegExp(`^/${sidebarMenu.slug}/${menuItem.slug}`, 'i');
    return menuItem.isGroup && !!postPath.match(path);
  })
};

const itemInterface = (item) => {
  const slug = typeof item === 'string' ? item : item.slug;

  return ({
    id: slug,
    name: item.name,
    slug: slug,
    path: slug,
    isGroup: typeof item !== 'string',
    items: item.items ? item.items.map((subItem) => itemInterface(subItem)) : [],
  });
};

const createSidebarMenuInterface = (menus) => {
  const sidebarMenus = menus.map((menu) => itemInterface(menu));

  return ({
    id: SIDEBAR_MENU_ID,
    parent: '___SOURCE___',
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
  menuInterface,
  postId,
  postSlug,
  postName,
  postPath,
) => {
  const newMenus = menuInterface.menus.slice();
  const sidebarMenu = getSidebarMenu(newMenus, postPath);
  let post;

  if (sidebarMenu) {
    sidebarMenu.path = sidebarMenu.slug === '' ? '/' : `/${sidebarMenu.slug}/`;
    const groupMenu = getGroupMenu(sidebarMenu, postPath);
    if (groupMenu) {
      if (postSlug === 'index' && !groupMenu.name) {
        groupMenu.name = postName;
      }
      groupMenu.path = `${sidebarMenu.path}${groupMenu.slug}/`.replace(/\/\//, '/');

      post = groupMenu.items.find((item) => item.slug === postSlug);

      if (!post && postSlug !== 'index') {
        post = itemInterface(postSlug);
        groupMenu.items.push(post);
      }
    }

    const postData = post || sidebarMenu.items.find((item) => item.slug === postSlug);
    if (postData) {
      postData.id = postId;
      postData.name = postName;
      postData.path = postPath;
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

exports.sourceNodes = ({ actions, getNodes, schema }) => {
  const { createTypes, touchNode } = actions;

  // Prevent custom nodes from being garbage collected
  const nodes = getNodes().filter((node) => (
    node.internal.owner === 'gatsby-theme-carraway-docs'
  ));
  nodes.forEach((node) => touchNode(node));

  createTypes([
    schema.buildObjectType({
      name: 'Menu',
      fields: {
        id: 'String',
        name: 'String',
        slug: 'String',
        path: 'String',
        isGroup: 'Boolean',
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
        items: '[Heading]',
      },
    }),
    schema.buildObjectType({
      interfaces: ['Node'],
      name: 'Post',
      fields: {
        id: { type: 'ID!' },
        title: { type: 'String!' },
        label: { type: 'String' },
        description: { type: 'String' },
        path: { type: 'String' },
        slug: { type: 'String' },
        showTOC: { type: 'Boolean' },
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

  const { menus, alwaysShowTOC } = themeOptions;

  if (node.internal.type === 'Mdx') {
    const { frontmatter } = node;
    const parent = getNode(node.parent);

    if (
      parent.internal.type === 'File' &&
      parent.sourceInstanceName === 'posts'
    ) {

      let { title, showTOC } = node.frontmatter;
      const label = node.frontmatter.label;
      if (!title) title = label || 'Untitled';
      showTOC = (typeof showTOC === 'undefined') ? alwaysShowTOC : showTOC;

      const description = node.frontmatter.description;
      const path = createFilePath({ node, getNode });
      const slug = parent.name;
      const id = createNodeId(`${node.id} >>> Post`);

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

      const sidebarMenus = getNode(SIDEBAR_MENU_ID)
        || createSidebarMenuInterface(menus.sidebar);
      createNode(appendToMenu(
          sidebarMenus,
          id,
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
        showTOC,
        sections,
        headers,
        paragraphs,
      };

      createNode({
        ...postData,
        id,
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
  const sidebarMenu = await graphql(`
    query {
      allSidebarMenu {
        nodes {
          menus {
            id
            name
            slug
            path
            items {
              id
              name
              slug
              path
              items {
                id
                name
                slug
                path
              }
            }
          }
        }
      }
    }
  `);

  if (sidebarMenu.errors) {
    throw sidebarMenu.errors;
  }

  const result = await graphql(`
    query {
      allPost {
        edges {
          node {
            id
            path
            title
            label
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const flattenItem = ({ id, slug, path, name, items = [] }) => (
    [{ id, slug, path, name }, ...flattenMenu(items)]
  );

  const flattenMenu = (items = []) => (
    items.flatMap((item) => flattenItem(item))
  );

  const posts = result.data.allPost.edges;

  const { allSidebarMenu } = sidebarMenu.data;
  if (!allSidebarMenu || !allSidebarMenu.nodes[0]) {
    throw 'gatsby-theme-carraway-docs: Check for errors in your mdx files or gatsby-config.js, or try restarting the development server.';
  }
  
  const menus = allSidebarMenu.nodes[0].menus;

  posts.forEach(({ node }) => {
    let previous;
    let next;
    let breadcrumb;
    const menu = getSidebarMenu(menus, node.path);

    if (menu) {
      const flatMenu = flattenMenu([menu]);
      breadcrumb = node.path
        .slice(1, -1)
        .split('/')
        .map((slug) => {
          const menuItem = flatMenu.find((item) => item.slug === slug);

          return menuItem 
          ? {
              path: menuItem.path,
              name: menuItem.name,
            }
          : null;
        });

      let index = flatMenu.findIndex((item) => item.path === node.path);
      if (index !== -1) {
        const prevPath = (index === 0) ? null : flatMenu[index - 1].path;
        const nextPath = (index === (flatMenu.length - 1)) ? null : flatMenu[index + 1].path;
        previous = prevPath && posts.find((post) => post.node.path === prevPath);
        next = nextPath && posts.find((post) => post.node.path === nextPath);
      }
    }

    createPage({
      path: node.path,
      component: require.resolve('./src/components/Post'),
      context: {
        id: node.id,
        breadcrumb,
        previous: previous && {
          path: previous.node.path,
          label: previous.node.label || previous.node.title,
        },
        next: next && {
          path: next.node.path,
          label: next.node.label || next.node.title,
        },
      },
    });
  });
}
