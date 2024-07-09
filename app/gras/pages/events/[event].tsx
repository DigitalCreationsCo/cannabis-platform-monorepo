import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import SEOMetaTags from '@/lib/SEOMetaTags';
import { getSession } from '@/lib/session';
import { renderAddress, showDate, showTime } from '@cd/core-lib';
import { type Event, getEvent, getUserBySession } from '@cd/data-access';
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

interface EventPageProps {
	event: Event;
	token: string;
}

function EventPage({ event, user }: EventPageProps & { user: any }) {
	const Router = useRouter();
	// const showOrFilterPageBySession = {filter: !session? 'blur(2px)' : 'none'}
	console.info('event ', event);
	return (
		<>
			<SEOMetaTags title={event.name} description={event.summary} />
			<Page
				gradient="green"
				// style={{ ...showOrFilterPageBySession}}
			>
				<FlexBox className="gap-y-2 w-[640px] mx-auto">
					<BackButton />
					<H1 className="text-white drop-shadow-[0px_2px_2px_#666]">
						{event.name}
					</H1>
					<div className="w-full">
						<Image
							src={event.image?.url || require('public/hemp.png')}
							alt={event.name}
							width={300}
							height={300}
							className="w-full max-w-[640px] mx-auto rounded shadow"
							priority
						/>
					</div>
					<EventDetails />
					<Summary />

					<FlexBox className="flex-row flex-wrap gap-x-8">
						{(event.tickets_url && <RSVP />) || <></>}
						{/* <Share /> */}
					</FlexBox>
				</FlexBox>
			</Page>
		</>
	);

	function EventDetails() {
		return (
			<FlexBox className="flex-col gap-x-2 flex-wrap">
				<FlexBox className="flex-row gap-2 items-center sm:items-center flex-wrap">
					<MapPinIcon height={20} width={20} className="text-inverse" />
					<Paragraph className="text-white font-medium whitespace-wrap">
						{renderAddress({
							address: {
								street1: event.primary_venue.address.address_1 || '',
								street2: event.primary_venue.address.address_2 || '',
								city: event.primary_venue.address.city || '',
								state: event.primary_venue.address.region || '',
								zipcode: event.primary_venue.address.postal_code || '',
							} as any,
							lineBreak: false,
						})}
					</Paragraph>
				</FlexBox>
				<FlexBox className="flex-row gap-2 items-center sm:items-center flex-wrap">
					<ClockIcon height={20} width={20} className="text-inverse" />
					<Paragraph className="text-white font-medium">
						{showDate(event.start_date)}{' '}
						{showTime(event.start_time, event.timezone)} -{' '}
						{showDate(event.end_date)}{' '}
						{showTime(event.end_time, event.timezone)}
					</Paragraph>
				</FlexBox>
			</FlexBox>
		);
	}

	function Summary() {
		return (
			<Paragraph className="text-white font-medium drop-shadow">
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
				className="w-fit p-0 text-light self-start hover:underline"
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
					<Paragraph className="text-white font-medium">{`Get tickets`}</Paragraph>
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
	req,
	res,
	params,
	locale,
}: GetServerSidePropsContext) => {
	const session = await getSession(req, res);

	const client = await clientPromise;
	const token = env.nextAuth.secret!;

	const user = await getUserBySession({ client, session });

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
			user: (user && JSON.parse(JSON.stringify(user))) || null,
			token,
		},
	};
};
