// package
import React from 'react';

// slice
import styles from '../styles/About.module.scss';

import { PhoneFrameProps } from '../types';

export default function PhoneFrame({ title, children }: PhoneFrameProps) {
  return (
    <div className={styles.phoneFrame}>
      <h1 className={styles.chat__produce}>
        <div className={styles.chat__title}>{title}</div>
      </h1>
      {children}
    </div>
  );
}
