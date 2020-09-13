import theme from '@theme-ui/preset-polaris';
import { toTheme } from '@theme-ui/typography';
import { merge } from 'theme-ui';

import noriegaTheme from 'typography-theme-noriega';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';

const typography = toTheme(noriegaTheme);

export default merge(theme, {
  ...typography,
  styles: {
    pre: {
      padding: 0,
    },
    table: {
      margin: '1rem 0 2em 0',
      width: '100%',
      display: 'block',
      overflow: 'auto',
    },
    th: {
      padding: '1rem 2rem',
    },
    td: {
      borderBottom: '1px solid',
      padding: '1rem 2rem',
    },
  },
  prism: {
    dark: nightOwl,
    default: nightOwlLight,
  },
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
    highlight: '#d3d7f0',
    border: '#e6e6e6',
    informationBackground: '#eef2fa',
    informationBorder: '#89a7e0',
    successBackground: '#edf9f0',
    successBorder: '#5aca75',
    warningBackground: '#fff4ec',
    warningBorder: '#ff8f39',
    errorBackground: '#feefef',
    errorBorder: '#f48989',
    modes: {
      dark: {
        text: '#fff',
        background: '#000639',
        border: '#454f5b',
        primary: '#47c1bf',
        secondary: '#f49342',
        highlight: '#023751',
        muted: '#454f5b',
        gray: '#3e4155',
        backgroundSecondary: '#3e4155',
        informationBackground: '#2e5aac',
        successBackground: '#287d3c',
        warningBackground: '#b95000',
        errorBackground: '#da1414',
      },
    },
  },
  // variants
  alerts: {
    information: {
      bg: 'informationBackground',
      borderLeft: '7px solid',
      borderColor: 'informationBorder',
    },
    success: {
      bg: 'successBackground',
      borderLeft: '7px solid',
      borderColor: 'successBorder',
    },
    warning: {
      bg: 'warningBackground',
      borderLeft: '7px solid',
      borderColor: 'warningBorder',
    },
    error: {
      bg: 'errorBackground',
      borderLeft: '7px solid',
      borderColor: 'errorBorder',
    },
  },
  links: {
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
    codeNumber: {
      color: 'white',
      opacity: '0.6',
    },
    codeTop: {
      bg: 'muted',
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
      bg: 'highlight',
    },
    highlightNumber: {
      bg: 'highlight',
      opacity: '0.65',
      borderLeft: '4px solid',
      borderColor: 'highlight',
    },
    mobileSidebar: {
      bg: 'background',
    },
    mobileMenu: {
      bg: 'backgroundSecondary',
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
    playground: {
      borderTop: 'main',
      borderColor: 'border',
      '.live-preview': {
        borderLeft: 'main',
        borderRight: 'main',
        borderColor: 'border',
      },
      '.live-editor': {
        border: 'main',
        borderColor: 'border',
      },
      '.live-error': {
      },
    },
    propertyTable: {
      borderTop: '2px solid',
      borderBottom: '2px solid',
      borderColor: 'border',
      '.property-name': {
        fontFamily: 'Monospace',
      },
      '.property-type': {
        fontWeight: 'bold',
        color: 'grey',
      },
      '.property-info': {
      },
      '.property-description': {
        fontSize: '1rem',
      },
      '.property-default': {
        fontWeight: 'bold',
      },
      '.property-default-value': {
      },
      li: {
        listStyle: 'none',
        borderTop: 'main',
        borderColor: 'border',
      },
    },
    resultContainer: {
      bg: 'backgroundSecondary',
      borderBottom: 'main',
      borderColor: 'border',
      boxShadowBottom: 'main',
    },
    section: {
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
        bg: 'muted',
      },
      mark: {
        color: 'secondary',
        bg: 'inherit',
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
      color: 'text',
      fontWeight: 'bold',
    },
    header: {
      borderBottom: 'thick',
      borderColor: 'border',
      bg: 'background',
    },
  },
});
