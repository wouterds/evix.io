import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
  return [{ title: 'Evix' }];
};

export default function Index() {
  return (
    <>
      <h1 className="font-sans font-extrabold text-5xl px-4 mb-8">EVIX</h1>
      <p>Websites, web apps &amp; mobile apps of the highest standards.</p>
    </>
  );
}
