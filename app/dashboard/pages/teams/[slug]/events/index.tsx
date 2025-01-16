import { fetcher, useDispensary } from '@gras/core';
import {
	Button,
	FlexBox,
	PageHeader,
	Paragraph,
	LoadingPage,
	Page,
} from '@gras/ui';
import { TicketIcon } from '@heroicons/react/24/outline';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';
import { Error as ErrorComponent, InfoDialog } from '@/components/shared';
import { Events } from '@/components/team';
import env from '@/lib/env';

export default function EventsPage({
	token,
	teamFeatures,
}: {
	token: string;
	teamFeatures: any;
}) {
	const router = useRouter();
	const { t } = useTranslation('common');

	const [showEventsInfo, setShowEventsInfo] = useState(false);

	const { isLoading, isError, team } = useDispensary();

	const { data } = useSWR(
		team?.slug ? `/api/dispensaries/${team?.slug}/events` : null,
		fetcher
	);
	const events = data?.data || [];

	if (isLoading) {
		return <LoadingPage />;
	}

	if (isError) {
		return <ErrorComponent message={isError.message} />;
	}

	if (!team) {
		return <ErrorComponent message={t('team-not-found')} />;
	}

	return (
		<Page className={twMerge('bg-light mb-24 p-0 m-0 lg:p-0')}>
			<FlexBox className="flex-row items-start gap-x-8">
				<PageHeader iconColor={'primary'} title={t('events')} Icon={TicketIcon}>
					<FlexBox className="flex-row gap-x-6 flex-wrap">
						<Button
							className="my-4 px-4 bg-amber-100 hover:bg-amber-200 active:bg-amber-200 place-self-start"
							onClick={() => router.push(`/teams/${team.slug}/events/new`)}
						>
							{t('new-event')}
						</Button>

						<Button
							onClick={() => setShowEventsInfo(true)}
							size="sm"
							bg="transparent"
							hover="transparent"
							className="py-6 hover:text-primary font-semibold underline"
						>
							{`Learn about events`}
						</Button>
					</FlexBox>
				</PageHeader>
			</FlexBox>
			<FlexBox className="relative flex-col-reverse md:flex-row lg:gap-x-4">
				<Events team={team} events={events} />
			</FlexBox>

			<InfoDialog
				visible={showEventsInfo}
				title={t('host-local-events')}
				onCancel={() => {
					setShowEventsInfo(false);
				}}
			>
				<>
					<Paragraph>{t('events-info')}</Paragraph>
					<Image
						src={require('public/events-1.png')}
						alt={t('host-local-events')}
						className="w-full rounded"
						quality={50}
					/>
				</>
			</InfoDialog>
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
