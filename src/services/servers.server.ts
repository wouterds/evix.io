const lookup = async (host: string) => {
  const response = await fetch(`https://dns.google/resolve?name=${host}`);
  if (response.status !== 200) {
    return null;
  }

  const data: any = await response.json();
  if (!Array.isArray(data?.Answer)) {
    return null;
  }

  return data.Answer.find?.((a: any) => a.type === 1)?.data || null;
};

type ServerInfo = {
  region: string;
  ip: string | null;
  online: boolean;
  digitalOcean: boolean;
};

export class Servers {
  private static _list: Record<string, ServerInfo> = {
    'raspberrypi.evix.io': {
      region: 'BE9000',
      ip: null,
      online: false,
      digitalOcean: false,
    },
    'web1.evix.io': {
      region: 'AMS',
      ip: null,
      online: false,
      digitalOcean: true,
    },
    'mail.evix.io': {
      region: 'AMS',
      ip: null,
      online: false,
      digitalOcean: true,
    },
  };

  public static get list() {
    return Object.entries(this._list).map(([host, info]) => ({
      host,
      ...info,
    }));
  }

  public static async update(host: string) {
    const server = this._list[host];
    if (!server) {
      return null;
    }

    if (!server.digitalOcean) {
      try {
        const address = await lookup(host);
        server.ip = address || 'n/a';

        if (server.ip) {
          const response = await fetch(`https://${host}`);
          server.online = response.status === 200;
        }

        return server;
      } catch {
        return server;
      }
    }

    try {
      const response = await fetch(
        `https://api.digitalocean.com/v2/droplets?name=${host}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.DIGITALOCEAN_API_KEY}`,
          },
        },
      );

      const data: any = await response.json();

      const droplet = data.droplets[0];
      if (!droplet) {
        return server;
      }

      server.online = droplet.status === 'active';
      server.ip = droplet.networks.v4[0].ip_address;
      server.region = droplet.region.slug.toUpperCase();

      return server;
    } catch {
      return server;
    }
  }
}
