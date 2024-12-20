import {
	type ResponseDataEnvelope,
	applicationHeaders,
	axios,
} from '@cd/core-lib/axiosInstance';
import { type AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import Button from './button/Button/Button';
import Center from './Center';
import TextField from './TextField';

const Over21Button = ({
	redirect = false,
	onContinue,
}: {
	onContinue?: () => void;
	redirect: false | string;
}) => {
	const router = useRouter();
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
			email: yup
				.string()
				.email()
				.min(15, 'Your email is too short.')
				.required('Enter your email'),
		}),
		async onSubmit() {
			try {
				validateForm(values);
				setLoading(true);

				// dont await
				axios.post<
					ResponseDataEnvelope<any>,
					AxiosResponse<ResponseDataEnvelope<any>>,
					{ email: string }
				>('/api/save-visitor', values, {
					headers: { ...applicationHeaders },
				});

				document.cookie = `is_legal_age=true;`;
				document.cookie = `email=${values.email};`;
				console.debug(`over 21 okay. continue to site.`);
			} catch (error: any) {
				setLoading(false);
				toast.error(error.message);
			} finally {
				if (onContinue) {
					onContinue();
				}
				if (redirect) {
					router.push(redirect);
				}
				setLoading(false);
			}
		},
	});

	return (
		<Center>
			<form className="w-full !p-0 !py-4 space-y-4" onSubmit={handleSubmit}>
				<TextField
					minLength={15}
					type="email"
					containerClassName="w-full"
					name="email"
					placeholder="Enter your email"
					value={values.email}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!errors.email || !!touched.email}
				/>
				<Button
					type="submit"
					bg={'secondary-light'}
					hover={'secondary'}
					className="p-8 text-2xl place-self-center w-full !rounded"
					loading={loading}
					disabled={loading}
				>
					I'm legal
				</Button>
			</form>
		</Center>
	);
};

export default Over21Button;
