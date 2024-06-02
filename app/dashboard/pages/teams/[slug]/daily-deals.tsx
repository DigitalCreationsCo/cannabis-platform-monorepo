import {
  modalActions,
  modalTypes,
  useAppDispatch,
  useDispensary,
} from '@cd/core-lib';
import {
  Button,
  FlexBox,
  PageHeader,
  Paragraph,
  LoadingPage,
  Page,
  NewDailyDeal,
} from '@cd/ui-lib';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  Error as ErrorComponent,
  UpgradeAccountDialog,
} from '@/components/shared';
import { DailyDeals } from '@/components/team';
import SendDailyDealsInviteForm from '@/components/team/SendDailyDealsInviteModal';
import env from '@/lib/env';

const dailyDealsInfo = `Daily Deals are a great way to promote your business to your customers.
Messages are sent to your customers via text message. 

Use daily deals to promote products or promote events.

Schedule Daily Deals, or send a one-time message.`;

export default function DailyDealsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const { isLoading, isError, team } = useDispensary();
  const { t } = useTranslation('common');

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

  const isSubscribedForMessagingOrThrow = (team) => {
    if (!team.isSubscribedForMessaging) {
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
                  setShowSubscriptionMessage(true);
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
                  setShowSubscriptionMessage(true);
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
        team={team}
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
          />
        </>
      </UpgradeAccountDialog>
    </Page>
  );
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      teamFeatures: env.teamFeatures,
    },
  };
}
