import styles from './styles.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    &copy; {new Date().getFullYear()} Evix - BE 0745.964.642
  </footer>
);

export default Footer;
