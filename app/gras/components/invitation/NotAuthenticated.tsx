import { type Invitation } from '@cd/data-access';
import { Button } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface NotAuthenticatedProps {
  invitation: Invitation;
}

const NotAuthenticated = ({ invitation }: NotAuthenticatedProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <h3 className="text-center">{t('invite-create-account')}</h3>
      <Button
        onClick={() => {
          router.push(`/auth/join?token=${invitation.token}`);
        }}
        size="md"
      >
        {t('create-a-new-account')}
      </Button>
      <Button
        onClick={() => {
          router.push(`/auth/login?token=${invitation.token}`);
        }}
        size="md"
      >
        {t('login')}
      </Button>
    </>
  );
};

export default NotAuthenticated;
