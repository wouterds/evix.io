import { Link } from '@remix-run/react';

const Header = () => (
  <header className="border-t border-b border-dashed border-zinc-900 dark:border-zinc-100 py-3">
    <ul className="flex justify-end items-center gap-2.5">
      <Link to="/" prefetch="intent">
        /
      </Link>
      <Link to="/about" prefetch="intent">
        about
      </Link>
      <Link to="/contact" prefetch="intent">
        contact
      </Link>
    </ul>
  </header>
);

export default Header;
