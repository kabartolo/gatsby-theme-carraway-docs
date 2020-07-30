import theme from '@theme-ui/preset-polaris';
import { toTheme } from '@theme-ui/typography';
import noriegaTheme from 'typography-theme-noriega';
import { merge } from 'theme-ui';

const typography = toTheme(noriegaTheme);

export default merge(theme, {
  ...typography,
  styles: {
    a: {
      color: 'primary',
      textDecoration: 'none',
    },
  },
  breakpoints: ['45em', '62em', '82em'],
  colors: {
    ...theme.colors,
    backgroundSecondary: '#fff',
    modes: {
      dark: {
        text: '#fff',
        background: '#000639',
        primary: '#47c1bf',
        secondary: '#f49342',
        highlight: '#b7ecec',
        muted: '#454f5b',
        gray: '#3e4155',
        backgroundSecondary: '#3e4155',
      },
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
    },
  },
  divs: {
    header: {
      borderBottom: '1.5px solid',
      borderColor: 'muted',
      backgroundColor: 'background',
    },
    code: {
      backgroundColor: 'rgb(42, 39, 52)',
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
    dropdown: {
      borderBottom: '1.5px solid',
      borderColor: 'muted',
      backgroundColor: 'background',
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
      borderBottom: '2px solid',
      borderColor: 'muted',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05),0 1px 4px rgba(0,0,0,0.05)',
      li: {
        borderBottom: '1px solid',
        borderColor: 'muted',
        ':first-of-type': {
          borderTop: '1px solid',
          borderColor: 'muted',
        },
      },
    },
    resultContainer: {
      backgroundColor: 'backgroundSecondary',
    },
    searchResult: {
      listStyle: 'none',
      borderBottom: '1px solid',
      borderColor: 'muted',
      ':first-of-type': {
        borderTop: '1px solid',
        borderColor: 'muted',
      },
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
      border: '1px solid',
      borderColor: 'muted',
      borderRadius: '3px',
      outline: 'none',
      boxShadow: 'inset 0 1px 2px rgba(27,31,35,.075)',
      ':focus': {
        borderColor: 'rgba(3,102,214,.3)',
        boxShadow: 'inset 0 1px 2px #d1d5da, 0 0 0 .2em rgba(3,102,214,.3)',
      },
    },
  },
  links: {
    accordion: {
      textDecoration: 'none',
      color: 'text',
      fontWeight: 'heading',
      ':hover': {
        color: 'primary',
      },
      ':visited': {
        color: 'text',
      },
    },
    current: {
      color: 'primary',
      textDecoration: 'underline',
    },
    mainMenu: {
      fontSize: '1.1rem',
      color: 'primary',
      textDecoration: 'none',
      fontWeight: 'heading',
    },
    searchResult: {
      fontSize: '0.8em',
      color: 'text',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  },
  spans: {
    full: {
      width: '100%',
    },
    spaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  text: {
    accordionGroup: {
      textTransform: 'uppercase',
      fontSize: '0.9rem',
    },
    highlight: {
      color: 'primary',
      backgroundColor: 'backgroundSecondary',
    },
  },
});
