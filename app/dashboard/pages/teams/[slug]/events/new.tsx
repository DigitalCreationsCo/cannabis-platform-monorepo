/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
	fetcher,
	useDispensary,
	axios,
	urlBuilder,
	getFirstErrorOrNull,
	TextContent,
	debounce,
} from '@cd/core-lib';
import { type Event } from '@cd/data-access';
import {
	Button,
	FlexBox,
	PageHeader,
	LoadingPage,
	Page,
	TextField,
	CheckBox,
} from '@cd/ui-lib';
import { TicketIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import * as yup from 'yup';
import { Error as ErrorComponent } from '@/components/shared';
import SEOMetaTags from '@/lib/SEOMetaTags';

function NewEvent() {
	const router = useRouter();
	const { t } = useTranslation('common');
	const { isLoading, isError, team } = useDispensary();

	const { mutate: mutateEvents } = useSWR(
		team?.slug ? `/api/dispensaries/${team?.slug}/events` : null,
		fetcher
	);

	const [loadingButton, setLoadingButton] = useState(false);
	const [locationresults, setLocationResults] = useState([]);
	const [address, setAddress] = useState<{
		display_name: string;
		street: string;
		city: string;
		state: string;
		zipcode: string;
	} | null>(null);

	const validationSchema = yup.object().shape({
		name: yup.string().required('name is required'),
		summary: yup.string().required('summary is required'),
		start_date: yup.string().required('start date is required'),
		start_time: yup.string().required('start time is required'),
		end_date: yup.string().required('end date is required'),
		end_time: yup.string().required('end time is required'),
		primary_venue: yup.object().shape({
			address: yup.object().shape({
				address_1: yup.string().required('street is required'),
				city: yup.string().required('city is required'),
				region: yup.string().required('state is required'),
				postal_code: yup.string().required('zipcode is required'),
			}),
		}),
	});

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		setFieldValue,
		validateForm,
	} = useFormik({
		initialValues: {
			name: '',
			image: {
				url: '',
			} as any,
			timezone: '',
			location: '',
			tickets_url: '',
			tickets_by: '',
			primary_organizer_id: team?.id ?? '',
			primary_organizer_slug: team?.slug ?? '',
			num_children: 0,
			debug_info: {},
			parent_url: '',
			_type: '',
			tags: [],
			eventbrite_event_id: '',
			start_date: '',
			start_time: '',
			end_date: '',
			end_time: '',
			hide_start_date: false,
			hide_end_date: false,
			primary_venue: {
				_type: '',
				name: '',
				venue_profile_id: '',
				address: {
					display_name: '',
					address_1: '',
					address_2: '',
					city: '',
					region: '',
					postal_code: '',
					longitude: '',
					latitude: '',
					location: [0, 0],
				},
				venue_profile_url: '',
				id: '',
				location: [0, 0],
			},
			full_description: '',
			image_id: '',
			is_protected_event: false,
			is_cancelled: false,
			primary_venue_id: '',
			checkout_flow: '',
			series_id: '',
			language: '',
			url: '',
			summary: '',
			is_online_event: false,
			eid: '',
			urgency_signals: {
				messages: [],
				categories: [],
			},
			dedup: {
				count: 0,
				hash: '',
			},
			published: '',
		} as Partial<Event>,
		async onSubmit() {
			try {
				setLoadingButton(true);
				const response = await fetch(`/api/dispensaries/${team!.slug}/events`, {
					method: 'POST',
					body: JSON.stringify(values),
				});

				if (!response.ok) {
					throw new Error(response.statusText || 'Error creating event');
				}

				mutateEvents();
				toast.success('Saved.');
				setLoadingButton(false);
				router.push(`/teams/${team.slug}/events`);
			} catch (error: any) {
				console.error(error);
				setLoadingButton(false);
				toast.error(error.message);
			}
		},
		validationSchema,
	});

	function notifyValidation() {
		validateForm().then((errors) => {
			if (getFirstErrorOrNull(errors)) {
				toast.error(getFirstErrorOrNull(errors));
			}
			console.info('errors', errors);
		});
	}

	const debounceAddressLookup = useCallback(
		debounce(async (e) => {
			setAddress(null);
			if (e.target.value.length < 5) {
				return;
			}
			const response = await axios(
				urlBuilder.locationIq.autocomplete(e.target.value, 6)
			);
			console.info('response', response.data);
			setLocationResults(response.data);
		}, 1000),
		[] // Empty dependency array ensures this is created only once
	);

	useEffect(() => {
		if (team?.id && team?.slug) {
			setFieldValue('primary_organizer_id', team.id);
			setFieldValue('primary_organizer_slug', team.slug);
		}
	}, [team]);

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
		<>
			<SEOMetaTags title={'Create New Event'} description={t('events-info')} />
			<Page className="bg-inherit p-0 m-0 lg:p-0">
				<PageHeader title="Create New Event" Icon={TicketIcon}>
					<FlexBox className="flex flex-row py-2 gap-4">
						<Link href={`/teams/${team.slug}/events`}>
							<Button className="bg-amber-100">{t(TextContent.ui.BACK)}</Button>
						</Link>
					</FlexBox>
				</PageHeader>
				<TextField
					autoComplete="off"
					type="text"
					name="name"
					label="Event Name"
					placeholder=""
					value={values.name}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.name && !!errors.name}
					helperText={touched.name && errors.name}
				/>
				<TextField
					autoComplete="off"
					type="text"
					name="summary"
					label="summary"
					placeholder=""
					value={values.summary}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.summary && !!errors.summary}
					helperText={touched.summary && errors.summary}
				/>
				<FlexBox className="flex-row gap-x-4">
					<TextField
						autoComplete="off"
						type="date"
						name="start_date"
						label="Start date"
						placeholder=""
						value={values.start_date}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.start_date && !!errors.start_date}
						helperText={touched.start_date && errors.start_date}
					/>
					<TextField
						autoComplete="off"
						type="time"
						name="start_time"
						label="Start time"
						placeholder=""
						value={values.start_time}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.start_time && !!errors.start_time}
						helperText={touched.start_time && errors.start_time}
					/>
				</FlexBox>
				<FlexBox className="flex-row gap-x-4">
					<TextField
						autoComplete="off"
						type="date"
						name="end_date"
						label="End date"
						placeholder=""
						value={values.end_date}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.end_date && !!errors.end_date}
						helperText={touched.end_date && errors.end_date}
					/>
					<TextField
						autoComplete="off"
						type="time"
						name="end_time"
						label="End time"
						placeholder=""
						value={values.end_time}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.end_time && !!errors.end_time}
						helperText={touched.end_time && errors.end_time}
					/>
				</FlexBox>

				<CheckBox
					className="w-full bg-light accent-light px-2"
					name="hide_start_date"
					onChange={handleChange}
					checked={values.hide_start_date}
					label={'hide start date'}
				/>
				<CheckBox
					className="w-full bg-light accent-light px-2"
					name="hide_end_date"
					onChange={handleChange}
					checked={values.hide_end_date}
					label={'hide end date'}
				/>
				<CheckBox
					className="w-full bg-light accent-light px-2"
					name="is_online_event"
					onChange={handleChange}
					checked={values.is_online_event}
					label={'is online event'}
				/>
				<CheckBox
					className="w-full bg-light accent-light px-2"
					name="is_cancelled"
					onChange={handleChange}
					checked={values.is_cancelled ?? false}
					label={'is cancelled'}
				/>

				<TextField
					autoComplete="off"
					type="text"
					name="primary_venue.address.display_name"
					label="address"
					placeholder=""
					value={(values.primary_venue?.address as any)?.display_name}
					onBlur={handleBlur}
					onChange={(e) => {
						e.preventDefault();
						if ((values.primary_venue?.address as any)?.display_name) {
							console.info('changed to null');
							setFieldValue('primary_venue.address', null);
						}
						debounceAddressLookup(e);
					}}
					error={!!touched.primary_venue && !!errors.primary_venue}
					helperText={!!touched.primary_venue && errors.primary_venue}
				/>

				{(!address && locationresults.length > 0 && (
					<FlexBox className="flex-col">
						{locationresults.map((location: any) => (
							<div
								key={location.place_id}
								className="hover:bg-gray-200 p-2 w-full"
								onClick={() => {
									setFieldValue('primary_venue.address', {
										display_name: location.display_name,
										address_1:
											(location.address?.house_number &&
												location.address?.road &&
												`${location.address?.house_number} ${location.address?.road}`) ||
											`${location.address?.road}` ||
											`${location.address?.name}`,
										city: location.address?.city,
										region: location.address?.state,
										postal_code: location.address?.postcode,
										longitude: location.lon,
										latitude: location.lat,
										location: [location.lon, location.lat],
									});
									setLocationResults([]);
								}}
							>
								<div>{location.display_name}</div>
							</div>
						))}
					</FlexBox>
				)) || <></>}

				<FlexBox className="py-5">
					<Button
						className="bg-amber-100 hover:bg-amber-200 place-self-end"
						loading={loadingButton}
						size="lg"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							notifyValidation();
							handleSubmit();
						}}
					>
						Create Event
					</Button>
				</FlexBox>
			</Page>
		</>
	);
}

export default NewEvent;
