import cx from 'classnames';
import React, { ReactNode } from 'react';

import Content from './Content';
import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  styles?: string[];
}

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <div className={cx(styles.layout, ...[props.styles || []])}>{children}</div>
  );
};

Layout.Content = Content;

export default Layout;
