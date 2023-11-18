import { Link } from '@remix-run/react';

const Footer = () => (
  <footer className="border-t border-dashed border-zinc-900 dark:border-zinc-100 py-3 flex justify-between">
    <p>&copy; {new Date().getFullYear()} Evix - BE 0745.964.642</p>
    <nav>
      <Link to="/status" prefetch="intent">
        status
      </Link>
    </nav>
  </footer>
);

export default Footer;
