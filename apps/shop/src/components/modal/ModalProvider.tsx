import { modalActions, ModalStateProps, userActions } from '@cd/shared-lib';
import { Button, CartModal, FlexBox, Grid, H1, H3, H6, Icons, Modal, Paragraph, TextField } from '@cd/shared-ui';
import type { LoginModalProps } from '@cd/shared-ui/dist/modal/LoginModal';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';

// import ConfirmModal from "./ConfirmModal";
// import MessageBanner from "./MessageBanner";
// import MessageModal from "./MessageModal";
// import SelectModal from "./SelectModal";
// import TipModal from "./TipModal";

const MODAL_COMPONENTS = Object.freeze({
    //   SHOW_MODAL: MessageModal,
    //   CONFIRM_MODAL: ConfirmModal,
    //   SELECT_MODAL: SelectModal,
    //   TIP_MODAL: TipModal,
    //   MESSAGE_BANNER: MessageBanner,
    CART_MODAL: CartModal,
    LOGIN_MODAL: LoginModal
});

const ModalContainer = (props: ModalStateProps & LoginModalProps) => {
    const ModalComponent = useMemo(() => MODAL_COMPONENTS[props.modalType], [props.modalType]);
    if (!props.modalType && !props.modalVisible) return <></>;
    return <ModalComponent {...props} />;
};

export { ModalContainer };

const mapStateToProps = (state: RootState) => state.modal;
const mapDispatchToProps = { dispatchCloseModal: modalActions.closeModal };
export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);

function LoginModal({ dispatchCloseModal, modalVisible, ...props }: LoginModalProps) {
    const dispatch = useAppDispatch();
    const signInUser = dispatch(userActions.signinUserAsync());

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
                // await signedInUser();
            }
        } catch (error) {
            setLoadingButton(false);
            console.error(error);
            toast.error(error.message);
        }
    }

    const styles = {
        responsive: 'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8'
    };
    return (
        <Modal className={styles.responsive} modalVisible={modalVisible} onClose={closeModalAndReset} {...props}>
            <form>
                <FlexBox>
                    <Image src={'/logo.png'} alt="Gras Cannabis logo" width={63} height={63} priority />
                    <H3> Welcome to</H3>
                    <H1>Gras Cannabis</H1>
                </FlexBox>
                <H3>One Stop Cannabis Marketplace</H3>
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
