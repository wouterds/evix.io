import Link from 'next/link';

import styles from './styles.module.css';

const Header = () => (
  <header className={styles.header}>
    <ul>
      <Link href="/">
        <a>/</a>
      </Link>
      <Link href="/about">
        <a>about</a>
      </Link>
      <Link href="/contact">
        <a>contact</a>
      </Link>
    </ul>
  </header>
);

export default Header;
