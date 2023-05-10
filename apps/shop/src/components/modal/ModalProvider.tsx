import { modalActions, ModalStateProps, selectCartState, selectModalState, userActions } from '@cd/core-lib';
import {
    Button,
    FlexBox,
    Grid,
    H1,
    H3,
    H6,
    Icons,
    LoginModalProps,
    Modal, Paragraph,
    TextField
} from '@cd/ui-lib';
import { AnyAction } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { JSXElementConstructor, useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { connect, useSelector } from 'react-redux';
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
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setPasswordVisibility((visible) => !visible);
    }, []);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, validateForm } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const closeModalAndReset = () => {
        dispatchCloseModal();
        setLoadingButton(false);
        setPasswordVisibility(false);
        resetForm();
    };

    function notifyValidation() {
        validateForm().then((errors) => {
            if (Object.values(errors).length > 0) {
                console.log('validation errors: ', errors);
                toast.error(Object.values(errors)[0].toString());
            }
        });
    }
    async function onSubmit() {
        setLoadingButton(true);
        try {
            if (!loadingButton) {
                setLoadingButton(true);
                await signInUser({ email: values.email, password: values.password });
            }
        } catch (error: any) {
            setLoadingButton(false);
            console.error(error);
            toast.error(error.message);
        }
    }

    const styles = {
        responsive: 'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8',
        paddTop: ''
    };
    return (
        <Modal className={twMerge(styles.responsive, styles.paddTop)} modalVisible={modalVisible} onClose={closeModalAndReset} {...props}>
            <form>
                <FlexBox>
                    <Image src={'/logo.png'} alt="Gras Cannabis logo" width={63} height={63} priority />
                    <H3> Welcome to</H3>
                    <H1>Gras</H1>
                </FlexBox>
                <H3>a one stop cannabis marketplace</H3>
                <Grid className="space-y-2">
                    <Paragraph>Sign in with your email & password</Paragraph>
                    <TextField
                        name="email"
                        label="Email"
                        placeholder="you@email.com"
                        value={values?.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        placeholder="password"
                        value={values?.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        type={passwordVisibility ? 'text' : 'password'}
                        insertIcon={passwordVisibility ? Icons.View : Icons.ViewOff}
                        onClickIcon={togglePasswordVisibility}
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
                    <FlexBox className="items-center">
                        <Paragraph>{`Don't have account?`} </Paragraph>
                        <Link href="/signup" onClick={closeModalAndReset}>
                            <H6 className="border-b"> Sign Up</H6>
                        </Link>
                    </FlexBox>
                    <FlexBox className="items-center">
                        <Paragraph>Forgot your password?</Paragraph>
                        <Link href="/password-reset" onClick={closeModalAndReset}>
                            <H6 className="border-b"> Reset It</H6>
                        </Link>
                    </FlexBox>
                </Grid>
            </form>
        </Modal>
    );
}

const initialValues = { email: '', password: '' };
const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup.string().required('Password is required')
});
