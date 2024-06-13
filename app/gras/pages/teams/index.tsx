import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Teams } from '@/components/team';
import type { NextPageWithLayout } from '@/lib/next.types';

const AllTeams: NextPageWithLayout = () => {
  return <Teams />;
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}

export default AllTeams;
