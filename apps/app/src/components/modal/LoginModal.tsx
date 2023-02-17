import { Button, FlexBox, Grid, H1, H3, Icons, Paragraph, TextField } from '@cd/shared-ui';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import Modal, { ModalProps } from './Modal';

function LoginModal({ open, onClose, ...props }: ModalProps) {
    const [loadingButton, setLoadingButton] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const emailInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (emailInputRef) emailInputRef.current?.focus();
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const resetModalState = () => {
        onClose();
        setLoadingButton(false);
        setShowPassword(false);
        resetForm();
    };

    async function onSubmit(values: typeof initialValues) {
        setLoadingButton(true);
        try {
            console.log('click');
            //   signIn("credentials", {
            //     redirect: false,
            //     email: values.email,
            //     password: values.password,
            //     //@ts-ignore
            //     callbackUrl,
            //   })
            //   .then((res) => {
            //     if (res.ok) {
            //       router.replace("/");
            //     }
            //   })
            //   .catch((error) => {
            //     console.log(error);
            //     toast.error(error);
            //     setLoadingButton(false);
            //   });
            //   dialogClose?.();
            //   //@ts-ignore
            //   // router.replace(callbackUrl ? callbackUrl : "/");
            //   setLoadingButton(false);
            // } catch (error) {
            //   toast.error(error.response.data.message);
            //   setLoadingButton(false);
            // }
            // try {
            //     signIn('credentials', {
            //         redirect: true,
            //         email: values.email,
            //         password: values.password,
            //         //@ts-ignore
            //         callbackUrl
            //     }).then(({ ok, error }) => {
            //         if (ok) {
            //             dialogClose?.();
            //             router.replace('/');
            //         } else {
            //             console.log(error);
            //             toast.error(error);
            //         }
            //     });
            //     //@ts-ignore
            //     // router.replace(callbackUrl ? callbackUrl : "/");
            //     setLoadingButton(false);
            if (onClose) onClose();
            location.reload();
        } catch (error) {
            setLoadingButton(false);
            console.error(error);
            toast.error(error.response.statusText);
        }
    }
    return (
        <Modal className="" open={open} onClose={resetModalState} {...props}>
            <Grid>
                <FlexBox className="flex-col space-y-2">
                    <FlexBox className="justify-center">
                        <Image src={'/logo.png'} alt="Gras Cannabis logo" width={63} height={63} priority />
                        <H3>
                            Welcome to <H1>Gras Cannabis</H1>
                        </H3>
                    </FlexBox>

                    <H3>One Stop Cannabis Marketplace</H3>
                </FlexBox>
                <FlexBox className="flex-col space-x-0 space-y-2">
                    <Paragraph>Sign in with your email & password</Paragraph>
                    <TextField
                        // inputRef={(input) => input && input.focus()}
                        inputRef={emailInputRef}
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
                        type={showPassword ? 'text' : 'password'}
                        insertIcon={showPassword ? Icons.View : Icons.ViewOff}
                        onClickInsertIcon={() => setShowPassword(!showPassword)}
                    />
                </FlexBox>
                <FlexBox className="justify-center py-4">
                    <Button
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Sign In
                    </Button>
                </FlexBox>
            </Grid>
        </Modal>
    );
}

const initialValues = { email: '', password: '' };
const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup.string().required('Password is required')
});

export default LoginModal;
