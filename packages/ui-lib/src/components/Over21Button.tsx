import {
	type ResponseDataEnvelope,
	applicationHeaders,
	axios,
} from '@cd/core-lib';
import { type AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import Button from './button/Button/Button';
import Center from './Center';
import FlexBox from './FlexBox';
import TextField from './TextField';
import { Paragraph } from './Typography';

const Over21Button = ({
	redirect = '/browse',
	onContinue,
}: {
	onContinue?: () => void;
	redirect?: string;
}) => {
	const router = useRouter();
	const [cookie, setCookie] = useCookies(['yesOver21', 'email']);
	const [loading, setLoading] = useState(false);
	const {
		resetForm,
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		validateForm,
	} = useFormik({
		initialValues: { email: '' },
		validateOnChange: false,
		validationSchema: yup.object().shape({
			email: yup.string().email().required(''),
		}),
		async onSubmit() {
			try {
				validateForm(values);

				setLoading(true);
				const response = await axios.post<
					ResponseDataEnvelope<any>,
					AxiosResponse<ResponseDataEnvelope<any>>,
					{ email: string }
				>('/api/save-visitor', values, {
					headers: { ...applicationHeaders },
				});

				// if (!response.data.success || response.data.success === 'false')
				// 	throw new Error(response.data.error);

				setCookie('yesOver21', 'true');
				setCookie('email', values.email);
				setLoading(false);

				router.push(redirect);
			} catch (error: any) {
				setLoading(false);
				toast.error(error.message);
			}
		},
	});

	return (
		<Center className="w-full !p-0 !py-4 space-y-4">
			<TextField
				type="email"
				containerClassName="w-full"
				name="email"
				placeholder="Enter your email..."
				value={values.email}
				onBlur={handleBlur}
				onChange={handleChange}
				error={!!errors.email || !!touched.email}
			/>
			<Paragraph>By entering your email, you agree you are over 21.</Paragraph>
			<Button
				type="submit"
				bg={'secondary-light'}
				hover={'primary-light'}
				className="p-8 text-2xl place-self-center w-full !rounded"
				loading={loading}
				disabled={loading}
				onClick={(e: any) => {
					e.preventDefault();
					e.stopPropagation();
					handleSubmit();
				}}
			>
				I'm over 21
			</Button>
		</Center>
	);
};

export default Over21Button;
