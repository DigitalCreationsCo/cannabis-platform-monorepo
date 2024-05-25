/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  defaultHeaders,
  type ApiResponse,
  useDispensaries,
} from '@cd/core-lib';
import { type Dispensary } from '@cd/data-access';
import { Button, H2, Paragraph } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { LetterAvatar, WithLoadingAndError } from '@/components/shared';
import { Table } from '@/components/shared/table/Table';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import CreateTeam from './CreateTeam';

const Teams = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [team, setTeam] = useState<Dispensary | null>(null);
  const { isLoading, isError, dispensaries, mutateTeams } = useDispensaries();
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [createTeamVisible, setCreateTeamVisible] = useState(false);

  const { newTeam } = router.query as { newTeam: string };

  useEffect(() => {
    if (newTeam) {
      setCreateTeamVisible(true);
    }
  }, [newTeam]);

  const leaveTeam = async (team: Dispensary) => {
    const response = await fetch(`/api/dispensaries/${team.slug}/members`, {
      method: 'PUT',
      headers: defaultHeaders,
    });

    const json = (await response.json()) as ApiResponse;

    if (!response.ok) {
      toast.error(json.error.message);
      return;
    }

    toast.success(t('leave-team-success'));
    mutateTeams();
  };

  return (
    <WithLoadingAndError isLoading={isLoading} error={isError}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <H2 className="text-xl font-medium leading-none tracking-tight">
              {t('all-teams')}
            </H2>
            <Paragraph className="text-sm text-gray-500 dark:text-gray-400">
              {t('team-listed')}
            </Paragraph>
          </div>
          <Button
            color="primary"
            size="md"
            onClick={() => setCreateTeamVisible(!createTeamVisible)}
          >
            {t('create-team')}
          </Button>
        </div>

        <Table
          cols={[t('name'), t('members'), t('created-at'), t('actions')]}
          body={
            dispensaries
              ? dispensaries.map((team) => {
                  return {
                    id: team.id,
                    cells: [
                      {
                        wrap: true,
                        element: (
                          <Link href={`/teams/${team.slug}/home`}>
                            <div className="flex items-center justify-start space-x-2">
                              <LetterAvatar name={team.name} />
                              <span className="underline">{team.name}</span>
                            </div>
                          </Link>
                        ),
                      },
                      { wrap: true, text: '' + team._count.members },
                      {
                        wrap: true,
                        text: new Date(team.createdAt!).toDateString(),
                      },
                      {
                        buttons: [
                          {
                            color: 'error',
                            text: t('leave-team'),
                            onClick: () => {
                              setTeam(team);
                              setAskConfirmation(true);
                            },
                          },
                        ],
                      },
                    ],
                  };
                })
              : []
          }
        ></Table>

        <ConfirmationDialog
          visible={askConfirmation}
          title={`${t('leave-team')} ${team?.name}`}
          onCancel={() => setAskConfirmation(false)}
          onConfirm={() => {
            if (team) {
              leaveTeam(team);
            }
          }}
          confirmText={t('leave-team')}
        >
          {t('leave-team-confirmation')}
        </ConfirmationDialog>
        <CreateTeam
          visible={createTeamVisible}
          setVisible={setCreateTeamVisible}
        />
      </div>
    </WithLoadingAndError>
  );
};

export default Teams;
