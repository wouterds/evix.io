import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
  return [{ title: 'About' }];
};

const About = () => {
  return (
    <>
      <p>
        <strong>Development partner</strong>
        <br />
        Evix is a reliable development partner.
        <br />
        Websites, web apps, mobile apps or APIs. It&apos;s what we do &amp; what
        we love &lt;3.
      </p>
      <br />
      <p>
        <strong>VAT</strong>
        <br />
        BE 0745.964.642
      </p>
      <br />
      <p>
        <strong>Address</strong>
        <br />
        Ingelandgat 37B
        <br />
        9000 Ghent
        <br />
        Belgium
      </p>
    </>
  );
};

export default About;
