import Content from 'components/Content';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Head from 'next/head';

const ErrorPage = () => {
  return (
    <Layout>
      <Head>
        <title>Error</title>
      </Head>
      <Layout.Content>
        <Header />
        <Content>
          <p>Something went wrong :(</p>
        </Content>
        <Footer />
      </Layout.Content>
    </Layout>
  );
};

export default ErrorPage;
