/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable sonarjs/no-use-of-empty-return-value */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable i18next/no-literal-string */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/no-unknown-property */
import { TopBar } from '@/components/layouts';
import { Error } from '@/components/shared';
import env from '@/lib/env';
import SEOMetaTags from '@/lib/SEOMetaTags';
import {
	type ResponseDataEnvelope,
	applicationHeaders,
	axios,
	debounce,
	defaultHeaders,
	getCoordinatePairFromCoordinates,
	isValidZipcode,
	urlBuilder,
	useEvents,
	useLocalDispensaries,
} from '@cd/core-lib';
import { type Event, type Coordinates, type Dispensary } from '@cd/data-access';
import {
	Grid,
	H1,
	Page,
	Footer,
	Carousel,
	H2,
	DispensaryCard,
	TextField,
	H3,
	Paragraph,
	Button,
	FlexBox,
} from '@cd/ui-lib';
import { type AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
	type ReactElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { InfoCard } from '@/components/blog';
import EventCard from '@/components/shared/EventCard';
// import {
// 	getFacebookLoginStatus,
// 	initFacebookSdk,
// 	fbLogin,
// } from '@cd/core-lib/src/lib/facebookIG';
import {
	type Post,
	type Settings,
	getClient,
	getPosts,
	getSettings,
	readToken,
} from '@/lib/sanity';
import markerImage from 'public/map-marker.png';

const defaultZipcode = '10001';

export default function Browse({
	token,
	posts,
}: {
	token: string;
	posts: Post[];
	settings: Settings;
}) {
	const saveZipcodeToLocalStorage = (zipcode: string): string => {
		if (isValidZipcode(zipcode)) {
			localStorage.setItem('zipcode', zipcode.toString());
		}
		setZipcode(zipcode);
		return zipcode;
	};

	const getZipcodeLocalStorage = (): string => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('zipcode') || '';
		}
		return '';
	};
	const radius = 11000;
	const [zipcode, setZipcode] = useState(getZipcodeLocalStorage());
	const [zipcodeError, setZipcodeError] = useState('');

	const { isLoading, isError, dispensaries } = useLocalDispensaries({
		zipcode: isValidZipcode(zipcode)
			? zipcode
			: getZipcodeLocalStorage() || saveZipcodeToLocalStorage(defaultZipcode),
		radius,
		token,
	});
	useEffect(() => {
		if (isValidZipcode(zipcode)) {
			setEventRequestSent(false);
		}
	}, [zipcode]);

	const { isLoading: isEventLoading, events } = useEvents({
		token,
		zipcode,
		radius,
	});

	const eventsToday =
		events.filter(
			(event) =>
				event.start_date < new Date().toISOString().substring(0, 10) &&
				event.end_date >= new Date().toISOString().substring(0, 10)
		) || [];

	const [eventRequestSent, setEventRequestSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [eventsLocationResults, setEventsLocationResults] = useState<any[]>([]);

	const {
		values,
		errors,
		touched,
		handleBlur,
		setFieldValue,
		handleSubmit,
		validateForm,
	} = useFormik({
		initialValues: {
			city: '',
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		validateOnChange: false,
		validationSchema: yup.object().shape({
			city: yup.string().required(''),
			timezone: yup.string().required(''),
		}),
		async onSubmit() {
			try {
				validateForm(values);
				setLoading(true);
				await axios.put<
					ResponseDataEnvelope<any>,
					AxiosResponse<ResponseDataEnvelope<any>>,
					{ city: string }
				>(
					`/api/events?location=${values.city}&timezone=${values.timezone}&create_cron=true`,
					values,
					{
						headers: {
							...applicationHeaders,
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setLoading(false);
				setEventRequestSent(true);
			} catch (error: any) {
				setLoading(false);
				toast.error('Something went wrong. Try again.');
			}
		},
	});

	const debounceAddressLookup = useCallback(
		debounce(async (e) => {
			setEventsLocationResults([]);
			if (e.target.value.length < 5) {
				return;
			}
			const response = await axios(
				urlBuilder.locationIq.city(e.target.value, 6),
				{
					headers: { ...defaultHeaders },
				}
			);

			if (response.status !== 200 || !response.data.length) {
				setEventsLocationResults([]);
			} else {
				console.info('response', response.data);
				setEventsLocationResults(response.data);
			}
		}, 1000),
		[]
	);

	const getOrganizerImage = useCallback(
		(event: Event) => {
			return event.primary_organizer_slug
				? dispensaries.find((d) => d.slug === event.primary_organizer_slug)
						?.images[0].location
				: '';
		},
		[dispensaries]
	);

	if (isError) {
		return <Error message={isError.message} />;
	}
	return (
		<>
			<SEOMetaTags
				additionalKeywords={[
					'drake leaked text messages',
					'current events new york',
					'msg new york events',
					'new york events today',
					'new york city events today',
					'discovery green events',
					'events new york',
					'weed show',
				]}
			/>

			<Page
				gradient="pink"
				className="!pt-0 md:pt-0 px-0 lg:px-0 pb-0 min-h-[440px]"
			>
				<TopBar
					SearchComponent={
						<div className="hidden lg:block">
							<H1 className="text-light text-lg px-2 leading-2 drop-shadow-[0px_2px_0px_#555555] sm:drop-shadow-[0px_2px_1px_#555555] text-left">
								{`Find flower, edibles, dispensaries`}
								<span className="hidden xl:!inline">{` near you`}</span>
							</H1>
							<TextField
								className="text-dark"
								name="zipcode"
								maxLength={5}
								defaultValue={'Enter your zipcode'}
								value={zipcode}
								placeholder="Enter your zipcode"
								onBlur={undefined}
								onChange={(e: any) =>
									// eslint-disable-next-line sonarjs/no-use-of-empty-return-value
									debounce(
										saveZipcodeToLocalStorage(e.target.value || ''),
										2000
									)
								}
								error={!!zipcodeError}
								helperText={zipcodeError}
							/>
						</div>
					}
				/>

				<Grid className="relative grid-cols-3 xs:pb-16">
					<div className="col-span-full">
						<div className="lg:hidden px-4 sm:w-fit">
							<H1 className="lg:hidden font-normal text-xl md:text-3xl text-light md:pt-2 leading-2 md:drop-shadow-[0px_2px_1px_#555555] text-left">
								{`Find flower, edibles, dispensaries`}
								<span className="hidden lg:!inline">{` near you`}</span>
							</H1>
							<TextField
								className="text-dark"
								name="zipcode"
								maxLength={5}
								// label="search your zipcode"
								defaultValue={'Enter your zipcode'}
								value={zipcode}
								placeholder="Enter your zipcode"
								onBlur={undefined}
								onChange={(e: any) =>
									// eslint-disable-next-line sonarjs/no-use-of-empty-return-value
									debounce(
										saveZipcodeToLocalStorage(e.target.value || ''),
										2000
									)
								}
								error={!!zipcodeError}
								helperText={zipcodeError}
							/>
						</div>
						<Carousel
							responsive={{
								xl: {
									breakpoint: { max: 4000, min: 1400 },
									items: 5,
									slidesToSlide: 4,
									partialVisibilityGutter: 20,
								},
								lg: {
									breakpoint: { max: 1400, min: 1100 },
									items: 4,
									slidesToSlide: 3,
									partialVisibilityGutter: 20,
								},
								md: {
									breakpoint: { max: 1100, min: 800 },
									items: 3,
									slidesToSlide: 2,
									partialVisibilityGutter: 10,
								},
								sm: {
									breakpoint: { max: 800, min: 464 },
									items: 2,
									partialVisibilityGutter: 10,
								},
							}}
							items={
								!isLoading && dispensaries.length
									? dispensaries?.map((d, index) => (
											<DispensaryCard
												priority={index < 4}
												loading={isLoading}
												key={`dispensary-card-${index}`}
												data={d}
											/>
										))
									: [1, 2, 3, 4, 5, 6].map((d, index) => (
											<DispensaryCard
												loading={isLoading}
												key={`dispensary-card-${index}`}
												data={d as unknown as Required<Dispensary>}
											/>
										))
							}
						/>
					</div>

					<div className="col-span-full">
						<H2 className="col-span-full font-normal !text-xl sm:pt-2 px-3 md:px-4 text-light leading-2 md:drop-shadow-[0px_2px_0px_#555555] text-left">
							🎉 Nearby Events
						</H2>
						{(!isEventLoading && events.length < 2 && (
							<div className="col-span-full lg:justify-center flex flex-row">
								<div className="h-44 max-w-xl place-self-center bg-white shadow-xl rounded mx-4 gap-1">
									<AnimatePresence>
										{eventRequestSent && (
											<motion.div
												className="flex h-full p-5 hover:bg-gray-100 transition"
												initial={{ y: 50, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												exit={{ y: 50, opacity: 0 }}
											>
												<Paragraph className="place-self-center">{`We're finding events in your city... 
						Come back later to see them 🎉`}</Paragraph>
											</motion.div>
										)}

										{!eventRequestSent && (
											<motion.div
												className="p-4 relative z-10"
												animate={{ x: 0, opacity: 1 }}
												exit={{ y: 50, opacity: 0 }}
											>
												<H3>{`Want to see more events in your city?`}</H3>
												<Paragraph>{`Let us know. We'll find events in your city and display them when you come back.`}</Paragraph>
												<FlexBox className="pt-2 flex-row items-stretch gap-2">
													<TextField
														autoComplete="off"
														placeholder="Enter your city..."
														type="text"
														containerClassName="w-full"
														name="city"
														value={values.city}
														onBlur={handleBlur}
														onChange={(e) => {
															e.preventDefault();
															setFieldValue('city', e.target.value);
															debounceAddressLookup(e);
														}}
														className="text-dark"
														error={!!errors.city || !!touched.city}
													/>
													<Button
														type="submit"
														className="text-dark bg-amber-100 hover:bg-amber-200"
														loading={loading}
														disabled={loading}
														onClick={(e: any) => {
															e.preventDefault();
															e.stopPropagation();
															handleSubmit();
														}}
													>
														{`Find Events`}
													</Button>
												</FlexBox>
												<FlexBox className="flex-col bg-gray-100 z-50">
													{eventsLocationResults.map((result, index) => (
														<div
															key={index}
															className="hover:bg-gray-200 z-20 p-2 w-full"
															onClick={(e) => {
																e.preventDefault();
																setFieldValue('city', result.display_name);
																setEventsLocationResults([]);
															}}
														>
															{result.display_name}
														</div>
													))}
												</FlexBox>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</div>
						)) || <></>}
						<Carousel
							responsive={{
								xl: {
									breakpoint: { max: 4000, min: 1400 },
									items: 4,
									slidesToSlide: 3,
									partialVisibilityGutter: 40,
								},
								lg: {
									// the naming can be any, depends on you.
									breakpoint: { max: 1400, min: 1100 },
									items: 3,
									slidesToSlide: 2,
									partialVisibilityGutter: 40,
								},
								md: {
									breakpoint: { max: 1100, min: 700 },
									items: 3,
									slidesToSlide: 2,
									partialVisibilityGutter: 40,
								},
								sm: {
									breakpoint: { max: 700, min: 464 },
									items: 2,
								},
								xs: {
									breakpoint: { max: 464, min: 0 },
									items: 2,
									slidesToSlide: 1,
								},
							}}
							items={events.map((event, index) => (
								<EventCard
									key={`event-card-${index}`}
									loading={false}
									event={event}
									organizerImage={getOrganizerImage(event)}
								/>
							))}
						/>
					</div>

					{!isEventLoading && eventsToday.length === 0 ? (
						<></>
					) : (
						<div className="col-span-full">
							<H2 className="col-span-full !text-xl font-normal sm:pt-2 px-3 md:px-4 text-light leading-2 md:drop-shadow-[0px_2px_0px_#555555] text-left">
								🎉 Happening Today
							</H2>
							<Carousel
								responsive={{
									xl: {
										breakpoint: { max: 4000, min: 1400 },
										items: 4,
										slidesToSlide: 3,
										partialVisibilityGutter: 40,
									},
									lg: {
										breakpoint: { max: 1400, min: 1100 },
										items: 3,
										slidesToSlide: 2,
										partialVisibilityGutter: 40,
									},
									md: {
										breakpoint: { max: 1100, min: 700 },
										items: 3,
										slidesToSlide: 2,
										partialVisibilityGutter: 40,
									},
									sm: {
										breakpoint: { max: 700, min: 464 },
										items: 2,
									},
									xs: {
										breakpoint: { max: 464, min: 0 },
										items: 2,
										slidesToSlide: 1,
									},
								}}
								items={
									!isEventLoading && eventsToday.length
										? eventsToday.map((event, index) => (
												<EventCard
													priority={index < 4}
													key={`event-card-${index}`}
													loading={false}
													event={event}
													organizerImage={getOrganizerImage(event)}
												/>
											))
										: [1, 2, 3, 4, 5, 6].map((d, index) => (
												<EventCard
													key={`event-card-${index}`}
													loading={isEventLoading}
													event={d as any}
												/>
											))
								}
							/>
						</div>
					)}

					<div className="col-span-full">
						<H2 className="col-span-full !text-xl font-normal px-2 md:px-4 text-light leading-2 md:drop-shadow-[0px_2px_0px_#555555] text-left">
							🍍 Fresh from our blog
						</H2>
						<Carousel
							title="Fresh from the Blog"
							responsive={{
								sm: {
									breakpoint: { max: 700, min: 464 },
									items: 2,
								},
								xs: {
									breakpoint: { max: 464, min: 0 },
									items: 2,
									slidesToSlide: 1,
								},
							}}
							items={posts.map((post, index) => (
								<InfoCard
									loading={isLoading}
									key={`blog-card-${index}`}
									data={post}
									showDescription={false}
								/>
							))}
						/>
					</div>
				</Grid>

				<Footer className="bg-transparent bg-gradient-to-b from-transparent to-secondary" />
			</Page>
		</>
	);
}

const RenderMapBox = ({
	data,
	current,
	setCurrent,
}: {
	data: any[];
	current: number;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
}) => {
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;
	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map | null>(null);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		// eslint-disable-next-line import/no-named-as-default-member
		map.current = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v12',
			zoom: 11.5,
			center: [-74.006, 40.72],
			attributionControl: false,
			// center: [lng, lat],
			// zoom: zoom,
		});
	}, []);

	useEffect(() => {
		function addMarkersToMapBox(geojson: any) {
			// add markers to map
			if (!map.current || !geojson) return;
			for (const feature of geojson.features) {
				const index = geojson.features.indexOf(feature);
				// create a HTML element for each feature
				const el = document.createElement('div');
				el.className = 'marker';
				// el.textContent = feature.properties.title;
				el.style.backgroundImage = `url(${feature.properties.image})`;
				el.style.width = `15px`;
				el.style.height = `19px`;
				el.style.padding = '2px';
				el.style.backgroundSize = '100%';
				el.style.cursor = 'pointer';
				// rotate the image 20 degrees
				el.style.transform = 'rotate(20deg)';

				el.style.backgroundPosition = 'bottom'; // Set background position to center

				el.addEventListener('click', () => {
					setCurrent(index);
				});

				new mapboxgl.Marker(el)
					.setLngLat(feature.geometry.coordinates)
					.addTo(map.current);
			}
		}
		if (data.length > 0 && map.current?.isStyleLoaded) {
			addMarkersToMapBox(generateGEOJSONDataFromDispensaries(data));
		}
	}, [data]);

	useEffect(() => {
		if (data.length > 0 && map.current?.isStyleLoaded) {
			const { address } = data[current];
			const [lng, lat] = getCoordinatePairFromCoordinates(
				address.coordinates as Coordinates
			);
			map.current?.flyTo({
				center: [lng, lat],
				zoom: 11,
				speed: 2,
				animate: true,
			});
		}
	}, [map.current]);

	useEffect(() => {
		if (data.length > 0 && map.current?.isStyleLoaded) {
			const { address } = data[current];
			const [lng, lat] = getCoordinatePairFromCoordinates(
				address.coordinates as Coordinates
			);
			map.current?.flyTo({
				center: [lng, lat],
				speed: 2,
				animate: true,
			});
		}
	}, [current]);

	function generateGEOJSONDataFromDispensaries(data: any[]) {
		return {
			type: 'FeatureCollection',
			features: data.map((dispensary) => {
				const { address, name } = dispensary;
				const [lng, lat] = getCoordinatePairFromCoordinates(
					address.coordinates as Coordinates
				);
				return {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [lng, lat],
					},
					properties: {
						title: name,
						message: name,
						// image: dispensary.images[0].location || Logo.src,
						image: markerImage.src,
					},
				};
			}),
		};
	}
	return (
		<>
			<div
				id="map"
				ref={mapContainer}
				className="rounded overflow-hidden shadow"
				style={{ width: '100%', height: '220px', float: 'right' }}
			>
				<style global jsx>{`
					.mapbox-logo {
						display: none;
					}
					.mapboxgl-ctrl-logo {
						display: none !important;
					}
					.mapbox-improve-map {
						display: none;
					}
					.mapboxgl-ctrl-compass {
						display: none;
					}
				`}</style>
			</div>
		</>
	);
};

Browse.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const authToken = env.nextAuth.secret;

	const { draftMode = false, locale } = ctx;
	const sanityClient = getClient(draftMode ? { token: readToken } : undefined);

	const [settings, posts = []] = await Promise.all([
		getSettings(sanityClient),
		getPosts(sanityClient),
	]);

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			posts,
			settings,
			draftMode,
			token: authToken,
		},
	};
};
