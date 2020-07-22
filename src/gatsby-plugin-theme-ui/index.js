import theme from '@theme-ui/preset-polaris';
import { toTheme } from '@theme-ui/typography';
import noriegaTheme from 'typography-theme-noriega';
import { merge } from 'theme-ui';

const typography = toTheme(noriegaTheme);

export default merge(theme, {
  ...typography,
  buttons: {
    unstyled: {
      border: 'none',
      background: 'inherit',
      padding: 0,
    },
  },
  lists: {
    accordion: {
      margin: 0,
      listStyle: 'none',
      li: {
        paddingBottom: 0,
      },
      h3: {
        fontWeight: 'body',
        marginBottom: 0,
      },
    },
  },
  layouts: {
    spaceBetween: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  text: {
    accordionGroup: {
      textTransform: 'uppercase',
    },
  },
  links: {
    accordion: {
      textDecoration: 'none',
      color: 'text',
      ':visited': {
        color: 'text',
      },
    },
    current: {
      color: 'primary',
      textDecoration: 'none',
    },
  },
});
