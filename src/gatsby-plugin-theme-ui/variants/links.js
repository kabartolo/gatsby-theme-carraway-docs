export const links = {
  accordion: {
    fontSize: '1rem',
    textDecoration: 'none',
    color: 'text',
    fontWeight: 'body',
    ':hover': {
      color: 'primary',
      textDecoration: 'underline',
    },
    '&.activePost': {
      color: 'primary',
      fontWeight: 'bold',
    },
    '&.activeHeader': {
      color: 'primary',
    },
  },
  accordionGroup: {
  },
  dropdown: {
    fontSize: '1.1rem',
    color: 'primary',
    textDecoration: 'none',
    fontWeight: 'heading',
  },
  mainMenu: {
    fontSize: '1.1rem',
    color: 'primary',
    textDecoration: 'none',
    fontWeight: 'heading',
  },
  navLink: {
    fontWeight: 'heading',
    textDecoration: 'none',
    color: 'secondary',
    fontSize: '1.1rem',
    ':hover': {
      textDecoration: 'underline',
      '.nav-link-title': {
        color: 'secondary',
      },
    },
    '.nav-link-label': {
      color: 'secondary',
    },
    '.nav-link-title': {
      color: 'text',
    },
  },
  pageTitle: {
    color: 'text',
    textDecoration: 'none',
    ':hover': {
      color: 'primary',
    },
    h1: {
      fontWeight: 'body',
      fontFamily: 'Raleway',
      fontSize: '25px',
      letterSpacing: '1px',
    },
  },
  postList: {
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  searchResult: {
    color: 'text',
    textDecoration: 'none',
  },
  sidebarLabel: {
    color: 'text',
    textDecoration: 'none',
    h2: {
      fontSize: '1.3rem',
    },
  },
  toc: {
    color: 'grey',
    textDecoration: 'none',
    ':hover': {
      color: 'primary',
      textDecoration: 'underline',
    },
    '&.activeHeader': {
      color: 'primary',
    },
  },
};
