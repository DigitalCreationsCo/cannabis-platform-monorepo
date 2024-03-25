/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/no-unknown-property */
import {
	getCoordinatePairFromCoordinates,
	selectBlogsByTag,
	selectBlogState,
	selectLocationState,
	selectMarketPlaceDispensaries,
	selectSelectedLocationState,
	selectShopState,
	selectUserState,
	TextContent,
} from '@cd/core-lib';
import {
	type Coordinates,
	type OrganizationWithShopDetails,
} from '@cd/data-access';
import {
	Carousel,
	Grid,
	H1,
	H3,
	Page,
	type LayoutContextProps,
	FlexBox,
	H4,
} from '@cd/ui-lib';
import mapboxgl, { type MapboxGeoJSONFeature } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR, { type SWRResponse } from 'swr';
import { twMerge } from 'tailwind-merge';
import { DispensaryCard, InfoCard } from '../../components';
// import { shopTour } from '../../tour';

// /organization/zipcode=${zipcode}&limit=${limit}&radius=${radius}
export default function MarketPlace() {
	const { user } = useSelector(selectUserState);
	const { zipcode } = user.address[0];
	const { radius } = useSelector(selectLocationState);

	const { data, error, isLoading } = useSWR<
		SWRResponse<OrganizationWithShopDetails[]>
	>(
		// `/api/organization/zipcode=${zipcode}&limit=${limit}&radius=${radius}`,2
		`/api/organization?zipcode=${10011}&limit=${4}&radius=${10000}`, // hardcoded NYC zipcode for now
		async (url: string) => {
			const response = await fetch(url);
			const json = await response.json();

			if (!response.ok) {
				throw new Error(
					json.error.message || 'An error occurred while fetching the data',
				);
			}

			return json;
		},
	);

	const dispensaries = data?.payload || [];
	console.info('dispensaries: ', dispensaries);
	console.info('error: ', error);

	// function startShopTour() {
	// 	shopTour.start();
	// }

	// useEffect(() => {
	// 	if (!user.isSignUpComplete) startShopTour();
	// }, [user.isSignUpComplete]);

	const styles = {
		responsiveHeading: [
			'text-4xl pb-0 px-4 whitespace-normal font-semi-bold hidden sm:block',
		],
	};
	return (
		<Page gradient="green" className="lg:px-0 pb-12 min-h-[440px]">
			<link
				href="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css"
				rel="stylesheet"
			/>
			<div className="cursor-default pt-2 md:pt-0">
				<div id={'shop-tour-step1'} className="">
					<H1
						color="light"
						className={twMerge(styles.responsiveHeading, 'drop-shadow')}
					>
						{TextContent.info.CANNABIS_DELIVERED}
					</H1>
					<H4 className="text-inverse px-6 leading-2 drop-shadow text-center sm:text-left">
						Find dispensaries, edibles, and more near you
					</H4>
					{/* <H3 className="text-inverse px-4 drop-shadow-md">
						Good day{user.firstName && `, ${user.firstName}`}!
					</H3> */}
				</div>
			</div>

			{/* <FlexBox className="flex-row w-full p-4">
				<RenderGoogleMap />
			</FlexBox> */}

			<Grid className="relative grid-cols-3">
				{/* <H5 className="text-2xl px-8 lg:px-16">{`Gras delivers bud in ${
				selectedLocation.address.city || 'Baltimore'
			}`}</H5> */}

				<div className="col-span-full lg:col-span-2 lg:col-start-1 lg:row-start-1 content-end p-5">
					<Carousel
						settings={{ infinite: false }}
						error={error}
						loading={isLoading}
						data={dispensaries}
						datatype="dispensary"
						SliderComponent={DispensaryCard}
					/>
				</div>

				<div className="p-4 row-start-1 col-span-3 lg:col-span-1">
					<RenderMapBox data={dispensaries} />
				</div>
			</Grid>

			{/* || <Center>
                    <H6 color='light' className='whitespace-pre-line'>
                        Want to see your favorite Dispensary?{'\n'}
                        Ask them to start a Gras account!</H6>
                    <Link className='mx-auto' 
                    href="/find-my-dispensary">
                        <H6 className="underline text-lg text-center">
                            {TextContent.prompt.FIND_DISPENSARY}</H6>
                    </Link>
                </Center>
                } */}

			{/* <FlexBox className="cursor-default bg-inverse shadow shadow-md shadow-lg hover:shadow-xl hover:scale-101 duration-500 p-12 rounded max-w-[559px] margin-auto place-self-center space-y-2">
                <H2 className='font-black text-gray'>
                    What is Gras?</H2>
                <H5>{`Gras is a home-grown service provider for cannabis lovers.
                    We serve the people of our communities, that enjoy cannabis, by offering a bridge of communication, clarity and support.`}</H5>
                    </FlexBox> */}
			{/* </Grid> */}
		</Page>
	);
}

MarketPlace.getLayoutContext = (): LayoutContextProps => ({
	showSideNav: true,
	showHeader: true,
});

// const RenderGoogleMap = () => {
// 	return (
// 		<iframe
// 			title="embed-map"
// 			className="w-full"
// 			height="250"
// 			width="250"
// 			style={{ border: 0 }}
// 			loading="eager"
// 			allowFullScreen
// 			referrerPolicy="no-referrer-when-downgrade"
// 			src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_EMBED_API_KEY}&q=New+York,NY&zoom=14`}
// 		></iframe>
// 	);
// };

const RenderMapBox = ({ data }: { data: any[] }) => {
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;
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
				// create a HTML element for each feature
				const el = document.createElement('div');
				el.className = 'marker';
				el.style.backgroundImage = feature.properties.image;
				el.style.width = `60px`;
				el.style.height = `60px`;
				el.textContent = feature.properties.message;
				el.style.backgroundSize = '100%';
				el.style.cursor = 'pointer';

				el.addEventListener('click', () => {
					window.alert(feature.properties.message);
				});

				// make a marker for each feature and add to the map
				new mapboxgl.Marker(el)
					.setLngLat(feature.geometry.coordinates)
					.addTo(map.current);
			}
		}

		if (data.length > 0 && map.current?.isStyleLoaded)
			addMarkersToMapBox(generateGEOJSONDataFromDispensaries(data));
	}, [data, map.current?.isStyleLoaded]);

	function generateGEOJSONDataFromDispensaries(
		data: OrganizationWithShopDetails[],
	) {
		return {
			type: 'FeatureCollection',
			features: data.map((dispensary) => {
				const { address, name } = dispensary;
				const [lng, lat] = getCoordinatePairFromCoordinates(
					address.coordinates as Coordinates,
				);
				return {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [lng, lat],
					},
					properties: {
						message: name,
						image: dispensary.images[0].location,
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
