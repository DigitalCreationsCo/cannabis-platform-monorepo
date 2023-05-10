import { modalActions, ModalStateProps, selectCartState, selectModalState, userActions } from '@cd/core-lib';
import {
    Button,
    FlexBox,
    Grid,
    H1,
    H3, LoginModalProps,
    Modal, Paragraph,
    TextField
} from '@cd/ui-lib';
import { AnyAction } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import Image from 'next/image';
import { JSXElementConstructor, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { connect, useSelector } from 'react-redux';
import { handleOTPInput, sendOTPEmail, sendOTPPhone } from 'session/OTP';
import { getLoginAttemptInfo } from "supertokens-web-js/recipe/passwordless";
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

    const dispatch = useAppDispatch();
    const signInUser = (signInArgs: { email: string; password: string }) =>
        dispatch(userActions.signinUserAsync(signInArgs) as unknown as AnyAction);

    const [loadingButton, setLoadingButton] = useState(false);
    const [isInputPhone, setIsInputPhone] = useState(false);
    const [hasOTPBeenSent, setHasOTPBeenSent] = useState(false);
    
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, validateForm } = useFormik({
        initialValues,
        onSubmit,
        validationSchema: () => isInputPhone ? phoneValidationSchema : emailValidationSchema
    });
    
    function notifyValidation() {
        validateForm().then((errors) => {
            if (Object.values(errors).length > 0) {
                console.log('validation errors: ', errors);
                toast.error(Object.values(errors)[0].toString());
            }
        });
    }
    
    useEffect(() => {
        const checkInputEmailOrPhone = () => {
            !values.emailOrPhone.match(/[^0-9]/g) ? setIsInputPhone(true) : setIsInputPhone(false);

        }
        checkInputEmailOrPhone()
    }, [values.emailOrPhone])
    
    useEffect(() => {
        async function hasInitialOTPBeenSent() {
            return await getLoginAttemptInfo() !== undefined;
        }
        hasInitialOTPBeenSent().then((hasInitialOTPBeenSent) => {
            setHasOTPBeenSent(hasInitialOTPBeenSent);
        })
    }, [])
    const closeModalAndReset = () => {
        dispatchCloseModal();
        setLoadingButton(false);
        resetForm();
    };

    async function onSubmit() {
        try {
            if (!loadingButton) {
                !hasOTPBeenSent 
                    ? isInputPhone ? sendOTPPhone(values.emailOrPhone) : sendOTPEmail(values.emailOrPhone)
                    : () => {
                        setLoadingButton(true);
                        handleOTPInput(values.passcode);
                    }
            }
        } catch (error: any) {
            setLoadingButton(false);
            console.error(error);
            toast.error(error.message);
        }
    }

    const styles = {
        responsive: 'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8',
        padd: 'pt-8 pb-12'
    };
    return (
        <Modal className={twMerge(styles.responsive, styles.padd)} modalVisible={modalVisible} onClose={closeModalAndReset} {...props}>
            <form>
                <FlexBox>
                    <Image src={'/logo.png'} alt="Gras Cannabis logo" width={63} height={63} priority />
                    <H3> Welcome to</H3>
                    <H1>Gras</H1>
                </FlexBox>
                <H3>a one stop cannabis marketplace</H3>
                {isInputPhone ? 'phone' : 'email'}
                <Grid className="space-y-2">
                    {hasOTPBeenSent ? <>
                    <Paragraph>Sign in with your email or mobile</Paragraph>
                        <TextField
                            containerClassName='w-2/3 m-auto lg:flex-col lg:items-start'
                            className="my-2 shadow"
                            autoComplete='off'
                            type='text'
                            name="emailOrPhone"
                            label="Email or Phone number"
                            placeholder=""
                            value={values?.emailOrPhone}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.emailOrPhone && !!errors.emailOrPhone}
                            // helperText={touched.emailOrPhone && errors.emailOrPhone}
                        />
                        <FlexBox className="py-2">
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
                        </FlexBox>
                        </> : <>
                        <Paragraph>Enter your one time passcode</Paragraph>
                        <TextField
                            containerClassName='w-2/3 m-auto lg:flex-col lg:items-start'
                            className="my-2 shadow"
                            autoComplete='off'
                            type='text'
                            name="emailOrPhone"
                            label="Email or Phone number"
                            placeholder=""
                            value={values?.emailOrPhone}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.emailOrPhone && !!errors.emailOrPhone}
                            // helperText={touched.emailOrPhone && errors.emailOrPhone}
                        />
                        <FlexBox className="py-2">
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
                        </FlexBox>
                        </>
                    }
                </Grid>
            </form>
        </Modal>
    );
}

const initialValues = { emailOrPhone: '' };

const emailValidationSchema = yup.object().shape({
    emailOrPhone: yup.string()
    .email('Not a valid email.')
    .required('Email or Phone number is required.'),
});

const phoneValidationSchema = yup.object().shape({
    emailOrPhone: yup.string()
    .length(10, 'Phone number must be 10 digits')
    .required('Email or Phone number is required.'),
});
