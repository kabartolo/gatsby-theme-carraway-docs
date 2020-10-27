import { hasFragment, normalizePath } from '@kabartolo/gatsby-theme-chicago-docs-core/utils/path-helpers';

function getActivePostId(items, locationPath) {
  let activePostId;
  const activePost = items.find((item) => (
    item.path === locationPath && !hasFragment(item.path)
  ));
  if (activePost) activePostId = activePost.id;

  return activePostId;
}

function getFragment(path) {
  const index = path.indexOf('#');
  return path.slice(index);
}

function hasCurrentPageFragment(path, locationPath) {
  const re = new RegExp(`${locationPath}#`);
  return re.test(path);
}

function isActiveUrl(activeId, path, locationPath) {
  const activeURL = new RegExp(`^${locationPath}#${activeId}$`);
  return activeURL.test(path);
}

function isCurrentLink(path, locationPath) {
  return path.match(locationPath);
}

function isExternalLink(path) {
  return path.match(/^http/);
}

function isFragmentLink(path) {
  return path.slice(0, 1) === '#';
}

function removeFragment(path) {
  return path.replace(/#.+/, '');
}

export {
  getActivePostId,
  getFragment,
  hasCurrentPageFragment,
  hasFragment,
  isActiveUrl,
  isCurrentLink,
  isExternalLink,
  isFragmentLink,
  normalizePath,
  removeFragment,
};
