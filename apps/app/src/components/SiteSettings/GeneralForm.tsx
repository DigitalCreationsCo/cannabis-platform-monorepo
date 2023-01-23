import { db_slug } from '@cd/data-access';
import { Button, FlexBox, Grid, H6, LoadingDots, TextField } from '@cd/shared-ui';
import axios from 'axios';
import { Formik } from 'formik';
import { useFetchSiteSettings } from 'hooks';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { urlBuilder } from '../../utils';
import UploadImageBox from '../UploadImageBox';

// form field validation
const validationSchema = yup.object().shape({
    site_name: yup.string().required('site name is required'),
    site_description: yup.string().required('site description is required'),
    site_banner_text: yup.string().required('site banner text required'),
});

export default function GeneralForm() {
    const [logo, setLogo] = useState<File>();
    const [bannerImage, setBannerImage] = useState<File>();
    const [loadingButton, setLoadingButton] = useState(false);
    const { data, loading, refetch } = useFetchSiteSettings(`/${db_slug.general_site_settings}`);

    const initialValues = {
        site_name: data?.site_name || '',
        site_description: data?.site_description || '',
        site_banner_text: data?.site_banner_text || '',
    };

    const handleFormSubmit = async (values) => {
        setLoadingButton(true);
        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('image', bannerImage);
        formData.append('site_name', values.site_name);
        formData.append('settings _name', db_slug.general_site_settings);
        formData.append('site_description', values.site_description);
        formData.append('site_banner_text', values.site_banner_text);

        try {
            const { data } = await axios.post(urlBuilder.next + '/api/settings/general', formData);
            toast.success(data);
            refetch();
            setLoadingButton(false);
        } catch (error) {
            setLoadingButton(false);
            console.error(error);
            toast.error(error.response.statusText);
        }
    };

    if (loading) {
        return <LoadingDots />;
    }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            // validationSchema={ validationSchema }
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid>
                        <H6>Site Logo</H6>
                        <FlexBox>
                            <label htmlFor="site_logo">
                                <UploadImageBox>Upload</UploadImageBox>
                            </label>

                            <input
                                hidden
                                type="file"
                                id="site_logo"
                                accept="image/*"
                                onChange={(e) => setLogo(e.target.files[0])}
                            />

                            {data?.site_logo && <Image src={data.site_logo.location} alt="" width={140} />}
                        </FlexBox>

                        <TextField
                            name="site_name"
                            label="Site Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.site_name}
                            error={!!touched.site_name && !!errors.site_name}
                        />
                        <TextField
                            name="site_description"
                            label="Site Description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.site_description}
                            error={!!touched.site_description && !!errors.site_description}
                        />
                        <TextField
                            onBlur={handleBlur}
                            name="site_banner_text"
                            onChange={handleChange}
                            label="Site Banner Text"
                            value={values.site_banner_text}
                            error={!!touched.site_banner_text && !!errors.site_banner_text}
                        />
                        <H6>Banner Image</H6>
                        <label htmlFor="banner_image">
                            <UploadImageBox>Upload</UploadImageBox>
                        </label>

                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            id="banner_image"
                            onChange={(e) => setBannerImage(e.target.files[0])}
                        />

                        {data?.site_banner && <Image alt="" src={data?.site_banner?.location} width={200} />}
                    </Grid>

                    <Button type="submit" loading={loadingButton}>
                        Save Changes
                    </Button>
                </form>
            )}
        </Formik>
    );
}
