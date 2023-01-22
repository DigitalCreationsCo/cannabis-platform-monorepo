import { UserWithDetails } from '@cd/data-access';
import { Button, FlexBox, Grid, Icons, LoadingDots, Padding, Page, Paragraph, TextField } from '@cd/shared-ui';
import axios from 'axios';
import { Formik } from 'formik';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { PageHeader, ProtectedComponent, Select } from '../../src/components';
import CheckBox from '../../src/components/CheckBox';
import DialCodeSelect from '../../src/components/Dashboard/DialCodeSelect';
import { urlBuilder } from '../../src/utils';

const checkoutSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email().required('Email is required'),
    // password: yup
    //   .string()
    //   .min(6, "Password must be 6 characters length")
    //   .required("Password is required"),
});

export default function UserDetails() {
    const { query } = useRouter();
    const [user, setUser] = useState<UserWithDetails>();
    const [loading, setLoading] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);

    const initialValues = {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        username: user?.username || '',
        email: user?.email || '',
        emailVerified: user?.emailVerified || false,
        password: '',
        address:
            (user?.address && {
                street1: user?.address.street1 || '',
                street2: user?.address.street2 || '',
                city: user?.address.city || '',
                state: user?.address.state || '',
                zipcode: user?.address.zipcode || '',
                country: user?.address.country || '',
                countryCode: user?.address.countryCode || '',
            }) ||
            null,
        role: user?.memberships?.[0]?.role || 'MEMBER',
        dialCode: user?.dialCode || '',
        phone: user?.phone || '',
    };

    useEffect(() => {
        if (query?.id && !user) {
            console.log('fetch user');
            fetchUserDetails();
        }

        async function fetchUserDetails() {
            try {
                const { data } = await axios(urlBuilder.next + `/api/users/${query.id}`);
                setUser(data);
                setLoading(false);
            } catch (error) {
                setLoadingButton(false);
                setLoading(false);
                console.error(error);
                toast.error(error.response?.statusText || error.message);
            }
        }
    }, [query]);

    const handleFormSubmit = async (values) => {
        try {
            const { data } = await axios.put(urlBuilder.next + `/api/users`, { ...values });
            toast.success('User updated successfully');
            setLoadingButton(false);
            toast.success(data);
            Router.push('/users');
        } catch (error) {
            setLoadingButton(false);
            setLoading(false);
            console.error(error);
            toast.error(error.response.statusText);
        }
    };

    return (
        <ProtectedComponent>
            <Page>
                <PageHeader
                    title="Edit User"
                    Icon={Icons.User2}
                    Button={
                        <Link href="/users">
                            <Button>Back to User List</Button>
                        </Link>
                    }
                />

                {(loading && (
                    <Padding>
                        <LoadingDots />
                    </Padding>
                )) ||
                    (user && (
                        <Grid className="md:w-2/3 px-3 space-y-2">
                            <Formik
                                initialValues={initialValues}
                                // validationSchema={checkoutSchema}
                                onSubmit={handleFormSubmit}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <form
                                        className="space-y-2"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleSubmit();
                                        }}
                                    >
                                        <TextField
                                            name="username"
                                            label="Username"
                                            placeholder=""
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.username}
                                            error={!!touched.username && !!errors.username}
                                        />
                                        <TextField
                                            type="password"
                                            name="password"
                                            label="Password"
                                            placeholder="*******"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            error={!!touched.password && !!errors.password}
                                        />
                                        <TextField
                                            name="firstName"
                                            label="First Name"
                                            placeholder=""
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstName}
                                            error={!!touched.firstName && !!errors.firstName}
                                        />
                                        <TextField
                                            name="lastName"
                                            label="Last Name"
                                            placeholder=""
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastName}
                                            error={!!touched.lastName && !!errors.lastName}
                                        />
                                        <FlexBox>
                                            <TextField
                                                className="border"
                                                name="email"
                                                label="Email"
                                                placeholder="email@domain.com"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email}
                                                error={!!touched.email && !!errors.email}
                                            />
                                            {/* figure out how to change this value with checkbox */}
                                            <CheckBox checked={true} label={'verified'} />
                                        </FlexBox>
                                        <FlexBox className="">
                                            <Paragraph className="min-w-[111px]">Phone</Paragraph>
                                            <DialCodeSelect />
                                            <TextField
                                                name="phone"
                                                placeholder="00 000 0000"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.phone}
                                                error={!!touched.phone && !!errors.phone}
                                            />
                                        </FlexBox>
                                        <FlexBox>
                                            <Paragraph className="min-w-[111px]">Role</Paragraph>
                                            <Select
                                                name="role"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.role}
                                                options={[
                                                    { label: 'OWNER', value: 1 },
                                                    { label: 'ADMIN', value: 2 },
                                                    { label: 'MEMBER', value: 3 },
                                                ]}
                                            ></Select>
                                        </FlexBox>

                                        <FlexBox className="justify-center py-2 pl-[128px] justify-start">
                                            <Button
                                                className="bg-accent-soft hover:bg-accent"
                                                type="submit"
                                                loading={loadingButton}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleSubmit();
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </FlexBox>
                                    </form>
                                )}
                            </Formik>
                        </Grid>
                    )) || <Paragraph>The user is not found</Paragraph>}
            </Page>
        </ProtectedComponent>
    );
}
