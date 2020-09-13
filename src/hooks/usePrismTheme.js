import { useThemeUI } from 'theme-ui';

function usePrismTheme() {
  const { theme, colorMode } = useThemeUI();
  return theme.prism[colorMode];
}

export { usePrismTheme };
