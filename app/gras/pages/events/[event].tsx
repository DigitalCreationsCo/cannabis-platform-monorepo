import app from '@/lib/app';
import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import seoConfig from '@/lib/seo.config';
import { getSession } from '@/lib/session';
import { useEvent, useIsLegalAge } from '@cd/core-lib/hooks';
import { fetcher } from '@cd/core-lib/lib';
import { modalActions } from '@cd/core-lib/reducer';
import keywords from '@cd/core-lib/seo';
import { modalTypes } from '@cd/core-lib/types';
import {
	debounce,
	renderAddress,
	showDate,
	showTime,
	urlBuilder,
} from '@cd/core-lib/utils';
import {
	type Attendee,
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
	LoadingDots,
	CheckBox,
} from '@cd/ui-lib';
import {
	ArrowLeftIcon,
	GlobeAmericasIcon,
	ClockIcon,
} from '@heroicons/react/24/solid';
import axios from 'axios';
import { motion } from 'framer-motion';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import RestrictPage from '@/components/shared/RestrictedPage';
import hemp from '../../public/hemp.png';
import { type SharedPageProps } from '../_app';

interface EventPageProps extends SharedPageProps {
	event: Event;
	token: string;
}

function EventPage({
	event,
	user,
	isRouteChanging,
	token,
}: EventPageProps & { user: any }) {
	// console.info('event ', event);
	// console.info('user ', user);
	const Router = useRouter();
	const { t } = useTranslation('common');
	const dispatch = useDispatch();

	const { isLegalAge } = useIsLegalAge(user);
	const { mutateEvent } = useEvent(event.id, token);
	const [isPurchased, setIsPurchased] = useState(false);

	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			})
		);
	}

	const isSignedInOrThrow = (user: User) => {
		if (!user.id) {
			throw new Error(t('user-not-found'));
		}
	};

	const rsvpEvent = () => {
		try {
			isSignedInOrThrow(user);
			sendUserRSVP({ eventId: event.id, user });
		} catch (error: any) {
			if (error.message === t('user-not-found')) {
				openLoginModal();
			} else {
				toast.error(error.message);
			}
		}
	};

	const sendUserRSVP = async ({
		eventId,
		user,
	}: {
		eventId: string;
		user: User;
	}) => {
		try {
			console.info('posting rsvp');
			const response = await axios.post<any, any, Attendee>(
				urlBuilder.shop + `/api/events/${eventId}/rsvp`,
				{
					id: user.id,
					name: user.name,
					image: user.image,
					username: user.username || '',
					rsvpDate: new Date().toISOString(),
					isPurchased,
				}
			);
			console.info('2');
			mutateEvent();
			toast.success(t('rsvp-success'));
		} catch (error) {
			console.error('Error RSVPing to event:', error);
			toast.error(t('rsvp-failed'));
		}
	};

	const updateRSVP = async ({
		eventId,
		user,
	}: {
		eventId: string;
		user: User;
	}) => {
		try {
			await axios.patch<any, any, Partial<Attendee>>(
				`/api/events/${eventId}/rsvp`,
				{
					id: user.id,
					image: user.image,
					name: user.name,
					username: user.username,
					isPurchased,
				}
			);
			mutateEvent();
			toast.success(t('thank-you-attendee'));
		} catch (error) {
			console.error('Error updating rsvp:', error);
			toast.error(t('rsvp-failed'));
		}
	};

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
							url: event.image?.url || hemp.src,
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
			<RestrictPage showContent={!isLegalAge}>
				<Page gradient="green">
					<BackButton />
					<FlexBox className="gap-y-4 max-w-screen-md lg:max-w-full lg:w-full">
						<H1 className="text-3xl md:text-5xl text-white drop-shadow-[0px_2px_2px_#666]">
							{event.name}
						</H1>
						<Grid className="grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-4 w-full">
							<div className="flex flex-col lg:col-span-2 gap-4">
								{isRouteChanging || (
									<motion.div
										key={event.id}
										initial={{ scale: 1.5 }}
										animate={{ scale: 1 }}
										exit={{ scale: 2 }}
									>
										<Image
											loading="eager"
											src={event.image?.url || hemp.src}
											alt={event.name}
											width={300}
											height={300}
											className="mx-auto w-full rounded shadow aspect-auto"
											priority
											quality={100}
										/>
									</motion.div>
								)}
							</div>

							<div className="space-y-4 px-2 lg:col-span-2 xl:col-span-1 lg:py-2">
								<EventDetails />
								<Summary />

								{(event.tickets_url && (
									<RSVP attendees={event.attendees} />
								)) || <></>}
								<Share />
							</div>

							{/* <FlexBox>
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
						height={28}
						width={28}
						className="text-light shrink-0"
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
					<ClockIcon height={28} width={28} className="text-light shrink-0" />
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

	function RSVP({ attendees = [] }: { attendees: Attendee[] }) {
		return (
			<FlexBox className="text-light drop-shadow gap-y-4 pt-2">
				<FlexBox className="gap-y-2">
					<Paragraph>
						{attendees.length > 0 ? `Who's Attending?` : `Be the first to RSVP`}
					</Paragraph>
					<FlexBox className="flex-row gap-6">
						{(!attendees && <LoadingDots />) || (
							<>
								{attendees.slice(0, 3).map((user) => (
									<FlexBox
										key={`avatar-${user.id}`}
										data-tip={user.username}
										className="flex-col items-center gap-2 tooltip tooltip-dark"
									>
										<img
											src={user.image}
											alt={user.username}
											width={50}
											height={50}
											className="rounded-full border-dark border-2"
										/>
										{/* <Image
											src={user.image}
											alt={user.username}
											width={50}
											height={50}
											className="rounded-full"
										/> */}
										{/* <Paragraph>{user.username}</Paragraph> */}
									</FlexBox>
								))}
								{/* <FlexBox className="flex-col w-[50px] h-[50px] items-center gap-2 tooltip tooltip-dark"> */}
								{/* {(attendees?.findIndex((u) => u.id === user.id) !== -1 && (
										<img
											src={user.image}
											alt={user.username}
											width={50}
											height={50}
											className="rounded-full border-dark border-2"
										/>
									)) || (
										<Button
											onClick={rsvpEvent}
											transparent
											hover="accent-soft"
											border
											size="sm"
											className="uppercase border-white border bg-transparent rounded-full gap-x-2 p-4"
										>
											<Paragraph className="text-white font-medium">
												{t('rsvp')}
											</Paragraph>
										</Button>
									)} */}
								{/* <Image
											src={user.image}
											alt={user.username}
											width={50}
											height={50}
											className="rounded-full"
										/> */}
								{/* <Paragraph>{user.username}</Paragraph> */}
								{/* </FlexBox> */}
							</>
						)}
					</FlexBox>
				</FlexBox>

				<FlexBox className="flex-wrap flex-row gap-4">
					<Button
						onClick={rsvpEvent}
						transparent
						hover="primary"
						border
						size="sm"
						className="hover:scale-105 uppercase border-white border bg-transparent rounded-full p-4"
					>
						<Paragraph className="text-white font-medium">
							{t('rsvp')}
						</Paragraph>
					</Button>

					<Link href={`${event.tickets_url}`} target="_blank">
						<Button
							transparent
							hover="primary"
							border
							size="sm"
							className="hover:scale-105 uppercase border-white border bg-transparent rounded-full p-4"
						>
							<Paragraph className="text-white font-medium">
								{t(`get-tickets`)}
							</Paragraph>
						</Button>
					</Link>
				</FlexBox>
				<CheckBox
					checked={isPurchased}
					onChange={() => {
						setIsPurchased(!isPurchased);
						debounce(updateRSVP({ eventId: event.id, user }), 2000);
					}}
					className="w-fit"
					helperText={`Did you purchase a ticket?`}
					label={isPurchased ? `I got 'em` : 'I need tickets'}
					name="purchased"
				/>
			</FlexBox>
		);
	}

	function Share() {
		return (
			<FlexBox className="gap-4 text-light">
				Share this event
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
			user: (user && JSON.parse(JSON.stringify(user))) || {},
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
