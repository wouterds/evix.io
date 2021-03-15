import Content from 'components/Content';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Head from 'next/head';

const NotFoundPage = () => {
  return (
    <Layout>
      <Head>
        <title>Not found</title>
      </Head>
      <Layout.Content>
        <Header />
        <Content>
          <p>This page could not be found :(</p>
        </Content>
        <Footer />
      </Layout.Content>
    </Layout>
  );
};

export default NotFoundPage;
