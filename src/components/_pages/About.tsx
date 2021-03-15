import Content from 'components/Content';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Head from 'next/head';

const AboutPage = () => {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <Layout.Content>
        <Header />
        <Content>
          <p>
            <strong>Development partner</strong>
            <br />
            Evix is a reliable development partner.
            <br />
            Websites, web apps, mobile apps or APIs. It&apos;s what we do &amp;
            what we love.
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
            Twaalfkameren 94/101
            <br />
            9000 Gent
            <br />
            Belgium
          </p>
          <br />
          <p>
            <strong>Socials</strong>
            <br />
            Twitter:{' '}
            <a
              href="https://twitter.com/evix_io"
              target="_blank"
              rel="noreferrer"
            >
              https://twitter.com/evix_io
            </a>
            <br />
            GitHub:{' '}
            <a
              href="https://github.com/evixio"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/evixio
            </a>
          </p>
        </Content>
        <Footer />
      </Layout.Content>
    </Layout>
  );
};

export default AboutPage;
