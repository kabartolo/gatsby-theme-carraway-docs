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
import FlexibleLink from './flexible-link';
import Playground from './Playground';
import PostList from './PostList';
import PropertyTable from './PropertyTable';
import TOC from './TOC';
import TwoColumnSection from './TwoColumnSection';

import themeComponents from '../gatsby-plugin-theme-ui/components';

/* eslint-disable react/prop-types */
export const shortcodes = {
  ...themeComponents,
  a: FlexibleLink,
  Alert,
  code: CodeBlock,
  CodeExample,
  ExternalLink,
  Image,
  Link,
  Playground,
  PostList,
  PropertyTable,
  TOC,
  TwoColumnSection,
};
/* eslint-enable react/prop-types */
