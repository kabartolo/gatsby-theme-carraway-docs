const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const mdx = require('@mdx-js/mdx');
const grayMatter = require('gray-matter');

const withDefault = require('./src/utils/with-default');

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

  const formatParts = (parts) => {
    const str = parts
      .map((part) => (
        part.children ?
          part.children.map((child) => child.value).join('') :
          part.value
      )).join('');
    return str.replace(/<[^>]*>/g, ''); // remove any html/jsx tags
  };

  const paragraphs = AST.children.map((child) => {
    if (child.type === 'heading' && child.depth === 2) {
      nearestHeading = formatParts(child.children);
      return null;
    } else if (child.type === 'paragraph') {
      return {
        heading: nearestHeading,
        content: formatParts(child.children),
        id: Math.floor(Math.random() * 100000),
      };
    }

    return null;
  });

  return paragraphs.filter((paragraph) => paragraph != null);
};

const buildAST = (body, allowSiteSearch) => {
  let paragraphs;
  let headers;
  let sections;
  if (allowSiteSearch) {
    const compiler = mdx.createMdxAstCompiler({ remarkPlugins: [] });
    const { content } = grayMatter(body);
    const AST = compiler.parse(content);
    sections = getParagraphs(AST);
    paragraphs = sections.map((paragraph) => paragraph.content);
    headers = sections
      .map((paragraph) => paragraph.heading)
      .filter((heading, index, self) => (
        self.indexOf(heading) === index
      ));
  }

  return [paragraphs, headers, sections];
}

const getSidebarMenu = (menus, postPath) => {
  const sidebarMenu = menus.find((menu) => {
    const basePath = new RegExp(`^/${menu.slug}`, 'i');
    return menu.slug && !!postPath.match(basePath);
  });

  return sidebarMenu || menus.find((menu) => !menu.slug);
};

const getGroupMenu = (sidebarMenu, postPath) => {
  return sidebarMenu.items.find((menuItem) => {
    const path = new RegExp(`^${sidebarMenu.path}${menuItem.slug}`, 'i');
    return menuItem.isGroup && !!postPath.match(path);
  })
};

