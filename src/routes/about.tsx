import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
  return [
    { title: 'About' },
    {
      name: 'description',
      content:
        "Evix is a reliable development partner. Websites, web apps, mobile apps or APIs. It's what we do & what we love.",
    },
  ];
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
        we love.
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
        9000 Gent
        <br />
        België
      </p>
    </>
  );
};

export default About;
