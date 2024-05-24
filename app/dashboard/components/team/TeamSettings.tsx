import { defaultHeaders, type ApiResponse } from '@cd/core-lib';
import { type Dispensary } from '@cd/data-access';
import { Button, TextField } from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';

import { type z } from 'zod';
import { Card } from '@/components/shared';
import { updateTeamSchema } from '@/lib/zod';
import { AccessControl } from '../shared/AccessControl';

const TeamSettings = ({ team }: { team: Dispensary }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const formik = useFormik<z.infer<typeof updateTeamSchema>>({
    initialValues: {
      name: team.name,
      slug: team.slug,
      domain: team.domain || '',
    },
    validateOnBlur: false,
    enableReinitialize: true,
    validate: (values) => {
      try {
        updateTeamSchema.parse(values);
      } catch (error: any) {
        return error.formErrors.fieldErrors;
      }
    },
    onSubmit: async (values) => {
      const response = await fetch(`/api/dispensaries/${team.slug}`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(values),
      });

      const json = (await response.json()) as ApiResponse<Dispensary>;

      if (!response.ok) {
        toast.error(json.error.message);
        return;
      }

      toast.success(t('successfully-updated'));
      router.push(`/teams/${json.data.slug}/settings`);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <Card.Body>
            <Card.Header>
              <Card.Title>{t('team-settings')}</Card.Title>
              <Card.Description>{t('team-settings-config')}</Card.Description>
            </Card.Header>
            <div className="flex flex-col gap-4">
              <TextField
                name="name"
                label={t('team-name')}
                value={formik.values.name}
                onChange={formik.handleChange}
                helperText={formik.errors.name}
              />
              <TextField
                name="slug"
                label={t('team-slug')}
                value={formik.values.slug}
                onChange={formik.handleChange}
                helperText={formik.errors.slug}
              />
              <TextField
                name="domain"
                label={t('team-domain')}
                value={formik.values.domain ? formik.values.domain : ''}
                onChange={formik.handleChange}
                helperText={formik.errors.domain}
              />
            </div>
          </Card.Body>
          <AccessControl resource="team" actions={['update']}>
            <Card.Footer>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  color="primary"
                  loading={formik.isSubmitting}
                  disabled={!formik.isValid || !formik.dirty}
                  size="md"
                >
                  {t('save-changes')}
                </Button>
              </div>
            </Card.Footer>
          </AccessControl>
        </Card>
      </form>
    </>
  );
};

export default TeamSettings;
