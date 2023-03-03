import { Button, FlexBox, Grid, H1, H3, H6, Icons, Paragraph, TextField } from '@cd/shared-ui';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { signIn } from 'supertokens-auth-react/recipe/emailpassword';
import * as yup from 'yup';
import Modal, { ModalProps } from './Modal';

function LoginModal({ open, onClose, ...props }: ModalProps) {
    const [loadingButton, setLoadingButton] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setPasswordVisibility((visible) => !visible);
    }, []);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const resetModalState = () => {
        onClose();
        setLoadingButton(false);
        setPasswordVisibility(false);
        resetForm();
    };

    async function signInUser() {
        try {
            console.log('sign in');
            const response = await signIn({
                formFields: [
                    {
                        id: 'email',
                        value: values.email
                    },
                    {
                        id: 'password',
                        value: values.password
                    }
                ]
            });
            if (response.status === 'WRONG_CREDENTIALS_ERROR') {
                throw new Error('Email or Password is incorrect.');
            }
            if (response.status === 'OK') {
                return 'Signed in';
            }
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    async function onSubmit(values: typeof initialValues) {
        setLoadingButton(true);
        try {
            if (!loadingButton) {
                setLoadingButton(true);
                // const formData = new FormData();
                // formData.append('email', values.email);
                // formData.append('password', values.password);
                // const { data } = await axios.post(urlBuilder.next + `/api/signin`, formData, {
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // });
                const response = await signInUser();
                console.log('signin data: ', response);
                setLoadingButton(false);
                toast.success('Signed in');
                if (onClose) onClose();
                Router.push('/');
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
        <Modal className={styles.responsive} open={open} onClose={resetModalState} {...props}>
            <form>
                <FlexBox>
                    <Image src={'/logo.png'} alt="Gras Cannabis logo" width={63} height={63} priority />
                    <H3> Welcome to</H3>
                    <H1>Gras Cannabis</H1>
                </FlexBox>
                <H3>One Stop Cannabis Marketplace</H3>
                <Paragraph>Sign in with your email & password</Paragraph>
                <Grid className="space-y-2">
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
                                handleSubmit();
                            }}
                        >
                            Sign In
                        </Button>
                    </FlexBox>
                    <FlexBox className="items-center">
                        <Paragraph>{`Don't have account?`} </Paragraph>
                        <Link
                            href="/signup"
                            onClick={() => {
                                if (onClose) onClose();
                            }}
                        >
                            <H6 className="border-b"> Sign Up</H6>
                        </Link>
                    </FlexBox>
                    <FlexBox className="items-center">
                        <Paragraph>Forgot your password?</Paragraph>
                        <Link
                            href="/password-reset"
                            onClick={() => {
                                if (onClose) onClose();
                            }}
                        >
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

export default LoginModal;
