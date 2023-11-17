import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';

import { Servers } from '~/services/servers.server';

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  if (!params.host) {
    return json({ error: 'Missing host' }, { status: 400 });
  }

  const env: Record<string, string> = (context as any).env;
  Servers.DIGITALOCEAN_API_KEY = env.DIGITALOCEAN_API_KEY;

  const server = await Servers.update(params.host);

  return json(server);
};
