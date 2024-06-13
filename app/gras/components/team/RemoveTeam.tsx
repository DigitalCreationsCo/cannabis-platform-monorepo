import { defaultHeaders, type ApiResponse } from '@cd/core-lib';
import { type Dispensary } from '@cd/data-access';
import { Button } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Card } from '@/components/shared';

import ConfirmationDialog from '../shared/ConfirmationDialog';
interface RemoveTeamProps {
  team: Dispensary;
  allowDelete: boolean;
}

const RemoveTeam = ({ team, allowDelete }: RemoveTeamProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);

  const removeTeam = async () => {
    setLoading(true);

    const response = await fetch(`/api/dispensaries/${team.slug}`, {
      method: 'DELETE',
      headers: defaultHeaders,
    });

    setLoading(false);

    if (!response.ok) {
      const json = (await response.json()) as ApiResponse;
      toast.error(json.error.message);
      return;
    }

    toast.success(t('team-removed-successfully'));
    router.push('/teams');
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Header>
            <Card.Title>{t('remove-team')}</Card.Title>
            <Card.Description>
              {allowDelete
                ? t('remove-team-warning')
                : t('remove-team-restricted')}
            </Card.Description>
          </Card.Header>
        </Card.Body>
        {allowDelete && (
          <Card.Footer>
            <Button
              color="error"
              onClick={() => setAskConfirmation(true)}
              loading={loading}
              size="md"
            >
              {t('remove-team')}
            </Button>
          </Card.Footer>
        )}
      </Card>
      {allowDelete && (
        <ConfirmationDialog
          visible={askConfirmation}
          title={t('remove-team')}
          onCancel={() => setAskConfirmation(false)}
          onConfirm={removeTeam}
        >
          {t('remove-team-confirmation')}
        </ConfirmationDialog>
      )}
    </>
  );
};

export default RemoveTeam;
