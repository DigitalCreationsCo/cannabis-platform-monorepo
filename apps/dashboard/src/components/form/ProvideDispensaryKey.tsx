import { urlBuilder } from '@cd/core-lib';
import {
  Button,
  FlexBox,
  Grid,
  H2,
  Paragraph,
  TextField,
  useFormContext,
} from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

function ProvideDispensaryKey() {
  const { resetFormValues, nextFormStep, setFormValues } = useFormContext();

  useEffect(() => {
    const createNewFormContext = () => {
      console.info('creating new form context for Dispensary Sign Up Form');
      resetFormValues();
    };
    createNewFormContext();
  }, []);

  const [loadingButton, setLoadingButton] = useState(false);

  const initialValues = {
    dispensaryKey: '',
  };

  const downloadDispensaryData = async (dispensaryKey: string) => {
    try {
      const response = await axios(
        urlBuilder.dashboard + `/api/organization/${dispensaryKey}`
      );

      if (!response.data.success) throw new Error(response.data.message);

      setFormValues({ organization: { ...response.data.payload } });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  const onSubmit = async (values: typeof initialValues) => {
    try {
      setLoadingButton(true);

      await downloadDispensaryData(values.dispensaryKey);
      nextFormStep();
    } catch (error: any) {
      toast.error(error.message);
      setLoadingButton(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    validateForm,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  function notifyValidation() {
    validateForm().then((errors) => {
      if (Object.values(errors).length > 0) {
        console.log('validation errors: ', errors);
        toast.error(Object.values(errors)[0].toString());
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid className="min-h-[320px] w-full items-center justify-center flex flex-col space-y-4">
        <FlexBox>
          <H2>Welcome to Gras</H2>

          <Paragraph>
            We're happy you're joining us on a journey to serve the world of
            cannabis! {'\n'}
            You'll need a <b>dispensary code</b> to get started.
          </Paragraph>
          <Paragraph className="text-primary">
            Please email our team at{' '}
            <a className="underline" href="mailto::support@grascannabis.org">
              support@grascannabis.org
            </a>{' '}
            to claim your <b>dispensary code.</b>
          </Paragraph>
          <br />
          <Paragraph>
            Please enter your <b>dispensary code</b> provided by the Gras team.
          </Paragraph>
        </FlexBox>
        <TextField
          containerClassName="w-[300px]"
          className="mx-auto text-center"
          name="dispensaryKey"
          maxLength={25}
          label="Dispensary Code"
          placeholder="**** **** **** ****"
          value={values?.dispensaryKey}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.dispensaryKey && !!errors.dispensaryKey}
          // helperText={touched.dispensaryKey && errors.dispensaryKey}
        />

        <Button
          type="submit"
          loading={loadingButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            notifyValidation();
            handleSubmit();
          }}
        >
          Next
        </Button>
      </Grid>
    </form>
  );
}

export default ProvideDispensaryKey;

const validationSchema = yup.object().shape({
  dispensaryKey: yup
    .string()
    .required('Please enter a valid Dispensary Key.')
    .max(25, 'Please enter a valid Dispensary Key.'),
});
