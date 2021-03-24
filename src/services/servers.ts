import dns from 'dns';
import util from 'util';
const lookup = util.promisify(dns.lookup);

const Servers = {
  get all() {
    return (async () => {
      const servers = [];

      // non digital ocean droplets
      const host = 'registry.evix.io';
      const server = {
        ip: 'n/a',
        name: host,
        region: 'n/a',
        status: 'offline',
      };
      try {
        const { address } = await lookup(host);
        server.ip = address || 'n/a';

        if (server.ip) {
          const response = await fetch(`https://${host}`);
          server.status = response.status === 200 ? 'active' : 'offline';
        }
      } catch {}
      servers.push(server);

      // digital ocean droplets
      try {
        const response = await fetch(
          'https://api.digitalocean.com/v2/droplets',
          {
            headers: {
              Authorization: `Bearer ${process.env.DIGITALOCEAN_API_KEY}`,
            },
          },
        );

        const data = await response.json();

        const droplets = data.droplets.map((droplet) => {
          let ip = null;
          const name = droplet.name;
          const status = droplet.status;
          const region = droplet.region.slug;
          for (const network of droplet.networks.v4) {
            if (network.type === 'public') {
              ip = network.ip_address;
            }
          }

          return {
            name,
            status,
            ip,
            region,
          };
        });

        servers.push(...droplets);
      } catch {}

      return servers.sort((a, b) => (a.name > b.name ? -1 : 1));
    })();
  },
};

export default Servers;
