import { Error, LetterAvatar } from '@/components/shared';
import { Dispensary, StaffMember } from '@cd/data-access';
import {
  useStaffMembers,
  useCanAccess,
  defaultHeaders,
  ApiResponse,
} from '@cd/core-lib';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { Button } from '@cd/ui-lib';
import toast from 'react-hot-toast';

import { InviteMember } from '@/components/invitation';
import UpdateMemberRole from './UpdateMemberRole';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { useState } from 'react';
import { Table } from '@/components/shared/table/Table';
import { LoadingDots } from '@cd/ui-lib';

const Members = ({ team }: { team: Dispensary }) => {
  const { data: session } = useSession();
  const { t } = useTranslation('common');
  const { canAccess } = useCanAccess();
  const [visible, setVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [confirmationDialogVisible, setConfirmationDialogVisible] =
    useState(false);

  const { isLoading, isError, members, mutateTeamMembers } = useStaffMembers(
    team.slug
  );

  if (isLoading) {
    return <LoadingDots />;
  }

  if (isError) {
    return <Error message={isError.message} />;
  }

  if (!members) {
    return null;
  }

  const removeTeamMember = async (member: StaffMember | null) => {
    if (!member) {
      return;
    }

    const sp = new URLSearchParams({ memberId: member.userId });

    const response = await fetch(
      `/api/dispensaries/${team.slug}/members?${sp.toString()}`,
      {
        method: 'DELETE',
        headers: defaultHeaders,
      }
    );

    const json = (await response.json()) as ApiResponse;

    if (!response.ok) {
      toast.error(json.error.message);
      return;
    }

    mutateTeamMembers();
    toast.success(t('member-deleted'));
  };

  const canUpdateRole = (member: StaffMember) => {
    return (
      session?.user.id != member.userId && canAccess('team_member', ['update'])
    );
  };

  const canRemoveMember = (member: StaffMember) => {
    return (
      session?.user.id != member.userId && canAccess('team_member', ['delete'])
    );
  };

  const cols = [t('name'), t('email'), t('role')];
  if (canAccess('team_member', ['delete'])) {
    cols.push(t('actions'));
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <h2 className="text-xl font-medium leading-none tracking-tight">
            {t('members')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('members-description')}
          </p>
        </div>
        <Button color="primary" size="md" onClick={() => setVisible(!visible)}>
          {t('add-member')}
        </Button>
      </div>

      <Table
        cols={cols}
        body={members.map((member) => {
          return {
            id: member.id,
            cells: [
              {
                wrap: true,
                element: (
                  <div className="flex items-center justify-start space-x-2">
                    <LetterAvatar name={member.user.name} />
                    <span>{member.user.name}</span>
                  </div>
                ),
              },
              { wrap: true, text: member.user.email },
              {
                element: canUpdateRole(member) ? (
                  <UpdateMemberRole team={team} member={member} />
                ) : (
                  <span>{member.role}</span>
                ),
              },
              {
                buttons: canRemoveMember(member)
                  ? [
                      {
                        color: 'error',
                        text: t('remove'),
                        onClick: () => {
                          setSelectedMember(member);
                          setConfirmationDialogVisible(true);
                        },
                      },
                    ]
                  : [],
              },
            ],
          };
        })}
      ></Table>

      <ConfirmationDialog
        visible={confirmationDialogVisible}
        onCancel={() => setConfirmationDialogVisible(false)}
        onConfirm={() => removeTeamMember(selectedMember)}
        title={t('confirm-delete-member')}
      >
        {t('delete-member-warning', {
          name: selectedMember?.user.name,
          email: selectedMember?.user.email,
        })}
      </ConfirmationDialog>
      <InviteMember visible={visible} setVisible={setVisible} team={team} />
    </div>
  );
};

export default Members;
