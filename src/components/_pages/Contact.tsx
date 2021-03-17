import Content from 'components/Content';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Head from 'next/head';

const ContactPage = () => {
  return (
    <Layout>
      <Head>
        <title>Contact</title>
      </Head>
      <Layout.Content>
        <Header />
        <Content>
          <p>
            <strong>Wouter De Schuyter</strong>
            <br />
            email: <a href="mailto:info@evix.io">info@evix.io</a>
            <br />
            tel: <a href="tel:+32479228210">+32479228210</a>
          </p>
        </Content>
        <Footer />
      </Layout.Content>
    </Layout>
  );
};

export default ContactPage;
