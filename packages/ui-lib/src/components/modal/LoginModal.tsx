import { TextContent, userActions } from '@cd/core-lib';
import {
  handleOTPInput,
  resendOTP,
  sendOTPEmail,
  sendOTPPhone,
} from '@cd/core-lib/src/auth/OTP';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import logo from '../../../public/assets/images/logo.png';
import Icons from '../../icons';
import Button from '../button/Button';
import FlexBox from '../FlexBox';
import Grid from '../Grid';
import IconWrapper from '../IconWrapper';
import TextField from '../TextField';
import { H1, H3, H4, Paragraph, Small } from '../Typography';
import Modal from './Modal';

interface LoginModalProps {
  dispatchCloseModal: () => void;
  modalVisible: boolean;
}

function LoginModal({
  dispatchCloseModal,
  modalVisible,
  ...props
}: LoginModalProps) {
  const [formStep, setFormStep] = useState(0);
  const nextFormStep = () =>
    setFormStep((currentStep) =>
      currentStep <= 1 ? currentStep + 1 : currentStep
    );
  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  const FormStepComponents = [SendOTP, EnterOTP];

  const FormStepComponent = useMemo(
    () => FormStepComponents[formStep],
    [formStep]
  );

  const [inputValue, setInputValue] = useState('');

  function SendOTP() {
    const initialValues = { emailOrPhone: '' };

    const {
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      resetForm,
      validateForm,
    } = useFormik({
      initialValues,
      onSubmit,
      validationSchema: () =>
        isInputPhone ? phoneValidationSchema : emailValidationSchema,
    });

    // DISABLED FOR NOW TO USE ONLY EMAIL LOGIN
    const [isInputPhone, setIsInputPhone] = useState(false);

    // DISABLED FOR NOW TO USE ONLY EMAIL LOGIN
    // useEffect(() => {
    //     const checkInputEmailOrPhone = () => {
    //         !values.emailOrPhone.match(/[^0-9]/g) ? setIsInputPhone(true) : setIsInputPhone(false);
    //     }
    //     checkInputEmailOrPhone()
    // }, [values.emailOrPhone])

    function notifyValidation() {
      validateForm().then((errors) => {
        if (Object.values(errors).length > 0) {
          console.log('validation errors: ', errors);
          toast.error(Object.values(errors)[0].toString());
        }
      });
    }

    const [loading, setLoading] = useState(false);

    async function onSubmit() {
      try {
        if (!loading) {
          setLoading(true);
          setInputValue(values.emailOrPhone);
          if (isInputPhone) {
            await sendOTPPhone(values.emailOrPhone);
            toast.success(
              'Please check your mobile messages for the one time passcode.'
            );
          } else {
            await sendOTPEmail(values.emailOrPhone);
            toast.success(
              `A one time passcode has been sent to ${values.emailOrPhone}.`,
              { duration: 5000 }
            );
          }
          nextFormStep();
        }
      } catch (error: any) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        console.error(error);
        toast.error(error.message);
      }
    }

    return (
      <form>
        <Grid className="space-y-2">
          <TextField
            containerClassName="max-w-[300px] md:w-2/3 m-auto lg:flex-col lg:items-start"
            className="my-2 border text-md"
            autoComplete="off"
            type="text"
            name="emailOrPhone"
            placeholder="you@email"
            label={TextContent.ui.SIGNIN_EMAIL}
            justifyLabel="center"
            value={values?.emailOrPhone}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.emailOrPhone && !!errors.emailOrPhone}
          />

          <FlexBox className="py-2">
            <Button
              type="submit"
              loading={loading}
              className="place-self-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                notifyValidation();
                handleSubmit();
              }}
            >
              Continue
            </Button>
          </FlexBox>

          <FlexBox className="flex-col mx-auto justify-center">
            <Paragraph className="text-lg mx-auto text-center">
              Are you a dispensary?
            </Paragraph>

            <Link
              className="mx-auto"
              href="/signup/create-dispensary-account"
              onClickCapture={dispatchCloseModal}
            >
              <H4 className="underline text-lg text-center">
                {TextContent.account.CREATE_DISPENSARY_ACCOUNT}
              </H4>
            </Link>
          </FlexBox>
        </Grid>
      </form>
    );
  }

  function EnterOTP() {
    const [loadingButton, setLoadingButton] = useState(false);

    const dispatch = useDispatch();

    const initialValues = { passcode: '' };

    const {
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      resetForm,
      validateForm,
    } = useFormik({
      initialValues,
      onSubmit,
      validationSchema: passcodeValidationSchema,
    });

    function notifyValidation() {
      validateForm().then((errors) => {
        if (Object.values(errors).length > 0) {
          console.log('validation errors: ', errors);
          toast.error(Object.values(errors)[0].toString());
        }
      });
    }

    async function onSubmit() {
      try {
        if (!loadingButton) {
          setLoadingButton(true);
          handleOTPAndSignIn();
        }
      } catch (error: any) {
        setLoadingButton(false);
        console.error(error);
        toast.error(error.message);
      }
    }

    const handleOTPAndSignIn = async () => {
      try {
        const response = await handleOTPInput(values.passcode);

        if (response?.user) {
          dispatch(userActions.signinUserSync(response.user));
        }

        toast.success(`You're signed in!`);
        dispatchCloseModal();
      } catch (error: any) {
        setLoadingButton(false);
        toast.error(error.message, { duration: 10000 });
      }
    };

    const [counter, setCounter] = useState(15);
    const [canSend, setCanSend] = useState(false);

    useEffect(() => {
      let timer: any;
      if (!canSend) {
        if (counter > 0) {
          timer = setTimeout(() => setCounter((c) => c - 1), 1000);
        }
        if (counter <= 0) setCanSend(true);
      }

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [canSend, counter]);

    const checkAndResendOTP = async (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      if (canSend) {
        setCounter(15);
        setCanSend(false);
        await resendOTP();
        toast.success(`A one time passcode has been sent to ${inputValue}.`, {
          duration: 5000,
        });
      }
    };

    const showResendOrCountdown = canSend ? 'Resend' : `Resend in ${counter}`;

    return (
      <form>
        <Grid className="relative space-y-2 max-w-[300px] md:w-2/3 m-auto">
          <Small>A one time passcode was sent to {inputValue}.</Small>
          <TextField
            containerClassName="m-auto lg:flex-col lg:items-start"
            className="my-2 border text-center"
            autoComplete="off"
            type="text"
            name="passcode"
            label="passcode"
            placeholder=""
            value={values?.passcode}
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!touched.passcode && !!errors.passcode}
          />
          <FlexBox className="py-2 space-y-8">
            <Button
              type="submit"
              className="place-self-center"
              loading={loadingButton}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                notifyValidation();
                handleSubmit();
              }}
            >
              Sign In
            </Button>

            <FlexBox className="m-auto space-y-2">
              <Button
                bg={'transparent'}
                hover={'transparent'}
                onClick={checkAndResendOTP}
              >
                {showResendOrCountdown}
              </Button>

              <Button
                bg={'transparent'}
                hover={'transparent'}
                onClick={prevFormStep}
              >
                <IconWrapper
                  Icon={Icons.ArrowLeft}
                  className="text-dark pr-2"
                />
                Change email
              </Button>
            </FlexBox>
          </FlexBox>
        </Grid>
      </form>
    );
  }

  const closeModalAndReset = () => {
    setFormStep(0);
    dispatchCloseModal();
  };

  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    setOpenModal(modalVisible);
  }, [modalVisible]);

  return modalVisible ? (
    <Modal
      className={twMerge(styles.responsive, styles.padd)}
      modalVisible={openModal}
      onClose={closeModalAndReset}
      {...props}
    >
      <div className="mx-auto m-0 p-0">
        <FlexBox className="mx-auto">
          <Image
            src={logo}
            alt="Gras Cannabis logo"
            width={63}
            height={63}
            priority
          />
          <H3>Welcome to</H3>
          <H1>Gras</H1>
        </FlexBox>

        <H3 className="mx-auto">a one stop cannabis marketplace</H3>

        <FormStepComponent />
      </div>
    </Modal>
  ) : (
    <></>
  );
}

const styles = {
  responsive:
    'bg-inverse min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12',
  padd: 'md:py-12',
};

const emailValidationSchema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .email('Not a valid email.')
    .required('Sign in with your email.'),
});

const phoneValidationSchema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .length(11, 'Phone number must be 11 digits')
    .required('Sign in with your phone number.'),
});

const passcodeValidationSchema = yup.object().shape({
  passcode: yup
    .string()
    .required('Invalid passcode.')
    .length(6, 'Invalid passcode.'),
});

export default LoginModal;
