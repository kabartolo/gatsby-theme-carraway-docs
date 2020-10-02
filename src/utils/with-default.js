module.exports = (options) => {
  const postsPath = options.postsPath || 'src/posts';
  const pagesPath = options.pagesPath || 'src/mdxPages';
  const assetsPath = options.assetsPath || 'src/assets';
  const basePath = options.basePath || '';
  const githubUrl = options.githubUrl || '';
  const allowBreadCrumbs = options.allowBreadCrumbs || true;
  const allowSiteSearch = options.allowSiteSearch || true;
  const primaryResultsOnly = options.primaryResultsOnly || false;
  const alwaysShowTOC = options.alwaysShowTOC || true;
  const sidebarAllowTOC = options.sidebarAllowTOC || true;
  const sidebarAllowMultipleOpen = options.sidebarAllowMultipleOpen || true;
  const toggleTheme = options.toggleTheme || true;
  const main = options.menus.main || {};
  const sidebar = options.menus.sidebar || [];

  return {
    postsPath,
    pagesPath,
    assetsPath,
    basePath,
    githubUrl,
    allowBreadCrumbs,
    allowSiteSearch,
    primaryResultsOnly,
    alwaysShowTOC,
    sidebarAllowTOC,
    sidebarAllowMultipleOpen,
    toggleTheme,
    menus: {
      main,
      sidebar,
    },
  };
};
