import { fetcher } from '@cd/core-lib';
import { type Session } from '@cd/data-access';
import { H2, Paragraph } from '@cd/ui-lib';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { WithLoadingAndError } from '@/components/shared';
import ConfirmationDialog from '@/components/shared/ConfirmationDialog';
import { Table } from '@/components/shared/table/Table';

type NextAuthSession = Session & { isCurrent: boolean };

const ManageSessions = () => {
  const { t } = useTranslation('common');
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [sessionToDelete, setSessionToDelete] =
    useState<NextAuthSession | null>(null);

  const { data, isLoading, error, mutate } = useSWR<{
    data: NextAuthSession[];
  }>(`/api/sessions`, fetcher);

  const sessions = data?.data ?? [];

  const deleteSession = async (id: string) => {
    try {
      if (!sessionToDelete) {
        throw new Error(t('select-a-session-to-delete'));
      }

      const response = await fetch(`/api/sessions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error.message);
      }

      toast.success(t('session-removed'));

      if (sessionToDelete.isCurrent) {
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      mutate();
      setSessionToDelete(null);
      setAskConfirmation(false);
    }
  };

  return (
    <WithLoadingAndError isLoading={isLoading} error={error}>
      <div className="space-y-3">
        <div className="space-y-2">
          <H2 className="text-xl font-medium leading-none tracking-tight">
            {t('browser-sessions')}
          </H2>
          <Paragraph className="text-sm text-gray-500 dark:text-gray-400">
            {t('manage-sessions')}
          </Paragraph>
        </div>

        <Table
          cols={[t('device'), t('actions')]}
          body={sessions.map((session) => {
            return {
              id: session.id,
              cells: [
                {
                  wrap: true,
                  element: (
                    <span className="items-center flex">
                      <ComputerDesktopIcon className="w-6 h-6 inline-block mr-1 text-primary" />
                      {session.isCurrent ? t('this-browser') : t('other')}
                    </span>
                  ),
                },
                {
                  buttons: [
                    {
                      color: 'error',
                      text: t('remove'),
                      onClick: () => {
                        setSessionToDelete(session);
                        setAskConfirmation(true);
                      },
                    },
                  ],
                },
              ],
            };
          })}
        ></Table>

        {sessionToDelete && (
          <ConfirmationDialog
            visible={askConfirmation}
            title={t('remove-browser-session')}
            onCancel={() => {
              setAskConfirmation(false);
              setSessionToDelete(null);
            }}
            onConfirm={() => deleteSession(sessionToDelete.id)}
            confirmText={t('remove')}
          >
            {sessionToDelete?.isCurrent
              ? t('remove-current-browser-session-warning')
              : t('remove-other-browser-session-warning')}
          </ConfirmationDialog>
        )}
      </div>
    </WithLoadingAndError>
  );
};

export default ManageSessions;
