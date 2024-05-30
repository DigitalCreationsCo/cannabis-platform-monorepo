import { type WebookFormSchema, maxLengthPolicies } from '@cd/core-lib';
import type { FormikConfig } from 'formik';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button, Paragraph, TextField, Modal2 as Modal } from '@cd/ui-lib';
import * as Yup from 'yup';
import { EventTypes } from '@/components/webhook';

interface FormProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  initialValues: WebookFormSchema;
  onSubmit: FormikConfig<WebookFormSchema>['onSubmit'];
  title: string;
  editMode?: boolean;
}

const Form = ({
  visible,
  setVisible,
  initialValues,
  onSubmit,
  title,
  editMode = false,
}: FormProps) => {
  const formik = useFormik<WebookFormSchema>({
    validationSchema: Yup.object().shape({
      name: Yup.string().required().max(maxLengthPolicies.webhookDescription),
      url: Yup.string().required().url().max(maxLengthPolicies.webhookEndpoint),
      eventTypes: Yup.array().min(1, 'Please choose at least one event type'),
    }),
    initialValues,
    enableReinitialize: true,
    onSubmit,
    validateOnBlur: false,
  });

  const { t } = useTranslation('common');

  const toggleVisible = () => {
    setVisible(!visible);
    formik.resetForm();
  };

  return (
    <Modal open={visible} close={toggleVisible}>
      <form onSubmit={formik.handleSubmit} method="POST">
        <Modal.Header>{title}</Modal.Header>
        <Modal.Description>{t('webhook-create-desc')}</Modal.Description>
        <Modal.Body>
          <div className="flex flex-col space-y-3">
            <TextField
              name="name"
              label="Description"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Description of what this endpoint is used for."
              error={!!formik.errors.name}
            />
            <TextField
              name="url"
              label="The endpoint URL must be HTTPS"
              onChange={formik.handleChange}
              value={formik.values.url}
              placeholder="https://api.example.com/svix-webhooks"
              error={!!formik.errors.url}
            />
            <div className="divider"></div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">{t('events-to-send')}</span>
              </label>
              <Paragraph className="ml-1 mb-3 text-sm font-normal text-gray-500">
                {t('events-description')}
              </Paragraph>
              <div className="grid grid-cols-2 gap-2">
                <EventTypes
                  onChange={formik.handleChange}
                  values={initialValues['eventTypes']}
                  error={formik.errors.eventTypes}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            onClick={() => {
              setVisible(!visible);
            }}
            size="md"
          >
            {t('close')}
          </Button>
          <Button
            type="submit"
            color="primary"
            loading={formik.isSubmitting}
            size="md"
          >
            {editMode ? t('update-webhook') : t('create-webhook')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Form;
