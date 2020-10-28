import { withPrefix } from 'gatsby';
import { hasFragment, normalizePath } from '@kabartolo/gatsby-theme-chicago-docs-core/utils/path-helpers';

function getFragment(path) {
  const index = path.indexOf('#');
  return path.slice(index);
}

function hasCurrentPageFragment(path, locationPath) {
  const re = new RegExp(`${locationPath}#`);
  return re.test(withPrefix(path));
}

function isActiveUrl(activeId, path, locationPath) {
  const activeURL = new RegExp(`^${locationPath}#${activeId}$`);
  return activeURL.test(withPrefix(path));
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
  getFragment,
  hasCurrentPageFragment,
  hasFragment,
  isActiveUrl,
  isExternalLink,
  isFragmentLink,
  normalizePath,
  removeFragment,
};
