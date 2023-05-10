import { modalActions, ModalStateProps, selectCartState, selectModalState, userActions } from '@cd/core-lib';
import {
    Button,
    FlexBox,
    Grid,
    H1,
    H3,
    H5,
    Icons,
    IconWrapper, LoginModalProps,
    Modal, Paragraph,
    TextField
} from '@cd/ui-lib';
import { useFormik } from 'formik';
import Image from 'next/image';
import { JSXElementConstructor, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { connect, useSelector } from 'react-redux';
import { handleOTPInput, resendOTP, sendOTPEmail, sendOTPPhone } from 'session/OTP';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { useAppDispatch } from '../../redux/hooks';
import CheckoutModal from './CheckoutModal';


// import ConfirmModal from "./ConfirmModal";
// import MessageBanner from "./MessageBanner";
// import MessageModal from "./MessageModal";
// import SelectModal from "./SelectModal";
// import TipModal from "./TipModal";

const MODAL_COMPONENTS = Object.freeze({
    'SHOW_MODAL': () => <></>,
    'CONFIRM_MODAL': () => <></>,
    'SELECT_MODAL': () => <></>,
    'TIP_MODAL': () => <></>,
    'MESSAGE_BANNER': () => <></>,
    'CHECKOUT_MODAL': CheckoutModal,
    'CART_MODAL': CartModal,
    'LOGIN_MODAL': LoginModal
});

type ModalContainerProps = ModalStateProps & LoginModalProps

const ModalContainer = (props: ModalContainerProps) => {
    const modalState = useSelector(selectModalState);
    const ModalComponent = useMemo<JSXElementConstructor<ModalStateProps & LoginModalProps>>(() => MODAL_COMPONENTS[modalState.modalType], [modalState.modalType]);
    if (!modalState.modalType && !modalState.modalVisible) return <></>;
    return <ModalComponent {...modalState} {...props} />;
};

export { ModalContainer };
const mapStateToProps = selectModalState;
const mapDispatchToProps = { dispatchCloseModal: modalActions.closeModal };
export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);

function CartModal({ dispatchCloseModal, modalVisible, ...props }: CartModalProps) {
    const { cart } = useSelector(selectCartState);
    const closeModal = () => {
        dispatchCloseModal();
    };
    const styles = {
        cartModal: ['absolute', 'm-12', 'top-0 right-0 border-2 z-10']
    };
    return (
        <Modal
            isModalOverlay={false}
            modalVisible={modalVisible}
            onClose={closeModal}
            {...props}
            className={twMerge(styles.cartModal)}
        >
            <FlexBox>Cart Modal</FlexBox>
            {cart.map((item) => (
                <>{item.name}</>
            ))}
        </Modal>
    );
}

// export default CartModal;

interface CartModalProps {
    dispatchCloseModal: () => void;
    modalVisible: boolean;
}

