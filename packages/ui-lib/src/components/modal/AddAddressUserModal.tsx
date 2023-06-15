import { urlBuilder } from '@cd/core-lib';
import { AddressUserCreateType } from '@cd/data-access';
import { Button } from '../button';
import FlexBox from '../FlexBox';
import Grid from '../Grid';
import { Modal, ModalProps } from '../modal';
import TextField from '../TextField';

import axios from 'axios';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

interface AddAddressModalProps extends ModalProps {
    userId: string;
    setState?: Dispatch<SetStateAction<any>>;
    onClose: () => void;
}
function AddAddressUserModal({ userId, onClose, setState, ...props }: AddAddressModalProps) {
    const [loadingButton, setLoadingButton] = useState(false);

    const initialValues: AddressUserCreateType = {
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipcode: 0,
        country: '',
        // set Country on the backend, or with a picker UI element for country and country Code
        countryCode: 'US',
        // get coordinates on the backend, and connect the id to this incoming address record
        coordinateId: '',
        userId
    };

    const validationSchema = Yup.object().shape({
        street1: Yup.string().required('Street Line 1 is required'),
        street2: Yup.string(),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zipcode: Yup.number().required('Zipcode is required'),
        country: Yup.string().required('Country is required'),
        countryCode: Yup.string().required('Country Code is required'),
        userId: Yup.string().required('User Id is required')
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleFormSubmit
    });

    const closeModalAndReset = () => {
        onClose();
        setLoadingButton(false);
        resetForm();
    };

    async function handleFormSubmit(values: AddressUserCreateType) {
        try {
            if (!loadingButton) {
                setLoadingButton(true);
                const formData = new FormData();
                formData.append('street1', values.street1);
                formData.append('street2', values.street2 as string);
                formData.append('city', values.city);
                formData.append('state', values.state);
                formData.append('zipcode', values.zipcode as unknown as string);
                formData.append('country', values.country);
                formData.append('countryCode', values.countryCode as string);
                formData.append('userId', values.userId as string);

                const { data } = await axios.post(urlBuilder.dashboard + `/api/users/${userId}/address`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('address created: ', data);
                setLoadingButton(false);
                if (setState) setState((prev: any) => [...prev, data]);
                toast.success('Address is created.');
                closeModalAndReset();
            }
        } catch (error: any) {
            setLoadingButton(false);
            console.error(error);
            toast.error(error.response.statusText);
            // location.reload();
        }
    }

    return (
        <Modal {...props} onClose={closeModalAndReset}>
            <Grid className="space-y-4">
                <form
                    onSubmit={(e) => {
                        // e.preventDefault();
                        // e.stopPropagation();
                        handleSubmit();
                    }}
                >
                    <FlexBox className="flex-col space-x-0 space-y-2">
                        <TextField
                            name={`street1`}
                            label="Street Line 1"
                            placeholder="Street Line 1"
                            value={values?.street1}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.street1 && !!errors.street1}
                            helperText={touched.street1 && errors.street1}
                        />
                        <TextField
                            name={`street2`}
                            label="Street Line 2"
                            placeholder="Street Line 2"
                            value={values?.street2 as string}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.street2 && !!errors.street2}
                            helperText={touched.street2 && errors.street2}
                        />
                        <TextField
                            name={`city`}
                            label="City"
                            placeholder="City"
                            value={values?.city}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.city && !!errors.city}
                            helperText={touched.city && errors.city}
                        />
                        <TextField
                            name={`state`}
                            label="State"
                            placeholder="State"
                            value={values?.state}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.state && !!errors.state}
                            helperText={touched.state && errors.state}
                        />
                        <TextField
                            name={`country`}
                            label="Country"
                            placeholder="Country"
                            value={values?.country}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.country && !!errors.country}
                            helperText={touched.country && errors.country}
                        />
                        <TextField
                            name={`zipcode`}
                            label="Zipcode"
                            placeholder="Zipcode"
                            value={values?.zipcode}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched.zipcode && !!errors.zipcode}
                            helperText={touched.zipcode && errors.zipcode}
                        />
                        <FlexBox className="justify-center">
                            <Button
                                type="submit"
                                loading={loadingButton}
                                onClick={(e: any) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleSubmit();
                                }}
                            >
                                Save
                            </Button>
                        </FlexBox>
                    </FlexBox>
                </form>
            </Grid>
        </Modal>
    );
}

export default AddAddressUserModal;
