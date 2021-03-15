import cx from 'classnames';
import Container from 'components/Container';
import React, { ReactNode } from 'react';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  styles?: string[];
}

const LayoutContent = (props: Props) => {
  const { children } = props;

  return (
    <div className={cx(styles.content, ...[props.styles || []])}>
      <Container>{children}</Container>
    </div>
  );
};

export default LayoutContent;
