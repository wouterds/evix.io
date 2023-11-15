import { Link } from '@remix-run/react';

const Header = () => (
  <header className="border-t border-b border-dashed border-slate-900 dark:border-slate-100">
    <ul className="py-3 flex justify-end items-center gap-1.5">
      <Link
        className="inline-block px-0.5 hover:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 dark:hover:text-slate-900"
        to="/">
        /
      </Link>
      <Link
        className="inline-block px-0.5 hover:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 dark:hover:text-slate-900"
        to="/about">
        about
      </Link>
      <Link
        className="inline-block px-0.5 hover:text-slate-100 hover:bg-slate-900 dark:hover:bg-slate-100 dark:hover:text-slate-900"
        to="/contact">
        contact
      </Link>
    </ul>
  </header>
);

export default Header;
