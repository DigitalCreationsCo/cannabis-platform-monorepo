/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-duplicated-branches */
import { SendAltFilled, SendFilled } from '@carbon/icons-react';
import {
  // showDay,
  // showTime,
  fetcher,
  // truncateWordsAndLeaveN,
  type ApiResponse,
  useCanAccess,
} from '@cd/core-lib';
import { type DailyDeal, type Dispensary } from '@cd/data-access';
import {
  // Button,
  FlexBox,
  // Grid,
  Paragraph,
  // Small
} from '@cd/ui-lib';
// import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
// import cronToHuman from 'cron-to-human';
import {
  CursorArrowRippleIcon,
  PencilSquareIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import ConfirmationDialog from '@/components/shared/ConfirmationDialog';
import { Table } from '@/components/shared/table/Table';
import UpdateDailyDeal from '@/components/team/UpdateDailyDeal';

type DailyDealsProps = {
  team: Dispensary;
  isSubscribedOrThrow: () => void;
  showSubscription: () => void;
};

const DailyDeals = ({
  team,
  isSubscribedOrThrow,
  showSubscription,
}: DailyDealsProps) => {
  const { t } = useTranslation('common');

  const { data, mutate: mutateDailyDeals } = useSWR<ApiResponse<DailyDeal[]>>(
    team?.slug ? `/api/dispensaries/${team.slug}/daily-deals` : null,
    fetcher
  );
  const dailyDeals = data?.data || [];

  const { canAccess } = useCanAccess();
  const canSendMessage = () => {
    return canAccess('team_daily_deals', ['send']);
  };
  const canUpdateDeal = () => {
    return canAccess('team_daily_deals', ['update']);
  };
  const canDeleteDeal = () => {
    return canAccess('team_daily_deals', ['delete']);
  };

  const [selectedTextMessage, setSelectedTextMessage] =
    useState<DailyDeal | null>(null);

  const [sendConfirmation, setSendConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const sendMessage = async () => {
    try {
      isSubscribedOrThrow();

      if (!selectedTextMessage) {
        throw new Error(t('select-message-to-send'));
      }

      const response = await fetch(
        `/api/dispensaries/${team.slug}/daily-deals/send`,
        {
          method: 'POST',
          body: JSON.stringify(selectedTextMessage),
        }
      );

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error.message);
      }

      toast.success(t('successfully-sent'));
      mutateDailyDeals();
    } catch (error: any) {
      console.error('send message error', error);
      showSubscription();
    } finally {
      setSelectedTextMessage(null);
      setSendConfirmation(false);
    }
  };

  const deleteMessage = async () => {
    try {
      if (!selectedTextMessage) {
        throw new Error(t('select-message-to-delete'));
      }

      const response = await fetch(
        `/api/dispensaries/${team.slug}/daily-deals/${selectedTextMessage.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error.message);
      }

      toast.success(t('daily-deal-deleted'));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      mutateDailyDeals();
      setSelectedTextMessage(null);
      setDeleteConfirmation(false);
    }
  };

  return (
    <div className="my-4 flex grow flex-col gap-y-4">
      <Table
        cols={[t('title'), t('message'), t('send'), 'edit', 'delete']}
        body={dailyDeals.map((deal) => {
          return {
            id: deal.id,
            cells: [
              {
                wrap: true,
                element: (
                  <div className="flex items-center justify-start space-x-2">
                    {/* <LetterAvatar name={member.user.name} /> */}
                    <Paragraph className="font-semibold">
                      {deal.title}
                    </Paragraph>
                  </div>
                ),
              },
              { wrap: true, text: deal.message },
              {
                actions: canSendMessage()
                  ? [
                      {
                        icon: <SendAltFilled height={24} width={24} />,
                        text: t('send'),
                        onClick: () => {
                          setSelectedTextMessage(deal);
                          setSendConfirmation(true);
                        },
                      },
                    ]
                  : [],
              },
              {
                actions: canUpdateDeal()
                  ? [
                      {
                        icon: <PencilSquareIcon height={24} width={24} />,
                        text: t('edit'),
                        onClick: () => {
                          setSelectedTextMessage(deal);
                          setShowUpdateModal(true);
                        },
                      },
                    ]
                  : [],
              },
              {
                actions: canDeleteDeal()
                  ? [
                      {
                        icon: <XCircleIcon height={24} width={24} />,
                        destructive: true,
                        color: 'error',
                        text: t('delete'),
                        onClick: () => {
                          setSelectedTextMessage(deal);
                          setDeleteConfirmation(true);
                        },
                      },
                    ]
                  : [],
              },
            ],
          };
        })}
      ></Table>

      <UpdateDailyDeal
        modalVisible={showUpdateModal}
        onCancel={() => {
          setShowUpdateModal(false);
          setSelectedTextMessage(null);
        }}
        team={team}
        deal={selectedTextMessage}
      />

      <ConfirmationDialog
        visible={sendConfirmation}
        title={t('send-daily-deal') + `: ${selectedTextMessage?.title}`}
        onCancel={() => {
          setSendConfirmation(false);
          setSelectedTextMessage(null);
        }}
        onConfirm={() => {
          if (selectedTextMessage) sendMessage();
        }}
        confirmText={t('send')}
      >
        {t('confirm-message-send')}
      </ConfirmationDialog>

      <ConfirmationDialog
        visible={deleteConfirmation}
        title={
          t('confirm-delete-daily-deal') + `: ${selectedTextMessage?.title}`
        }
        onCancel={() => {
          setDeleteConfirmation(false);
        }}
        onConfirm={() => {
          deleteMessage();
        }}
        confirmText={t('delete')}
      >
        {t('delete-daily-deal')}
      </ConfirmationDialog>
    </div>
  );
};

export default DailyDeals;
