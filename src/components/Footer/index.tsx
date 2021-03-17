import Link from 'next/link';

import styles from './styles.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; {new Date().getFullYear()} Evix - BE 0745.964.642</p>
    <nav>
      <Link href="/status">
        <a>status</a>
      </Link>
    </nav>
  </footer>
);

export default Footer;
