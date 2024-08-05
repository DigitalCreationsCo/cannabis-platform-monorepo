import app from '@/lib/app';
import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import { getSession } from '@/lib/session';
import {
	axios,
	fetcher,
	keywords,
	renderAddress,
	showDate,
	showTime,
} from '@cd/core-lib';
import {
	type Event,
	type EventComment,
	getEvent,
	getUserBySession,
	type User,
} from '@cd/data-access';
import {
	Button,
	FlexBox,
	Grid,
	H1,
	H5,
	IconWrapper,
	Page,
	Paragraph,
	Icons,
} from '@cd/ui-lib';
import {
	UsersIcon as ShareIcon,
	ArrowLeftIcon,
	GlobeAmericasIcon,
	ClockIcon,
} from '@heroicons/react/24/solid';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import useSWR from 'swr';
import RestrictPage from '@/components/shared/RestrictedPage';
import seoConfig from '@/lib/seo.config';

interface EventPageProps {
	event: Event;
	token: string;
}

function EventPage({ event, user }: EventPageProps & { user: any }) {
	const Router = useRouter();
	return (
		<>
			<NextSeo
				title={event.name}
				description={event.summary}
				openGraph={{
					url: window.location.href,
					title: `${event.name} at Gras.live`,
					type: 'website',
					description: app.description,
					images: [
						{
							url: event.image?.url || require('public/hemp.png'),
							alt: event.name,
							width: 300,
						},
					],
					siteName: app.name,
				}}
				additionalLinkTags={seoConfig.additionalLinkTags}
				additionalMetaTags={[
					...seoConfig.additionalMetaTags,
					{
						name: 'keywords',
						content: [
							...keywords['cannabis'],
							...keywords['business'],
							...keywords['events'],
						].join(', '),
					},
				]}
			/>
			<RestrictPage showRestrictedContent={user.is_legal_age}>
				<Page
					gradient="green"
					// style={{ ...showOrFilterPageBySession}}
				>
					<BackButton />
					<FlexBox className="gap-y-4 max-w-screen-md lg:max-w-full lg:w-full">
						<H1 className="text-white drop-shadow-[0px_2px_2px_#666]">
							{event.name}
						</H1>
						<Grid className="grid-cols-1 lg:grid-cols-4 gap-8 w-full">
							<div className="flex max-w-screen-sm flex-col lg:col-span-2 gap-4">
								<EventDetails />
								<Image
									src={event.image?.url || require('public/hemp.png')}
									alt={event.name}
									width={300}
									height={300}
									className="mx-auto w-full rounded shadow aspect-auto"
									priority
									quality={100}
								/>
								<Summary />
							</div>

							<div className="space-y-4">
								{(event.tickets_url && <RSVP />) || <></>}
								<Share />
							</div>

							{/* <FlexBox className="px-4">
							<Comments comments={event.comments ?? []} user={user} />
						</FlexBox> */}
						</Grid>
					</FlexBox>
				</Page>
			</RestrictPage>
		</>
	);

	function EventDetails() {
		return (
			<FlexBox className="flex-col gap-x-2 flex-wrap">
				<FlexBox className="flex-row gap-2 items-center">
					<GlobeAmericasIcon
						height={20}
						width={20}
						className="text-inverse shrink-0"
					/>
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
				<FlexBox className="flex-row gap-2 items-center">
					<ClockIcon height={20} width={20} className="text-inverse shrink-0" />
					<Paragraph className="text-white font-medium whitespace-normal">
						{`${showDate(event.start_date)} 
						${showTime(event.start_time, event.timezone)} - 
						${showDate(event.end_date)} 
						${showTime(event.end_time, event.timezone)}`}
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
			<Link href={`${event.tickets_url}`} target="_blank" className="w-fit">
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
			<FlexBox className="gap-4">
				{/* <Button
					transparent
					hover="accent-soft"
					border
					size="sm"
					className="border-white border bg-transparent rounded-full gap-x-2 p-4"
				>
					<ShareIcon height={22} width={22} className="text-white" />
					<Paragraph className="text-white">{`Share`}</Paragraph>
				</Button> */}
				<Link
					className="twitter-share-button w-fit"
					href={`https://x.com/compose/post?text=${encodeURIComponent(`I'll be at ${event.name} in ${event.primary_venue.address.city} on ${showDate(event.start_date)}.

Come check it out! https://gras.live${window.location.pathname}
#cannabis #events`)}`}
					target="_blank"
				>
					<Button
						transparent
						border
						size="sm"
						className="border-white border bg-transparent rounded-full w-fit h-fit p-0"
					>
						<Icons.TwitterFilled className="text-white shrink-0 h-16 w-16 lg:h-10 lg:w-10" />
						{/* <Paragraph className="text-white">{`Share`}</Paragraph> */}
					</Button>
				</Link>
			</FlexBox>
		);
	}
}
export default EventPage;

EventPage.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>;
};

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
			user: {
				...((user && JSON.parse(JSON.stringify(user))) || {}),
				is_legal_age:
					user?.is_legal_age || Boolean(req.cookies['is_legal_age']) || false,
			},
			token,
		},
	};
};

const Comments = ({
	user,
	comments,
}: {
	comments: EventComment[];
	user: User;
}) => {
	const [newComment, setNewComment] = useState('');
	const { event } = useParams() as { event: string };

	const { mutate } = useSWR(`/api/events/${event}/comments`, fetcher);

	const handleCommentSubmit = async () => {
		try {
			await axios.post<any, any, Omit<EventComment, 'created_at'>>(
				`/api/events/${event}/comments`,
				{
					username: user.username,
					userId: user.id,
					comment: newComment,
				}
			);
			mutate();
		} catch (error) {
			console.error('Error posting comment:', error);
		}
	};

	return (
		<div className="comments-section flex flex-col max-h-fit w-full gap-4">
			<H5 className="text-light">Read the comments</H5>
			<ul className="comments-list h-[45vh] rounded shadow-inner">
				{comments.map((comment, index) => (
					<li key={index} className="comment">
						<p>
							<strong>{comment.username}</strong> (
							{new Date(comment.created_at).toLocaleString()}):
						</p>
						<p>{comment.comment}</p>
					</li>
				))}
			</ul>
			<div className="post-comment">
				<textarea
					className="w-full p-4"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="Write a comment..."
				/>
				<Button
					className="w-full hover:border border-light transition p-2 text-light"
					size="sm"
					bg="transparent"
					hover="transparent"
					transparent
					onClick={handleCommentSubmit}
				>
					Post Comment
				</Button>
			</div>
		</div>
	);
};