function LoginModal({ dispatchCloseModal, modalVisible, ...props }: LoginModalProps) {

    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep <= 1 ? currentStep + 1 : currentStep);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    
    const FormStepComponents = [
        SendOTP,
        EnterOTP
    ];
    
    const FormStepComponent = useMemo(() => FormStepComponents[formStep], [formStep]);

    function SendOTP () {
        
        const initialValues = { emailOrPhone: 'bmejiadeveloper2@gmail.com' };

        const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, validateForm } = useFormik({
            initialValues,
            onSubmit,
            validationSchema: () => isInputPhone ? phoneValidationSchema : emailValidationSchema
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
                if(!loading) {
                    setLoading(true);
                    isInputPhone ? await sendOTPPhone(values.emailOrPhone) : await sendOTPEmail(values.emailOrPhone)
                    nextFormStep();
                }
            } catch (error: any) {
                console.error(error);
                toast.error(error.message);
            }
        }
            
        return (
            <form>
                <Grid className="space-y-2">
                    <Paragraph>Sign in with your email</Paragraph>
                    <TextField
                        containerClassName='w-2/3 m-auto lg:flex-col lg:items-start'
                        className="my-2 shadow"
                        autoComplete='off'
                        type='text'
                        name="emailOrPhone"
                        label=""
                        placeholder="Email"
                        value={values?.emailOrPhone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.emailOrPhone && !!errors.emailOrPhone}
                    />
                    <FlexBox className="py-2">
                        <Button
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
                </Grid>
            </form>
        )
    }

    function EnterOTP () {
        const [loadingButton, setLoadingButton] = useState(false);

        const dispatch = useAppDispatch();

        const initialValues = { passcode: '' };

        const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, validateForm } = useFormik({
            initialValues,
            onSubmit,
            validationSchema: passcodeValidationSchema
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
                    handleOTPAndSignIn()
                }
            } catch (error: any) {
                setLoadingButton(false);
                console.error(error);
                toast.error(error.message);
            }
        }

        const handleOTPAndSignIn = async () => {
            try {
                const user = await handleOTPInput(values.passcode);
                if (user) dispatch(userActions.signinUserSync(user))
                toast.success(`You're signed in!`)
                dispatchCloseModal();
                
            } catch (error: any) {
                setLoadingButton(false);
                toast.error(error.message);
            }
        }

        const [canResendOTP, setCanResetOTP] = useState(false);

        const [counter, setCounter] = useState(15);
        
        useEffect(() => {
            let timer: any;
            if (!canResendOTP) {
                if (counter > 0) {
                timer = setTimeout(() => setCounter(c => c - 1), 1000);
                }
                if (counter <= 0) setCanResetOTP(true);
            }

            return () => {
                if (timer) {
                    clearTimeout(timer); 
                }
            };
        }, [counter, canResendOTP === false]);

        const checkAndResendOTP = canResendOTP ?  async () => {
            console.log('resending otp')
            await resendOTP();
            setCanResetOTP(false);
        } : null

        const showResendOrCountdown = canResendOTP ? 'Resend' : `Resend in ${counter}`
    
        return (
            <form>
                <H5>Enter your one time passcode</H5>
                <Grid className="relative space-y-2 w-2/3 m-auto">
                    <TextField
                        containerClassName='m-auto lg:flex-col lg:items-start'
                        className="my-2 shadow text-center"
                        autoComplete='off'
                        type='text'
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

                        <FlexBox>
                            <div onClick={checkAndResendOTP} className="m-auto">
                                <Paragraph>{showResendOrCountdown}</Paragraph></div>

                            <div className="flex flex-row items-center m-auto">
                            <IconWrapper Icon={Icons.ArrowLeft} className="text-dark" />
                            <div onClick={prevFormStep} className="m-auto">
                                <Paragraph className="ml-2 border-b-2 border-secondary">
                                    {`Change email`}</Paragraph></div></div>
                        </FlexBox>
                    </FlexBox>
                </Grid>
            </form>
        )
    }
        
        const closeModalAndReset = () => {
            setFormStep(0);
            dispatchCloseModal();
        };

        return (
            <Modal className={twMerge(styles.responsive, styles.padd)} modalVisible={modalVisible} onClose={closeModalAndReset} {...props}>
                    <FlexBox>
                        <Image src={'/logo.png'} alt="Gras Cannabis logo" width={63} height={63} priority />
                        <H3> Welcome to</H3>
                        <H1>Gras</H1>
                    </FlexBox>
                    <H3>a one stop cannabis marketplace</H3>
                    <FormStepComponent />
            </Modal>
        );
    }
    
    const styles = {
        responsive: 'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8',
        padd: 'pt-8 pb-12'
    };

    const emailValidationSchema = yup.object().shape({
        emailOrPhone: yup.string()
        .email('Not a valid email.')
        .required('Email or Phone number is required.'),
    });
    
    const phoneValidationSchema = yup.object().shape({
        emailOrPhone: yup.string()
        .length(11, 'Phone number must be 11 digits')
        .required('Email or Phone number is required.'),
    });
    
    const passcodeValidationSchema = yup.object().shape({
        passcode: yup.string()
        .required('Invalid passcode.')
    });