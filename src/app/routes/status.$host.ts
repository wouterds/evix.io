import { json, type LoaderFunctionArgs } from '@remix-run/node';

import { Servers } from '~/services/servers.server';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.host) {
    return json({ error: 'Missing host' }, { status: 400 });
  }

  const server = await Servers.update(params.host);

  return json(server);
};
