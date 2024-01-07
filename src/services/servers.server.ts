type ServerInfo = {
  region: string;
  ip: string | null;
  online: boolean;
};

export class Servers {
  private static _DIGITALOCEAN_API_KEY: string | null = null;
  private static _list: Record<string, ServerInfo> = {
    'web1.evix.io': {
      region: 'AMS',
      ip: null,
      online: false,
    },
    'mail.evix.io': {
      region: 'AMS',
      ip: null,
      online: false,
    },
  };

  public static set DIGITALOCEAN_API_KEY(value: string | null) {
    this._DIGITALOCEAN_API_KEY = value;
  }

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

    try {
      const response = await fetch(
        `https://api.digitalocean.com/v2/droplets?name=${host}`,
        {
          headers: {
            Authorization: `Bearer ${this._DIGITALOCEAN_API_KEY}`,
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
