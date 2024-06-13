import {
  fetcher,
  useDispensary,
  useCanAccess,
  type TeamFeature,
} from '@cd/core-lib';
import { LoadingPage } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';
import Help from '@/components/billing/Help';
import LinkToPortal from '@/components/billing/LinkToPortal';
import ProductPricing from '@/components/billing/ProductPricing';
import Subscriptions from '@/components/billing/Subscriptions';
import { Error } from '@/components/shared';
import { TeamTab } from '@/components/team';
import env from '@/lib/env';

const Payments = ({ teamFeatures }: { teamFeatures: TeamFeature }) => {
  const { t } = useTranslation('common');
  const { canAccess } = useCanAccess();
  const { isLoading, isError, team } = useDispensary();
  const { data } = useSWR(
    team?.slug ? `/api/dispensaries/${team?.slug}/payments/products` : null,
    fetcher
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <Error message={isError.message} />;
  }

  if (!team) {
    return <Error message={t('team-not-found')} />;
  }

  const plans = data?.data?.products || [];
  const subscriptions = data?.data?.subscriptions || [];

  return (
    <>
      {canAccess('team_payments', ['read']) && (
        <>
          <TeamTab
            activeTab="payments"
            team={team}
            teamFeatures={teamFeatures}
          />

          <div className="flex gap-6 flex-col md:flex-row">
            <LinkToPortal team={team} />
            <Help />
          </div>

          <div className="py-6">
            <Subscriptions subscriptions={subscriptions} />
          </div>

          <ProductPricing plans={plans} subscriptions={subscriptions} />
        </>
      )}
    </>
  );
};

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
      teamFeatures: env.teamFeatures,
    },
  };
}

export default Payments;
