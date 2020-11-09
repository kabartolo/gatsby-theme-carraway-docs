/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
// import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { useSiteMetadata, useThemeOptions } from '../../../hooks';

import Toggle from '../Toggle';

const githubIcon = <FontAwesomeIcon icon={faGithub} />;
const sunIcon = <FontAwesomeIcon sx={{ variant: 'icons.default', color: 'accent' }} icon={faSun} />;
const moonIcon = <FontAwesomeIcon sx={{ variant: 'icons.default' }} icon={faCloudMoon} />;
const DARK_THEME_TOOLTIP = 'Switch to light theme';
const LIGHT_THEME_TOOLTIP = 'Switch to dark theme';
const GITHUB_TOOLTIP = 'Go to GitHub repository';

export default function Icons({ className }) {
  const { githubUrl } = useSiteMetadata();
  const [mode, setMode] = useColorMode();
  const { toggleTheme: useThemeToggle } = useThemeOptions();

  function toggleTheme() {
    setMode(mode === 'dark' ? 'default' : 'dark');
  }

  function ThemeToggle() {
    return (
      <Toggle
        icon1={mode === 'dark' ? sunIcon : moonIcon}
        icon2={mode === 'dark' ? moonIcon : sunIcon}
        name="theme-toggle"
        onToggle={() => toggleTheme()}
        tooltip={mode === 'dark' ? DARK_THEME_TOOLTIP : LIGHT_THEME_TOOLTIP}
      />
    );
  }

  function GithubLink() {
    return (
      <a
        href={githubUrl}
        rel="noopener noreferrer"
        target="_blank"
        sx={{ variant: 'icons.default' }}
        title={GITHUB_TOOLTIP}
      >
        {githubIcon}
      </a>
    );
  }

  return (
    <div className={className}>
      {githubUrl && <GithubLink />}
      {useThemeToggle && <ThemeToggle />}
    </div>
  );
}

Icons.propTypes = {
  className: PropTypes.string,
};

Icons.defaultProps = {
  className: '',
};
