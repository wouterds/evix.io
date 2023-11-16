import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';

import TextSpinner from '~/components/Spinner';
import { Servers } from '~/services/servers.server';

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
  return {
    servers: Servers.list,
  };
};

const Status = () => {
  const data = useLoaderData<typeof loader>();
  const [servers, setServers] = useState(
    data.servers.map((server) => ({
      ...server,
      loading: true,
    })),
  );

  const fetching = useRef(false);
  useEffect(() => {
    if (fetching.current) {
      return;
    }

    fetching.current = true;

    (async () => {
      for (const { host } of data.servers) {
        console.log('fetch', host);
        const response = await fetch(`/status/${host}`);
        const data = await response.json();

        setServers((servers) => {
          const index = servers.findIndex((server) => server.host === host);
          if (index === -1) {
            return servers;
          }

          return [
            ...servers.slice(0, index),
            {
              ...servers[index],
              ...data,
              loading: false,
            },
            ...servers.slice(index + 1),
          ];
        });
      }
    })();
  }, [data.servers]);

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
