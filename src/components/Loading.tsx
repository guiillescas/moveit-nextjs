import { ReactElement } from 'react';

import styles from '../styles/components/Loading.module.css';

function Loading(): ReactElement {
  return (
    <div className={styles.spinner}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
      <div className={styles.bounce3} />
    </div>
  );
}

export default Loading;
