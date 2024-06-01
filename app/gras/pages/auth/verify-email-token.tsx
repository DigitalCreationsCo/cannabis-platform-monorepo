import { clientPromise } from '@/lib/db';
import {
  deleteVerificationToken,
  updateUser,
  getVerificationToken,
} from '@cd/data-access';
import type { GetServerSidePropsContext } from 'next';
import type { ReactElement } from 'react';

const VerifyEmailToken = () => {
  return <></>;
};

VerifyEmailToken.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { token } = query as { token: string };
  const client = await clientPromise;

  if (!token) {
    return {
      notFound: true,
    };
  }

  const verificationToken = await getVerificationToken({ client, token });

  if (!verificationToken) {
    return {
      redirect: {
        destination: '/auth/login?error=token-not-found',
        permanent: false,
      },
    };
  }

  if (new Date() > verificationToken.expires) {
    return {
      redirect: {
        destination: '/auth/resend-email-token?error=verify-account-expired',
        permanent: false,
      },
    };
  }

  await Promise.allSettled([
    updateUser({
      client,
      where: {
        email: verificationToken.identifier,
      },
      data: {
        emailVerified: new Date(),
      },
    }),

    deleteVerificationToken({ client, token: verificationToken.token }),
  ]);

  return {
    redirect: {
      destination: '/auth/login?success=email-verified',
      permanent: false,
    },
  };
};

export default VerifyEmailToken;
