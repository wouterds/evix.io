import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';

import { Servers } from '~/services/servers.server';

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  if (!params.host) {
    return json({ error: 'Missing host' }, { status: 400 });
  }

  Servers.DIGITALOCEAN_API_KEY = context.DIGITALOCEAN_API_KEY as string;

  const server = await Servers.update(params.host);

  return json(server);
};
