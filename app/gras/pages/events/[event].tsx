import { renderAddress } from '@cd/core-lib';
import { type Event, getEvent, getEvents } from '@cd/data-access';
import { Button, FlexBox, H1, IconWrapper, Page, Paragraph } from '@cd/ui-lib';
import {
  UsersIcon as ShareIcon,
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactElement } from 'react';
import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import SEOMetaTags from '@/lib/SEOMetaTags';
import { getSession } from '@/lib/session';

interface EventPageProps {
  event: Event;
  token: string;
}

function EventPage({ event, session}: EventPageProps & any) {

  console.info('session ', session)
  const Router = useRouter();
  const showOrFilterPageBySession = {filter: !session? 'blur(2px)' : 'none'}
  console.info('event ', event);
  return (
    <>
      <SEOMetaTags title={event.name} description={event.summary} />
      <Page gradient="green" style={{ ...showOrFilterPageBySession}}>
        <BackButton />
        <FlexBox className="gap-y-2 max-w-screen">
          <H1 className="text-white drop-shadow-[0px_2px_0px_#666]">
            {event.name}
          </H1>
          <div className="min-w-full">
            <Image
              src={event.image.url}
              alt={event.name}
              width={150}
              height={150}
              className="w-full max-w-[440px] rounded shadow"
              priority
              quality={25}
            />
          </div>
          <EventDetails />
          <Summary />

          <FlexBox className="flex-row flex-wrap gap-x-8">
            <RSVP />
            {/* <Share /> */}
          </FlexBox>
        </FlexBox>
      </Page>
    </>
  );

  function EventDetails() {
    return (
      <FlexBox className="flex-row gap-x-2 flex-wrap">
        <FlexBox className="flex-row gap-2 items-center sm:items-start flex-wrap">
          <MapPinIcon height={20} width={20} className="text-white" />
          <Paragraph className="text-white font-medium whitespace-wrap">
            {renderAddress({
              address: {
                street1: event.primary_venue.address.address_1 || '',
                street2: event.primary_venue.address.address_2 || '',
                city: event.primary_venue.address.city || '',
                state: event.primary_venue.address.region || '',
                zipcode: event.primary_venue.address.postal_code || '',
              } as any,
              lineBreak: true,
            })}
          </Paragraph>
        </FlexBox>
        <FlexBox className="flex-row gap-2 items-center sm:items-start flex-wrap">
          <ClockIcon height={20} width={20} className="text-white" />
          <Paragraph className="text-white font-medium">
            {new Date(event.start_date).toLocaleString()}
          </Paragraph>
        </FlexBox>
      </FlexBox>
    );
  }

  function Summary() {
    return (
      <Paragraph className="text-white font-medium drop-shadow-[0px_1px_0px_#666]">
        {event.summary}
      </Paragraph>
    );
  }

  function BackButton() {
    return (
      <Button
        size="sm"
        bg="transparent"
        hover="transparent"
        className="text-light self-start sm:py-0 hover:underline"
        onClick={() => Router.back()}
      >
        <IconWrapper Icon={ArrowLeftIcon} className="pr-1" />
        back
      </Button>
    );
  }

  function RSVP() {
    return (
      <Link href={`${event.tickets_url}`} target="_blank" className="inline">
        <Button
          transparent
          hover="accent-soft"
          border
          size="sm"
          className="border-white border bg-transparent rounded-full gap-x-2 p-4"
        >
          <Paragraph className="text-white">{`Get tickets`}</Paragraph>
        </Button>
      </Link>
    );
  }

  function Share() {
    return (
      <Button
        transparent
        hover="accent-soft"
        border
        size="sm"
        className="border-white border bg-transparent rounded-full gap-x-2 p-4"
      >
        <ShareIcon height={22} width={22} className="text-white" />
        <Paragraph className="text-white">{`Share`}</Paragraph>
      </Button>
    );
  }
}
export default EventPage;

EventPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

// export const getStaticPaths = async () => {
//   const client = await clientPromise;
//   const events = await getEvents({ client });
//   return {
//     paths: events.map(({ id }) => `/events/${id}`) || [],
//     fallback: 'blocking',
//   };
// };

export const getServerSideProps = async ({
  req, res,
  params,
  locale,
}: GetServerSidePropsContext) => {

  const session = await getSession(req, res)

  const client = await clientPromise;
  const token = env.nextAuth.secret as string;

  const { event: id } = params as { event: string };
  const event = await getEvent({ client, where: { id } });

  if (!event) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      event: JSON.parse(JSON.stringify(event)),
      session,
      token,
    },
  };
};
