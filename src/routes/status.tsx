import { json, type MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import TextSpinner from '~/components/Spinner';

export const meta: MetaFunction = () => {
  return [
    { title: 'Server status' },
    {
      name: 'description',
      content: "Server status of Evix' services.",
    },
  ];
};

export const loader = async () => {
  return json({
    servers: [],
  });
};

const Status = () => {
  const data = useLoaderData<typeof loader>();
  const servers = data.servers as any[];

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-between">
      {servers.map((server) => (
        <li key={`server:${server.host}`}>
          <strong>{server.host}</strong>
          <br />
          status:{' '}
          {server.loading ? (
            <TextSpinner />
          ) : server.online ? (
            <span className="text-green-600 dark:text-green-500">online</span>
          ) : (
            <span className="text-red-600 dark:text-red-500">offline</span>
          )}
          <br />
          region: {server.region}
          <br />
          ip:{' '}
          {server.loading && !server.ip ? <TextSpinner /> : server.ip || 'n/a'}
        </li>
      ))}
    </ul>
  );
};

export default Status;
