/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React from 'react';
import { Link } from 'gatsby';

import Alert from './Alert';
import CodeBlock from './CodeBlock';
import CodeExample from './CodeExample';
import ExternalLink from './ExternalLink';
import Image from './image';
import Playground from './Playground';
import PostList from './PostList';
import PropertyTable from './PropertyTable';
import Section from './Section';
import TOC from './TOC';

import themeComponents from '../gatsby-plugin-theme-ui/components';

/* eslint-disable react/prop-types */
export const shortcodes = {
  ...themeComponents,
  Alert,
  code: CodeBlock,
  CodeExample,
  ExternalLink,
  Image,
  Link: ({ children, to }) => <Link to={to} sx={{ variant: 'styles.a' }}>{children}</Link>,
  Playground,
  PostList,
  PropertyTable,
  Section,
  TOC,
};
/* eslint-enable react/prop-types */
