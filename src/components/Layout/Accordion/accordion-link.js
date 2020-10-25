/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { useLocation } from '../../../hooks';

export default function AccordionLink({
  className,
  onClick,
  path,
  name,
  sx,
}) {
  const { pathname } = useLocation();
  const props = {
    onClick,
    className,
    sx,
  };

  // Use an <a> tag for links to locations on the current page, Link otherwise
  const currentPageRegExp = new RegExp(`${pathname}#`);
  return currentPageRegExp.test(path)
    ? (
      <Styled.a href={path} {...props}>
        {name}
      </Styled.a>
    ) : (
      <Styled.a
        as={Link}
        to={path}
        {...props}
      >
        {name}
      </Styled.a>
    );
}

AccordionLink.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sx: PropTypes.instanceOf(Object),
};

AccordionLink.defaultProps = {
  className: '',
  sx: {},
};
