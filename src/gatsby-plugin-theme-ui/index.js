import theme from '@theme-ui/preset-polaris';
import { toTheme } from '@theme-ui/typography';
import { merge } from 'theme-ui';

import noriegaTheme from 'typography-theme-noriega';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';

import { colors } from './colors';
import { styles } from './styles';

import { alerts } from './variants/alerts';
import { borders } from './variants/borders';
import { buttons } from './variants/buttons';
import { icons } from './variants/icons';
import { links } from './variants/links';
import { listItems } from './variants/listItems';

const typography = toTheme(noriegaTheme);

export default merge(theme, {
  ...typography,
  colors,
  styles,
  prism: {
    dark: nightOwl,
    default: nightOwlLight,
  },
  breakpoints: ['52em', '62em', '82em'],
  shadows: {
    main: '0 0 2px rgba(0,0,0,0.05),0 1px 4px rgba(0,0,0,0.05)',
    search: 'inset 0 1px 2px rgba(27,31,35,.075)',
    searchFocus: 'inset 0 1px 2px #d1d5da, 0 0 0 .2em rgba(3,102,214,.3)',
  },
  // Variants
  alerts,
  buttons,
  borders,
  icons,
  links,
  listItems,
});
