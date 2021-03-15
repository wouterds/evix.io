import cx from 'classnames';
import React, { ReactNode } from 'react';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  styles?: string[];
}

const Content = (props: Props) => {
  const { children } = props;

  return (
    <div className={cx(styles.content, ...[props.styles || []])}>
      {children}
    </div>
  );
};

export default Content;
