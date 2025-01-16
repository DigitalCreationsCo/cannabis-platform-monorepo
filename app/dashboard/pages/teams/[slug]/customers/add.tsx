import { Error as ErrorComponent } from '@/components/shared';
import {
	axios,
	formatToTimeZone,
	getFirstErrorOrNull,
	TimeZoneMap,
	useDispensary,
	usStatesAbbreviationList,
} from '@gras/core';
import { type Customer } from '@gras/data-access';
import {
	Button,
	Grid,
	LoadingPage,
	Page,
	PageHeader,
	Select,
	TextField,
} from '@gras/ui';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddCustomer() {
	const router = useRouter();
	const { t } = useTranslation('common');
	const { isLoading, isError, team } = useDispensary();
	const [loadingButton, setLoadingButton] = useState(false);

	const {
		handleChange,
		handleBlur,
		values,
		touched,
		errors,
		setFieldValue,
		validateForm,
		handleSubmit,
		resetForm,
	} = useFormik({
		initialValues: {
			first_name: '',
			last_name: '',
			address: '',
			city: '',
			state: '',
			zipcode: '',
			email: '',
			country: 'United States',
			mobile_number: '',
			custom_field: {
				birthdate: '',
				segment: [team.weedTextSegmentId],
			},
		} as Customer,
		onSubmit: async (values) => {
			try {
				setLoadingButton(true);
				await axios.post(`/api/dispensaries/${team.slug}/customers`, values);
				toast.success('Customer added Successfully');
				setLoadingButton(false);
				resetForm();
				router.push(`/teams/${team.slug}/customers`);
			} catch (error: any) {
				console.error(error);
				setLoadingButton(false);
				toast.error(error.response.statusText);
			}
		},
	});
	function notifyValidation() {
		validateForm().then((errors) => {
			if (getFirstErrorOrNull(errors)) {
				toast.error(getFirstErrorOrNull(errors) || 'Error adding customer');
			}
		});
	}
	if (isLoading) {
		return <LoadingPage />;
	}

	if (isError) {
		return <ErrorComponent message={isError.message} />;
	}

	if (!team) {
		return <ErrorComponent message={t('team-not-found')} />;
	}

	return (
		<Page className="bg-light !pb-12 p-0 m-0 lg:p-0 xl:p-0">
			<PageHeader title={`Add Customer`} Icon={UserPlusIcon}>
				<div className="flex flex-row gap-x-5 my-4">
					<Link href={`/teams/${team.slug}/customers`}>
						<Button className="bg-amber-100 hover:bg-amber-200 active:bg-amber-200 place-self-start px-4 mt-2">{`Back to Users`}</Button>
					</Link>
				</div>
			</PageHeader>
			<form onSubmit={handleSubmit}>
				<Grid className="grid-cols-1 max-w-lg">
					<TextField
						containerClassName="col-span-1"
						className="text-lg"
						name="first_name"
						label="* first name"
						placeholder="first name"
						value={values?.first_name}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.first_name && !!errors.first_name}
						helperText={touched.first_name && errors.first_name}
					/>
					<TextField
						containerClassName="col-span-1"
						className="text-lg"
						name="last_name"
						label="* last name"
						placeholder="last name"
						value={values?.last_name}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.last_name && !!errors.last_name}
					/>
					<TextField
						containerClassName="col-span-1"
						className="text-lg"
						name="mobile_number"
						label="* phone"
						placeholder="phone"
						value={values?.mobile_number}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.mobile_number && !!errors.mobile_number}
					/>
					<TextField
						containerClassName="col-span-1"
						className="text-lg"
						name="email"
						label="* email"
						placeholder="email"
						value={values?.email}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.email && !!errors.email}
					/>
					<TextField
						containerClassName={'flex-1'}
						className="text-lg"
						name="city"
						label="* city"
						placeholder="city"
						value={values.city ?? ''}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.city && !!errors.city}
					/>
					<Select
						name="state"
						containerClassName={'flex-1'}
						label="* state"
						defaultValue={values?.state ?? 'NY'}
						values={usStatesAbbreviationList}
						setOption={handleChange}
					/>
					<TextField
						className="text-lg"
						name="zipcode"
						label="* zipcode"
						placeholder="zipcode"
						maxLength={5}
						type={'number'}
						value={values?.zipcode || ''}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched?.zipcode && !!errors?.zipcode}
					/>
					<TextField
						className="text-lg"
						name="birthdate"
						label="birthday"
						type="date"
						onChange={(e: any) => {
							// isvalidtime value
							if (!e.target.value) {
								setFieldValue('birthdate', '');
								return;
							}
							const date = formatToTimeZone(
								e.target.value,
								TimeZoneMap[values.state || 'NY']
							);
							setFieldValue('birthdate', date);
						}}
					/>
					<Button
						type="submit"
						loading={loadingButton}
						className="mt-8 text-dark bg-amber-100 hover:bg-amber-200 active:bg-amber-200 px-4 place-self-end justify-self-end"
					>
						{t('add-customer')}
					</Button>
				</Grid>
			</form>
		</Page>
	);
}
