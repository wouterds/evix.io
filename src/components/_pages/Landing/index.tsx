import Content from 'components/Content';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Head from 'next/head';

import styles from './styles.module.css';

const LandingPage = () => {
  return (
    <Layout>
      <Head>
        <title>Evix</title>
      </Head>
      <Layout.Content>
        <Header />
        <Content styles={[styles.landing]}>
          <h1>EVIX</h1>
          <p>
            We build websites, web apps &amp; mobile apps of the highest
            standards.
          </p>
        </Content>
        <Footer />
      </Layout.Content>
    </Layout>
  );
};

export default LandingPage;
