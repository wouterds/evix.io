import dns from 'dns';
import util from 'util';
const lookup = util.promisify(dns.lookup);

const Servers = {
  get all() {
    return (async () => {
      const servers = [];

      // non digital ocean droplets
      const hosts = ['registry.evix.io', 'static.evix.io', 'nym1.evix.io'];
      for (const host of hosts) {
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
      }

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

      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base',
      });
      return servers.sort((a, b) => collator.compare(a.name, b.name));
    })();
  },
};

export default Servers;
