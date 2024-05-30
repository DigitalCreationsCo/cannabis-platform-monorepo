import { type Dispensary } from '@cd/data-access';
import { Modal2 as Modal } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import React from 'react';
import InviteViaEmail from './InviteViaEmail';
import InviteViaLink from './InviteViaLink';

interface InviteMemberProps {
  team: Dispensary;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const InviteMember = ({ visible, setVisible, team }: InviteMemberProps) => {
  const { t } = useTranslation('common');

  return (
    <Modal open={visible} close={() => setVisible(!visible)}>
      <Modal.Header>{t('invite-new-member')}</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 divide-y py-2">
          <InviteViaEmail setVisible={setVisible} team={team} />
          <InviteViaLink team={team} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InviteMember;
