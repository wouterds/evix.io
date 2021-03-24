export { default } from 'components/_pages/Status';

import Servers from 'services/servers';

export const getServerSideProps = async () => ({
  props: {
    servers: await Servers.all,
  },
});
