import {
	type inferSSRProps,
	useCanAccess,
	useDispensary,
	throwIfNotAllowed,
} from '@cd/core-lib';
import { type User, getStaffMember, type StaffMember } from '@cd/data-access';
import { LoadingPage } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { Error, Card } from '@/components/shared';
import { TeamTab } from '@/components/team';
import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import type { NextPageWithLayout } from '@/lib/next.types';
import { getViewerToken } from '@/lib/retraced';
import { getSession } from '@/lib/session';

interface RetracedEventsBrowserProps {
	host: string;
	auditLogToken: string;
	header: string;
}

const RetracedEventsBrowser = dynamic<RetracedEventsBrowserProps>(
	() => import('@retracedhq/logs-viewer'),
	{
		ssr: false,
	}
);

const Events: NextPageWithLayout<inferSSRProps<typeof getServerSideProps>> = ({
	auditLogToken,
	retracedHost,
	error,
	teamFeatures,
}) => {
	const { t } = useTranslation('common');
	const { canAccess } = useCanAccess();
	const { isLoading, isError, team } = useDispensary();

	if (isLoading) {
		return <LoadingPage />;
	}

	if (isError || error) {
		return <Error message={isError?.message || error?.message} />;
	}

	if (!team) {
		return <Error message={t('team-not-found')} />;
	}

	return (
		<>
			<TeamTab activeTab="audit-logs" team={team} teamFeatures={teamFeatures} />
			<Card>
				<Card.Body>
					{canAccess('team_audit_log', ['read']) && auditLogToken && (
						<RetracedEventsBrowser
							host={`${retracedHost}/viewer/v1`}
							auditLogToken={auditLogToken}
							header={t('audit-logs')}
						/>
					)}
				</Card.Body>
			</Card>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	if (!env.teamFeatures.auditLog) {
		return {
			notFound: true,
		};
	}
	const client = await clientPromise;
	const { locale, req, res, query } = context;

	const session = (await getSession(req, res)) as unknown as {
		user: User;
	} | null;
	const teamMember = (await getStaffMember({
		client,
		where: {
			userId: session?.user.id!,
			slug: query.slug as string,
		},
	})) as StaffMember;

	try {
		throwIfNotAllowed(teamMember, 'team_audit_log', 'read');

		const auditLogToken = await getViewerToken(
			teamMember.team.id,
			session?.user.id!
		);

		return {
			props: {
				...(locale ? await serverSideTranslations(locale, ['common']) : {}),
				error: null,
				auditLogToken: auditLogToken ?? '',
				retracedHost: env.retraced.url ?? '',
				teamFeatures: env.teamFeatures,
			},
		};
	} catch (error: unknown) {
		const { message } = error as { message: string };
		return {
			props: {
				...(locale ? await serverSideTranslations(locale, ['common']) : {}),
				error: {
					message,
				},
				auditLogToken: null,
				retracedHost: null,
				teamFeatures: env.teamFeatures,
			},
		};
	}
}

export default Events;