const itemInterface = (item) => {
  let slug = typeof item === 'string' ? item : item.slug;
  if (typeof slug === 'undefined') slug = '';

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
  let post;
  const newMenus = menuInterface.menus.slice();
  const sidebarMenu = getSidebarMenu(newMenus, postPath);

  if (sidebarMenu) {
    sidebarMenu.path = sidebarMenu.slug ? `/${sidebarMenu.slug}/` : '/';

    const groupMenu = getGroupMenu(sidebarMenu, postPath);

    if (groupMenu) {
      groupMenu.path = `${sidebarMenu.path}${groupMenu.slug}/`;

      post = groupMenu.items.find((item) => item.slug === postSlug);
      if (!post && postSlug !== 'index') {
        post = itemInterface(postSlug);
        groupMenu.items.push(post);
      }

      if (postSlug === 'index' && !groupMenu.name) {
        groupMenu.name = postName;
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
  const { createTypes } = actions;
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
        showPostNav: { type: 'Boolean' },
        showSidebar: { type: 'Boolean' },
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
    schema.buildObjectType({
      interfaces: ['Node'],
      name: 'Page',
      fields: {
        id: { type: 'ID!' },
        title: { type: 'String!' },
        description: { type: 'String' },
        path: { type: 'String' },
        slug: { type: 'String' },
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
}, themeOptions) => {
  const {
    createNodeField,
    createNode,
    createParentChildLink,
  } = actions;

  const {
    menus,
    alwaysShowTOC,
    allowSiteSearch,
    basePath,
  } = withDefault(themeOptions);
  const menuNode = getNode(SIDEBAR_MENU_ID);

  if (node.internal.type === 'Mdx') {
    const { frontmatter } = node;
    const parent = getNode(node.parent);

    if (
      parent.internal.type === 'File' &&
      parent.sourceInstanceName === 'posts'
    ) {

      let {
        title,
        showTOC,
        showSidebar,
        showPostNav,
      } = node.frontmatter;
      const { label, description } = node.frontmatter;
      if (!title) title = label || 'Untitled';
      showTOC = (typeof showTOC === 'undefined') ? alwaysShowTOC : showTOC;
      showPostNav = (typeof showPostNav === 'undefined') ? true : showPostNav;

      const path = createFilePath({ node, getNode, basePath });
      const slug = parent.name;
      const id = createNodeId(`${node.id} >>> Post`);

      // AST used to build search index
      const [paragraphs, headers, sections] = buildAST(node.rawBody, allowSiteSearch);

      // Add post to sidebar menu
      const sidebarMenus = getNode(SIDEBAR_MENU_ID)
        || createSidebarMenuInterface(menus.sidebar);

      createNode(appendToMenu(
          sidebarMenus,
          id,
          slug,
          label || title,
          path,
      ));

      // Create post node
      const postData = {
        title,
        label,
        description,
        path,
        slug,
        showTOC,
        showSidebar,
        showPostNav,
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
    } else if (
      parent.internal.type === 'File' &&
      parent.sourceInstanceName === 'pages'
    ) {
      const title = node.frontmatter.title || '';
      const { description, showTitle } = node.frontmatter;

      const path = createFilePath({ node, getNode, basePath });
      const slug = parent.name;
      const id = createNodeId(`${node.id} >>> Page`);

      // Create page node
      const pageData = {
        title,
        description,
        path,
        slug,
        showTitle,
      };

      createNode({
        ...pageData,
        id,
        parent: node.id,
        children: [],
        internal: {
          type: 'Page',
          contentDigest: createContentDigest(pageData),
          content: JSON.stringify(pageData),
          description: 'Carraway Docs page',
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

exports.createPages = async ({ graphql, actions, getNodes, cache }, themeOptions) => {
  const { createPage, createNode, touchNode } = actions;
  const { sidebarAllowTOC } = withDefault(themeOptions);

  const nodes = getNodes().filter((node) => (
    node.internal.owner === 'gatsby-theme-carraway-docs' && node.internal.type === SIDEBAR_MENU_TYPE
  ));

  nodes.forEach((node) => touchNode(node));

  const flattenItem = ({ id, slug, path, name, items = [] }) => {
    const isHeader = new RegExp('#', 'g');
    return isHeader.test(path) ? null : [{ id, slug, path, name }, ...flattenMenu(items)];
  };

  const flattenMenu = (items = []) => (
    items.flatMap((item) => flattenItem(item))
  );

  function getTOC(item, allTOC) {
    const TOC = allTOC.find((node) => (
      node.id === item.id
    ));

    if (!TOC || !TOC.items) return [];

    return TOC.items.map((heading) => ({
      id: heading.url,
      name: heading.title,
      type: heading.url,
      path: `${item.path}${heading.url}`,
    }));
  }

  const sidebarQuery = await graphql(`
    query {
      allSidebarMenu {
        nodes {
          menus {
            id
            name
            slug
            path
            isGroup
            items {
              id
              name
              slug
              path
              isGroup
              items {
                id
                name
                slug
                path
                isGroup
              }
            }
          }
        }
      }
    }
  `);

  if (sidebarQuery.errors) {
    throw sidebarQuery.errors;
  }

  const postQuery = await graphql(`
    query {
      allPost {
        edges {
          node {
            id
            path
            title
            label
            parent {
              ... on Mdx {
                tableOfContents(maxDepth: 2)
              }
            }
          }
        }
      }
    }
  `);

  if (postQuery.errors) {
    throw postQuery.errors;
  }

  const pageQuery = await graphql(`
    query {
      allPage {
        edges {
          node {
            id
            path
          }
        }
      }

    }
  `);

  if (pageQuery.errors) {
    throw pageQuery.errors;
  }

  const posts = postQuery.data.allPost.edges;
  const pages = pageQuery.data.allPage.edges;

  const { allSidebarMenu } = sidebarQuery.data;

  let menus;
  if (!allSidebarMenu || !allSidebarMenu.nodes[0]) {
    menus = await cache.get(SIDEBAR_MENU_ID);
  } else {
    menus = allSidebarMenu.nodes[0].menus;
    await cache.set(SIDEBAR_MENU_ID, menus);
  }

  const allTableOfContents = posts.map(({ node }) => ({
    id: node.id,
    items: node.parent.tableOfContents.items,
  }));

  pages.forEach(({ node }) => {
    createPage({
      path: node.path,
      component: require.resolve('./src/components/templates/Page'),
      context: {
        id: node.id,
      },
    });
  });

  posts.forEach(({ node }) => {
    const menu = getSidebarMenu(menus, node.path);
    let previous;
    let next;
    let breadcrumb;

    if (menu) {
      const flatMenu = flattenMenu([menu]).filter((item) => item != null);
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
        }).filter((item) => item != null);

      let index = flatMenu.findIndex((item) => item.path === node.path);
      if (index !== -1) {
        const prevPath = (index === 0) ? null : flatMenu[index - 1].path;
        const nextPath = (index === (flatMenu.length - 1)) ? null : flatMenu[index + 1].path;
        previous = prevPath && posts.find((post) => post.node.path === prevPath);
        next = nextPath && posts.find((post) => post.node.path === nextPath);
      }

      // Add TOC items to menu
      if (sidebarAllowTOC) {
        menu.items.forEach((item) => {
          if (item.items && item.items.length) {
            item.items.forEach((subItem) => {
              subItem.items = getTOC(subItem, allTableOfContents);
            });
          } else {
            item.items = getTOC(item, allTableOfContents);
          }
        });
      }
    }

    createPage({
      path: node.path,
      component: require.resolve('./src/components/templates/Post'),
      context: {
        id: node.id,
        menu,
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

exports.onPreBootstrap = ({ store, reporter }) => {
  const { program } = store.getState();
  const dirs = [
    path.join(program.directory, "src/pages"),
    path.join(program.directory, "src/posts"),
    path.join(program.directory, "src/assets"),
  ]

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`Creating the ${dir} directory`)
      mkdirp.sync(dir)
    }
  });
}