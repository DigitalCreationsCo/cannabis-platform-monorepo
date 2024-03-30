/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/no-unknown-property */
import {
	getCoordinatePairFromCoordinates,
	selectBlogsByTag,
	modalActions,
	modalTypes,
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
import { useDispatch, useSelector } from 'react-redux';
import useSWR, { type SWRResponse } from 'swr';
import { twMerge } from 'tailwind-merge';
import markerImage from '../../../public/marker-30.png';
import { DispensaryCard, InfoCard } from '../../components';
// import { shopTour } from '../../tour';

// /organization/zipcode=${zipcode}&limit=${limit}&radius=${radius}
export default function MarketPlace() {
	const dispatch = useDispatch();
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

	const dispensaries = (data as any)?.payload || [];
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
	const [current, setCurrent] = useState(0);

	function openStoreFrontModal() {
		// open modal
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.StoreFrontModal,
				organization: dispensaries[current],
			}),
		);
	}

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
						current={current}
						setCurrent={setCurrent}
						settings={{ infinite: false }}
						error={error}
						loading={isLoading}
						data={dispensaries}
						datatype="dispensary"
						SliderComponent={DispensaryCard}
						onClick={openStoreFrontModal}
					/>
				</div>

				<div className="p-4 row-start-1 col-span-3 lg:col-span-1">
					<RenderMapBox
						data={dispensaries}
						current={current}
						setCurrent={setCurrent}
					/>
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

