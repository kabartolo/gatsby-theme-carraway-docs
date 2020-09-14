import React from 'react';

import { useSiteMetadata } from '../../hooks';

import styles from './footer.module.scss';

export default function Footer() {
  const { footerText } = useSiteMetadata();

  return (
    <div className={styles.footer}>
      <p>{footerText}</p>
    </div>
  );
}
