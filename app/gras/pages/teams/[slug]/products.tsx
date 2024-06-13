import { Paragraph } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPageWithLayout } from '@/lib/next.types';

const Products: NextPageWithLayout = () => {
  const { t } = useTranslation('common');

  return (
    <div className="p-3">
      <Paragraph className="text-sm">{t('product-placeholder')}</Paragraph>
    </div>
  );
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}

export default Products;
