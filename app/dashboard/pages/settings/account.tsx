import { getUserBySession } from '@cd/data-access';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UpdateAccount } from '@/components/account';
import env from '@/lib/env';
import type { NextPageWithLayout } from '@/lib/next.types';
import { getSession } from '@/lib/session';

type AccountProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Account: NextPageWithLayout<AccountProps> = ({
  user,
  allowEmailChange,
}) => {
  return <UpdateAccount user={user} allowEmailChange={allowEmailChange} />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context.req, context.res);
  const user = await getUserBySession(session);
  const { locale } = context;

  if (!user) {
    return {
      notFound: true,
    };
  }
  console.log('user', user);

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image || null,
      },
      allowEmailChange: env.confirmEmail === false,
    },
  };
};

export default Account;
