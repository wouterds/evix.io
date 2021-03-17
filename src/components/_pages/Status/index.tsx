import Content from 'components/Content';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Head from 'next/head';
import DigitalOcean from 'services/digitalocean';

import styles from './styles.module.css';

interface Props {
  droplets: Array<{
    name: string;
    ip: string;
    region: string;
    status: string;
  }>;
}

const StatusPage = (props: Props) => {
  const { droplets } = props;

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
              {droplets.map((droplet) => (
                <li key={`droplet-${droplet.ip}`}>
                  <strong>{droplet.name}</strong>
                  <br />
                  status:{' '}
                  {droplet.status === 'active' ? (
                    <span className={styles.online}>online</span>
                  ) : (
                    <span className={styles.offline}>offline</span>
                  )}
                  <br />
                  region: {droplet.region}
                  <br />
                  ip: {droplet.ip}
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

export const getServerSideProps = async () => {
  const droplets = await DigitalOcean.droplets();

  return {
    props: {
      droplets,
    },
  };
};

export default StatusPage;
