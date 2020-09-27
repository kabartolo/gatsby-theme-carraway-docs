module.exports = (options) => {
  const postsPath = options.postsPath || 'src/posts';
  const assetsPath = options.assetsPath || 'src/assets';
  const basePath = options.basePath || '';
  const githubUrl = options.githubUrl || '';
  const allowBreadCrumbs = options.allowBreadCrumbs || true;
  const allowSiteSearch = options.allowSiteSearch || true;
  const alwaysShowTOC = options.alwaysShowTOC || true;
  const sidebarAllowTOC = options.sidebarAllowTOC || true;
  const sidebarAllowMultipleOpen = options.sidebarAllowMultipleOpen || true;
  const toggleTheme = options.toggleTheme || true;
  const main = options.menus.main || {};
  const sidebar = options.menus.sidebar || [];

  return {
    postsPath,
    assetsPath,
    basePath,
    githubUrl,
    allowBreadCrumbs,
    allowSiteSearch,
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
