import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';

import { Servers } from '~/services/servers.server';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.host) {
    return json({ error: 'Missing host' }, { status: 400 });
  }

  const server = await Servers.update(params.host);

  return json(server);
};
