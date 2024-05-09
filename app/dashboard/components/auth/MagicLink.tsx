/* eslint-disable sonarjs/no-redundant-jump */
import { useInvitation, maxLengthPolicies } from '@cd/core-lib';
import { LoadingDots, Button } from '@cd/ui-lib';
import { useFormik } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { InputWithLabel } from '@/components/shared';
import env from '@/lib/env';

interface MagicLinkProps {
  csrfToken: string | undefined;
}

const MagicLink = ({ csrfToken }: MagicLinkProps) => {
  const router = useRouter();
  const { status } = useSession();
  const { t } = useTranslation('common');
  const { invitation } = useInvitation();

  const params = invitation ? `?token=${invitation.token}` : '';

  const callbackUrl = invitation
    ? `/invitations/${invitation.token}`
    : env.redirectIfAuthenticated;

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email().max(maxLengthPolicies.email),
    }),
    onSubmit: async (values) => {
      const response = await signIn('email', {
        email: values.email,
        csrfToken,
        redirect: false,
        callbackUrl,
      });

      formik.resetForm();

      if (response?.error) {
        toast.error(t('email-login-error'));
        return;
      }

      if (response?.status === 200 && response?.ok) {
        toast.success(t('email-login-success'));
        return;
      }
    },
  });

  if (status === 'loading') {
    return <LoadingDots />;
  }

  if (status === 'authenticated') {
    router.push(env.redirectIfAuthenticated);
  }

  return (
    <>
      <Head>
        <title>{t('magic-link-title')}</title>
      </Head>
      <div className="rounded p-6 border">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <InputWithLabel
              type="email"
              label="Email"
              name="email"
              placeholder="jackson@boxyhq.com"
              value={formik.values.email}
              descriptionText="We’ll email you a magic link for a password-free sign in."
              error={formik.touched.email ? formik.errors.email : undefined}
              onChange={formik.handleChange}
            />
            <Button
              type="submit"
              color="primary"
              loading={formik.isSubmitting}
              size="md"
            >
              {t('send-magic-link')}
            </Button>
          </div>
        </form>
        <div className="divider"></div>
        <div className="space-y-3">
          <Link
            href={`/auth/login/${params}`}
            className="btn btn-outline w-full"
          >
            &nbsp;{t('sign-in-with-password')}
          </Link>
          <Link href="/auth/sso" className="btn btn-outline w-full">
            &nbsp;{t('continue-with-saml-sso')}
          </Link>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-3">
        {t('dont-have-an-account')}
        <Link
          href={`/auth/join${params}`}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          &nbsp;{t('create-a-free-account')}
        </Link>
      </p>
    </>
  );
};

export default MagicLink;
