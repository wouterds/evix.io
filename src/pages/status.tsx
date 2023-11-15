import Content from 'components/Content';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Head from 'next/head';
import Servers from 'services/servers';

import styles from './styles.module.css';

interface Props {
  servers: Array<{
    name: string;
    ip: string;
    region: string;
    status: string;
  }>;
}

const StatusPage = (props: Props) => {
  const { servers } = props;

  return (
    <Layout>
      <Head>
        <title>Status</title>
      </Head>
      <Layout.Content>
        <Header />
        <Content>
          <div className={styles.status}>
            <ul>
              {servers
                .filter((server) => server.name.indexOf('nym') === -1)
                .map((server) => (
                  <li key={`server-${server.ip}`}>
                    <strong>{server.name}</strong>
                    <br />
                    status:{' '}
                    {server.status === 'active' ? (
                      <span className={styles.online}>online</span>
                    ) : (
                      <span className={styles.offline}>offline</span>
                    )}
                    <br />
                    region: {server.region}
                    <br />
                    ip: {server.ip}
                  </li>
                ))}
            </ul>
          </div>
        </Content>
        <Footer />
      </Layout.Content>
    </Layout>
  );
};

export const getServerSideProps = async () => ({
  props: {
    servers: await Servers.all,
  },
});

export default StatusPage;
