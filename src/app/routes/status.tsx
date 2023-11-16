import { defer, type MetaFunction } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';

import TextSpinner from '~/components/Spinner';
import { Servers } from '~/services/servers';

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
  return defer({
    servers: Servers.list.map((server) => {
      return {
        ...server,
        synced: Servers.update(server.host),
      };
    }),
  });
};

const Contact = () => {
  const { servers } = useLoaderData<typeof loader>();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-between">
      {servers.map((server) => (
        <li key={`server:${server.host}`}>
          <strong>{server.host}</strong>
          <br />
          status:{' '}
          <Suspense fallback={<TextSpinner />}>
            <Await resolve={server.synced}>
              {server.online ? (
                <span className="text-green-600 dark:text-green-500">
                  online
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-500">offline</span>
              )}
            </Await>
          </Suspense>
          <br />
          region: {server.region}
          <br />
          ip:{' '}
          <Suspense fallback={server.ip || <TextSpinner />}>
            <Await resolve={server.synced}>{server.ip || 'n/a'}</Await>
          </Suspense>
        </li>
      ))}
    </ul>
  );
};

export default Contact;
