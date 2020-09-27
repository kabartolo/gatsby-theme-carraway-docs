export const links = {
  accordion: {
    fontSize: '1rem',
    textDecoration: 'none',
    color: 'text',
    fontWeight: 'body',
    ':hover': {
      color: 'secondary',
      textDecoration: 'underline',
    },
    '&.activePost': {
      color: 'secondary',
      fontWeight: 'bold',
    },
    '&.activeHeader': {
      color: 'secondary',
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
    ':hover': {
      textDecoration: 'underline',
    },
  },
  navLink: {
    textDecoration: 'none',
    color: 'primary',
    ':hover': {
      textDecoration: 'underline',
      '.nav-link-label': {
        color: 'primary',
        fontWeight: 'heading',
      },
    },
    '.nav-link-label': {
      color: 'text',
    },
    '.nav-link-title': {
      color: 'primary',
      fontWeight: 'heading',
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
    color: 'secondary',
    textDecoration: 'none',
    h2: {
      fontSize: '1.2rem',
    },
  },
  siteTitle: {
    color: 'siteTitle',
    textDecoration: 'none',
    ':hover': {
      color: 'siteTitleHover',
    },
    h1: {
      fontFamily: 'Raleway',
      fontSize: ['20px', '36px', '25px'],
      letterSpacing: '1px',
    },
  },
  toc: {
    color: 'grey',
    textDecoration: 'none',
    ':hover': {
      color: 'secondary',
      textDecoration: 'underline',
    },
    '&.activeHeader': {
      color: 'secondary',
    },
  },
};
