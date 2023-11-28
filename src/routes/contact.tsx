import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
  return [{ title: 'Contact' }];
};

const Contact = () => {
  return (
    <p>
      <strong>Wouter De Schuyter</strong>
      <br />
      email: <a href="mailto:wouter@evix.io">wouter@evix.io</a>
      <br />
      tel: <a href="tel:+32479228210">+32479228210</a>
    </p>
  );
};

export default Contact;
