import Content from 'components/Content';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Head from 'next/head';
import { useMemo } from 'react';
import Servers from 'services/servers';

import styles from './styles.module.css';

type Mixnode = {
  name: string;
  ip: string;
  region: string;
  status: string;
  version: string;
  address: string;
  reputation: number;
  layer: number;
};

interface Props {
  servers: Array<{
    name: string;
    ip: string;
    region: string;
    status: string;
  }>;
  mixnodes: Array<{
    mixHost: string;
    version: string;
    incentivesAddress: string;
    reputation: number;
    layer: number;
  }>;
}

const StatusNymNodesPage = (props: Props) => {
  const { servers, mixnodes } = props;

  const nodes: Mixnode[] = useMemo(() => {
    return servers
      .filter((server) => server.name.indexOf('nym') !== -1)
      .map((server) => {
        let status = 'offline';
        let node = null;
        for (const mixnode of mixnodes) {
          if (mixnode.mixHost.indexOf(server.ip) !== -1) {
            node = mixnode;
          }
        }

        if (node) {
          status = server.status;
        }

        return {
          ...server,
          version: node?.version || 'n/a',
          address: node?.incentivesAddress || 'n/a',
          reputation: node?.reputation || 'n/a',
          layer: node?.layer || 'n/a',
          status,
        };
      });
  }, [servers, mixnodes]);

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
              {nodes.map((node) => (
                <li key={`server-${node.ip}`}>
                  <strong>{node.name}</strong>
                  <br />
                  status:{' '}
                  {node.status === 'active' ? (
                    <span className={styles.online}>online</span>
                  ) : (
                    <span className={styles.offline}>offline</span>
                  )}
                  <br />
                  region: {node.region}
                  <br />
                  ip: {node.ip}
                  <br />
                  <span className={styles.address}>
                    address: {node.address.substr(0, 9)}
                  </span>
                  version: {node.version}
                  <br />
                  layer: {node.layer}
                  <br />
                  rep: {node.reputation}
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
  const response = await fetch(
    'https://testnet-validator1.nymtech.net/api/mixmining/topology',
  );
  const data = await response.json();
  const mixnodes = Array.isArray(data?.mixNodes) ? data?.mixNodes : [];

  return {
    props: {
      mixnodes,
      servers: await Servers.all,
    },
  };
};

export default StatusNymNodesPage;
