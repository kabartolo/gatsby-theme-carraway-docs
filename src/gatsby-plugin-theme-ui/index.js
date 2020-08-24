import theme from '@theme-ui/preset-polaris';
import { toTheme } from '@theme-ui/typography';
import noriegaTheme from 'typography-theme-noriega';
import { merge } from 'theme-ui';

const typography = toTheme(noriegaTheme);

export default merge(theme, {
  ...typography,
  borders: {
    main: '1px solid',
    thick: '1.5px solid',
  },
  shadows: {
    main: '0 0 2px rgba(0,0,0,0.05),0 1px 4px rgba(0,0,0,0.05)',
    search: 'inset 0 1px 2px rgba(27,31,35,.075)',
    searchFocus: 'inset 0 1px 2px #d1d5da, 0 0 0 .2em rgba(3,102,214,.3)',
  },
  colors: {
    ...theme.colors,
    backgroundSecondary: '#fff',
    border: '#e6e6e6',
    modes: {
      dark: {
        text: '#fff',
        background: '#000639',
        border: '#454f5b',
        primary: '#47c1bf',
        secondary: '#f49342',
        highlight: '#b7ecec',
        muted: '#454f5b',
        gray: '#3e4155',
        backgroundSecondary: '#3e4155',
      },
    },
  },
  // link styles
  as: {
    mainMenu: {
      fontSize: '1.1rem',
      color: 'primary',
      textDecoration: 'none',
      fontWeight: 'heading',
    },
    navLink: {
      textDecoration: 'underline',
      color: 'primary',
    },
    navLinkLabel: {
      textDecoration: 'none',
      fontWeight: 'heading',
      color: 'text',
    },
  },
  buttons: {
    unstyled: {
      border: 'none',
      background: 'inherit',
      padding: 0,
      outline: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'body',
    },
  },
  divs: {
    code: {
      backgroundColor: 'rgb(42, 39, 52)',
      fontSize: '0.9rem',
    },
    codeNumber: {
      color: 'white',
      opacity: '0.6',
    },
    codeTop: {
      backgroundColor: 'muted',
      h3: {
        color: 'text',
      },
      svg: {
        color: 'text',
      },
      select: {
        color: 'text',
      },
    },
    highlightLine: {
      backgroundColor: 'rgb(2, 55, 81)',
    },
    highlightNumber: {
      backgroundColor: 'rgb(2, 155, 206)',
      opacity: '0.65',
      borderLeft: '4px solid white',
    },
    mobileMenu: {
      backgroundColor: 'backgroundSecondary',
      borderBottom: 'main',
      borderColor: 'border',
      boxShadowBottom: 'main',
      li: {
        borderBottom: 'main',
        borderColor: 'border',
        ':first-of-type': {
          borderTop: 'main',
          borderColor: 'border',
        },
      },
    },
    propertyTable: {
      '.property-name': {
        fontFamily: 'Monospace',
      },
      '.property-type': {
        fontFamily: 'Monospace',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: 'grey',
      },
      '.property-info': {
        fontStyle: 'italic',
        fontSize: '0.9rem',
      },
      '.property-default': {
        fontSize: '0.9rem',
        fontWeight: 'bold',
      },
      '.property-default-value': {
        fontFamily: 'Monospace',
        fontSize: '0.8rem',
      },
      li: {
        listStyle: 'none',
        borderTop: 'main',
        borderColor: 'border',
      },
    },
    resultContainer: {
      backgroundColor: 'backgroundSecondary',
      borderBottom: 'main',
      borderColor: 'border',
      boxShadowBottom: 'main',
    },
    sidebar: {
      borderRight: 'main',
      borderColor: 'border',
    },
  },
  icons: {
    sun: {
      fontSize: '1.5rem',
      color: 'accent',
      margin: '0 15px',
    },
    moon: {
      fontSize: '1.5rem',
      color: 'text',
      margin: '0 15px',
    },
    github: {
      fontSize: '1.5rem',
      color: 'text',
      margin: '0 15px',
    },
    search: {
      color: '#b3b3b3',
    },
    clearSearch: {
      color: '#b3b3b3',
    },
  },
  inputs: {
    searchbar: {
      border: 'main',
      borderColor: 'border',
      borderRadius: '3px',
      outline: 'none',
      boxShadow: 'search',
      ':focus': {
        borderColor: 'rgba(3,102,214,.3)',
        boxShadow: 'searchFocus',
      },
    },
  },
  // list item styles
  lis: {
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
        backgroundColor: 'muted',
      },
      mark: {
        color: 'highlight',
        backgroundColor: 'inherit',
      },
      a: {
        color: 'text',
        textDecoration: 'none',
      },
    },
  },
  navs: {
    accordion: {
      a: {
        fontSize: '1rem',
        textDecoration: 'none',
        color: 'text',
        fontWeight: 'body',
        ':hover': {
          color: 'primary',
          textDecoration: 'underline',
        },
      },
      'a.activePost': {
        color: 'primary',
        fontWeight: 'bold',
      },
      'a.active': {
        color: 'primary',
      },
    },
    toc: {
      border: 'main',
      borderColor: 'border',
      boxShadow: 'main',
      li: {
        listStyle: 'none',
      },
      a: {
        color: 'grey',
        textDecoration: 'none',
        ':hover': {
          color: 'primary',
          textDecoration: 'underline',
        },
      },
      'a.active': {
        color: 'primary',
      },
    },
  },
  spans: {
    accordionGroup: {
      textTransform: 'uppercase',
      color: 'text',
      fontWeight: 'bold',
      fontSize: '0.8rem',
    },
    header: {
      borderBottom: 'thick',
      borderColor: 'border',
      backgroundColor: 'background',
    },
  },
});
