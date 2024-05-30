import env from '@/lib/env';
import { ApiResponse, fetcher } from '@cd/core-lib';
import { Event, getEvent, getEvents } from '@cd/data-access';
import { FlexBox } from '@cd/ui-lib';
import {
  GetServerSidePropsContext,
  GetStaticProps,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import useSWR from 'swr';

interface EventPageProps {
  event: Event;
  token: string;
}

function EventPage({ event }: EventPageProps) {
  return (
    <>
      <FlexBox>{event.name}</FlexBox>
    </>
  );
}

export default EventPage;

EventPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export const getStaticPaths = async () => {
  const events = await getEvents();
  return {
    paths: events.map(({ id }) => `/events/${id}`) || [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({
  query,
  params,
  locale,
}: GetServerSidePropsContext) => {
  const token = env.nextAuth.secret as string;
  const { event: id } = params as { event: string };
  const event = JSON.parse(JSON.stringify(await getEvent(id)));
  if (!event) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      event,
      token,
    },
  };
};

// export const getServerSideProps = async ({ query, locale }: GetServerSidePropsContext) => {
//     const token = env.nextAuth.secret as string;
//     const { event: id} = query as { event: string }
//     const response = await fetch(
//         `${process.env.NEXT_PUBLIC_SHOP_APP_URL}/api/events`, {
//             headers: { Authorization: `Bearer ${token}` },
//         }
//         );

//     if (!response.ok) return { notFound: true }

//     const {data} = await response.json()
//     console.info('event: ', data);
//     // const event = data.find((event) => event.id === id)
// 	if (!data) {
// 		return {
// 			notFound: true,
// 		};
// 	}
// 	return {
// 		props: {
// 			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
//             event,
//             token
// 		},
// 	};
// };
