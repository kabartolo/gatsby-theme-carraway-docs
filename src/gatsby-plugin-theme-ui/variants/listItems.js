export const listItems = {
  dropdown: {
    borderBottom: 'main',
    borderColor: 'border',
    ':first-of-type': {
      borderTop: 'main',
      borderColor: 'border',
    },
  },
  mainMenu: {
  },
  postList: {
    listStyle: 'none',
  },
  propertyTable: {
    listStyle: 'none',
    borderTop: 'main',
    borderColor: 'border',
  },
  searchResult: {
    listStyle: 'none',
    borderBottom: 'main',
    borderColor: 'border',
    fontSize: '0.8em',
    ':first-of-type': {
      borderTop: 'main',
      borderColor: 'border',
    },
    ':hover': {
      bg: 'muted',
    },
    mark: {
      color: 'secondary',
      bg: 'inherit',
    },
  },
  toc: {
    listStyle: 'none',
  },
};
