import {
	Error as ErrorComponent,
	UpgradeAccountDialog,
} from '@/components/shared';
import { DailyDeals } from '@/components/team';
import env from '@/lib/env';
import {
	fetcher,
	modalActions,
	modalTypes,
	useAppDispatch,
	useDispensary,
} from '@gras/core';
import { type Dispensary } from '@gras/data-access';
import {
	Button,
	FlexBox,
	PageHeader,
	Paragraph,
	LoadingPage,
	Page,
	NewDailyDeal,
} from '@gras/ui';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';
import SendDailyDealsInviteForm from '@/components/team/SendDailyDealsInviteModal';

const dailyDealsInfo = `Daily Deals are a great way to promote your business to your customers.
Messages are sent to your customers via text message. 

Use daily deals to promote products or promote events.

Schedule Daily Deals, or send a one-time message.`;

export default function DailyDealsPage({
	token,
	teamFeatures,
}: {
	token: string;
	teamFeatures: any;
}) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { t } = useTranslation('common');

	const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);
	const [showNewMessageModal, setShowNewMessageModal] = useState(false);
	const [showInviteModal, setShowInviteModal] = useState(false);

	const { isLoading, isError, team } = useDispensary();

	const { data } = useSWR(
		team?.slug ? `/api/dispensaries/${team?.slug}/payments/products` : null,
		fetcher
	);
	const subscriptions = data?.data?.subscriptions || [];

	if (isLoading) {
		return <LoadingPage />;
	}

	if (isError) {
		return <ErrorComponent message={isError.message} />;
	}

	if (!team) {
		return <ErrorComponent message={t('team-not-found')} />;
	}

	async function openDailyDealsInfoModal() {
		dispatch(
			modalActions.openModal({
				modalVisible: true,
				modalType: modalTypes.showModal,
				modalText: dailyDealsInfo,
			})
		);
	}

	const hasActiveSubscription = (product: string) =>
		subscriptions.some((s) => s.product.name.includes(product));

	const isSubscribedForMessagingOrThrow = (team: Dispensary) => {
		if (!hasActiveSubscription('Messaging by Gras')) {
			throw new Error(t('not-subscribed-for-messaging'));
		}
	};

	return (
		<Page className={twMerge('bg-light mb-24 p-0 m-0 lg:p-0')}>
			<FlexBox className="flex-row items-start gap-x-8">
				<PageHeader
					iconColor={'primary'}
					title={`Daily Deals`}
					Icon={ChatBubbleBottomCenterTextIcon}
				>
					<FlexBox className="flex-row gap-x-6 flex-wrap">
						<Button
							className="my-4 px-4 bg-amber-100 hover:bg-amber-200 active:bg-amber-200 place-self-start"
							onClick={() => {
								try {
									isSubscribedForMessagingOrThrow(team);
									setShowNewMessageModal(true);
								} catch (error: any) {
									if (error.message === t('not-subscribed-for-messaging')) {
										setShowSubscriptionMessage(true);
									} else {
										toast.error(error.message);
									}
								}
							}}
						>
							{t('new-daily-deal')}
						</Button>
						<Button
							className="my-4 px-4 bg-amber-100 hover:bg-amber-200 active:bg-amber-200 place-self-start"
							onClick={() => {
								try {
									isSubscribedForMessagingOrThrow(team);
									setShowInviteModal(true);
								} catch (error: any) {
									if (error.message === t('not-subscribed-for-messaging')) {
										setShowSubscriptionMessage(true);
									} else {
										toast.error(error.message);
									}
								}
							}}
						>
							{t('invite-customer')}
						</Button>
						<Button
							onClick={openDailyDealsInfoModal}
							size="sm"
							bg="transparent"
							hover="transparent"
							className="py-6 hover:text-primary font-semibold underline"
						>
							{`What is a daily deal?`}
						</Button>
					</FlexBox>
				</PageHeader>
			</FlexBox>
			<FlexBox className="relative flex-col-reverse md:flex-row lg:gap-x-4">
				<DailyDeals
					token={token}
					team={team}
					isSubscribedOrThrow={() => isSubscribedForMessagingOrThrow(team)}
					showSubscription={() => setShowSubscriptionMessage(true)}
				/>
				<SendDailyDealsInviteForm
					modalVisible={showInviteModal}
					onCancel={() => setShowInviteModal(false)}
					// className={twMerge('hidden')}
					team={team}
					isSubscribedOrThrow={() => isSubscribedForMessagingOrThrow(team)}
					showSubscription={() => setShowSubscriptionMessage(true)}
				/>
			</FlexBox>

			<NewDailyDeal
				organization={team}
				modalVisible={showNewMessageModal}
				onCancel={() => {
					setShowNewMessageModal(false);
				}}
			/>

			<UpgradeAccountDialog
				visible={showSubscriptionMessage}
				title={t('upgrade-to-messaging')}
				onCancel={() => {
					setShowSubscriptionMessage(false);
				}}
				onConfirm={() => router.push(`/teams/${team.slug}/billing`)}
			>
				<>
					<Paragraph>{t('messaging-service-info')}</Paragraph>
					<Image
						src={require('public/message.png')}
						alt={t('upgrade-to-messaging')}
						className="w-full rounded"
						quality={100}
					/>
				</>
			</UpgradeAccountDialog>
		</Page>
	);
}

export async function getServerSideProps({
	locale,
}: GetServerSidePropsContext) {
	if (!env.teamFeatures.payments) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			token: env.nextAuth.secret,
			teamFeatures: env.teamFeatures,
		},
	};
}
