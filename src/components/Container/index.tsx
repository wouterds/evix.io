import cx from 'classnames';
import React, { ReactNode } from 'react';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  styles?: string[];
}

const Container = (props: Props) => {
  const { children } = props;

  return (
    <div className={cx(styles.container, ...[props.styles || []])}>
      {children}
    </div>
  );
};

export default Container;