const RenderMapBox = ({
	data,
	current,
	setCurrent,
}: {
	data: any[];
	current: number;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const [isMarkerSet, setIsMarkerSet] = useState(false);

	useEffect(() => {
		// fly to the selected location
		if (data.length > 0 && map.current?.isStyleLoaded) {
			const { address } = data[current];
			const [lng, lat] = getCoordinatePairFromCoordinates(
				address.coordinates as Coordinates,
			);
			map.current?.flyTo({
				center: [lng, lat],
				zoom: 11,
				speed: 2,
				animate: true,
			});
		}
	}, [current]);

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
				const index = geojson.features.indexOf(feature);
				console.info('feature: ', feature);
				// create a HTML element for each feature
				const el = document.createElement('div');
				el.className = 'marker';
				el.style.backgroundImage = `url(${feature.properties.image})`;
				el.style.width = `30px`;
				el.style.height = `50px`;
				el.style.backgroundSize = '100%';
				el.style.cursor = 'pointer';

				// el.className = 'marker';
				// el.style.backgroundImage = `url(${feature.properties.image})`; // Set background image
				// el.style.backgroundColor = '#fff'; // Set background color (change #fff to any color you desire)
				// el.style.display = 'inline-block';
				// el.style.width = `30px`;
				// el.style.height = `30px`;
				// el.style.border = '1px solid #13622a';
				// el.style.borderWidth = '2px';
				// el.style.borderRadius = '50%';
				// // el.textContent = feature.properties.message;
				// el.style.backgroundSize = 'cover'; // Set background size to cover
				// el.style.backgroundPosition = 'center'; // Set background position to center
				// el.style.cursor = 'pointer';

				// Create a container for SVG
				// const svgContainer = document.createElement('div');
				// svgContainer.style.cursor = 'pointer';
				// svgContainer.className = 'marker';
				// svgContainer.style.width = '50px';
				// svgContainer.style.height = '50px';
				// svgContainer.style.position = 'relative';

				// // Create SVG element
				// const svg = document.createElementNS(
				// 	'http://www.w3.org/2000/svg',
				// 	'svg',
				// );
				// svg.style.overflow = 'hidden';
				// svg.setAttribute('viewBox', '4.8878 5.6099 130 130');
				// svg.setAttribute('width', '62.092');
				// svg.setAttribute('height', '73.517');

				// // Create ellipse element
				// const ellipse = document.createElementNS(
				// 	'http://www.w3.org/2000/svg',
				// 	'ellipse',
				// );
				// ellipse.setAttribute('cx', '93.602');
				// ellipse.setAttribute('cy', '66.515');
				// ellipse.setAttribute('rx', '30.351');
				// ellipse.setAttribute('ry', '30.351');
				// ellipse.setAttribute(
				// 	'style',
				// 	'stroke: #13622a; stroke-width: 6px; fill: #fff;',
				// );

				// // Create path elements
				// const path1 = document.createElementNS(
				// 	'http://www.w3.org/2000/svg',
				// 	'path',
				// );
				// path1.setAttribute(
				// 	'd',
				// 	'M 93.228 108.65 C 94.776 110.522 67.77 96.027 62.825 74.35',
				// );
				// path1.setAttribute('style', 'stroke: #13622a; fill: #13622a');

				// const path2 = document.createElementNS(
				// 	'http://www.w3.org/2000/svg',
				// 	'path',
				// );
				// path2.setAttribute(
				// 	'd',
				// 	'M 63.209 72.998 C 74.003 110.29 122.582 104.207 124.91 70.755 C 125.06 72.201 123.067 92.899 92.689 109.681',
				// );
				// path2.setAttribute('style', 'stroke: #13622a; fill: #13622a');

				// // Create image element
				// const image = document.createElementNS(
				// 	'http://www.w3.org/2000/svg',
				// 	'image',
				// );
				// image.setAttributeNS(
				// 	'http://www.w3.org/1999/xlink',
				// 	'href',
				// 	feature.properties.image,
				// ); // Set image source
				// image.setAttribute('width', '60'); // Adjust image size as needed
				// image.setAttribute('height', '60'); // Adjust image size as needed
				// image.setAttribute('x', '64'); // Adjust x and y position to center the image within the white section of the path
				// image.setAttribute('y', '36'); // Adjust x and y position to center the image within the white section of the path

				// // Append ellipse and paths to SVG
				// svg.appendChild(ellipse);
				// svg.appendChild(path1);
				// svg.appendChild(path2);
				// // Append image to SVG
				// svg.appendChild(image);

				// // // Append SVG to container div
				// svgContainer.appendChild(svg);

				// 				const svgContainer = document.createElement('div');
				// 				svgContainer.className = 'marker';
				// svgContainer.style.width = '50px';
				// svgContainer.style.height = '50px';
				// svgContainer.style.position = 'relative';

				// // Create SVG element
				// const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				// svg.setAttribute('width', '100%');
				// svg.setAttribute('height', '100%');
				// svg.setAttribute('viewBox', '0 0 50 50'); // Adjust viewBox based on marker dimensions

				// // Create path for the marker shape
				// const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
				// path.setAttribute('d', 'M25 0C34 0 41.3 2.7 46.9 8.1 51.8 13.9 54.8 21.9 54.8 31.2c0 6.5-2.7 12.3-7.1 17.1-3.7 4.2-8.7 7.7-14.2 10.6-5.5-2.9-10.5-6.4-14.2-10.6-4.4-4.8-7.1-10.6-7.1-17.1 0-9.3 3-17.3 8.1-23.1C8.7 2.7 16 0 25 0zM25 7.8c-6.7 0-12.1 5.4-12.1 12.1 0 5.4 7.7 12.9 12.1 17 4.4-4.1 12.1-11.6 12.1-17C37.1 13.2 31.7 7.8 25 7.8z'); // Define the path for the marker shape
				// path.setAttribute('fill', '#fff'); // Set background color (change #fff to desired color)
				// path.setAttribute('stroke', '#000'); // Set border color
				// path.setAttribute('stroke-width', '1px'); // Set border width

				// // Append path to SVG
				// svg.appendChild(path);

				// // Create image element
				// const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
				// image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', feature.properties.image); // Set image source
				// image.setAttribute('width', '30'); // Adjust image size as needed
				// image.setAttribute('height', '30'); // Adjust image size as needed
				// image.setAttribute('x', '10'); // Adjust x and y position to center the image within the white section of the path
				// image.setAttribute('y', '10'); // Adjust x and y position to center the image within the white section of the path

				// // Append image to SVG
				// svg.appendChild(image);

				// // Append SVG to container
				// svgContainer.appendChild(svg);

				el.addEventListener('click', () => {
					setCurrent(index);
					window.alert(feature.properties.message);
				});

				// make a marker for each feature and add to the map
				new mapboxgl.Marker(el)
					.setLngLat(feature.geometry.coordinates)
					.addTo(map.current);
			}
		}
		if (data.length > 0 && map.current?.isStyleLoaded && !isMarkerSet) {
			addMarkersToMapBox(generateGEOJSONDataFromDispensaries(data));
			setIsMarkerSet(true);
		}
	}, [data]);

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
