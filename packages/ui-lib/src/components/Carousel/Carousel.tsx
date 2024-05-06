import { useRef } from 'react';
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
import { default as AliceCarousel } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CarouselButton from '@cd/ui-lib/src/components/Carousel/CarouselButton';
import { H4 } from '../Typography';

type CarouselItemComponent<DataType> = React.FC<{
	data: DataType;
	loading: boolean;
	current: boolean;
}>;

type CarouselProps<DataType> = {
	title?: string;
	items: any[];
	// error?: any;
	// loading: boolean;
	// data: DataType[];
	// datatype: string;
	// title?: string;
	// SliderComponent: CarouselItemComponent<DataType>;
	// settings?: Settings;
	// current: number;
	// setCurrent: React.Dispatch<React.SetStateAction<number>>;
	// onClick?: () => void;
};

// const data = [
// 	{
// 		id: 'bf346k4u7x2b2hhr6wsofppp',
// 		name: 'Gras',
// 		stripeAccountId: 'acct_1NtESYPZq3lkE1db',
// 		stripeOnboardingComplete: true,
// 		addressId: 'cluj5j1aq0011ysvyrndsmop8',
// 		dialCode: '1',
// 		phone: '5707901185',
// 		termsAccepted: false,
// 		subdomainId: 'gras',
// 		createdAt: '2024-04-03T01:50:53.594Z',
// 		updatedAt: '2024-04-03T01:50:53.594Z',
// 		showInMarketPlace: true,
// 		isSubscribedForDelivery: false,
// 		isSubscribedForPickup: false,
// 		isSubscribedForDailyDeals: false,
// 		subscriptionPlanId: '1',
// 		vendorId: '1',
// 		vendorName: 'gras',
// 		ecommerceUrl: 'https://localhost:9000',
// 		pos: 'none',
// 		inventory: 'none',
// 		metrcLicenseNumber: null,
// 		metrcUserKey: null,
// 		dutchieKey: null,
// 		weedmapsKey: null,
// 		blazeKey: null,
// 		address: {
// 			id: 'cluj5j1aq0011ysvyrndsmop8',
// 			street1: '123 W 33rd St',
// 			street2: '',
// 			city: 'New York',
// 			state: 'NY',
// 			zipcode: 10011,
// 			country: 'United States',
// 			countryCode: 'US',
// 			coordinateId: 'cluj5j1aq0012ysvyzlbzhp3t',
// 			createdAt: '2024-04-03T01:50:53.594Z',
// 			updatedAt: '2024-04-03T01:50:53.594Z',
// 			coordinates: {
// 				id: 'cluj5j1aq0012ysvyzlbzhp3t',
// 				latitude: 40.740851,
// 				longitude: -73.994265,
// 				radius: 10000,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 			},
// 		},
// 		images: [
// 			{
// 				id: 'cluj5j1aq0015ysvycd1tgv6o',
// 				location:
// 					'https://storage.cloud.google.com/fa7347ba6f76eacc-image-dispensary/gras/logo-small.png?authuser=3',
// 				alt: 'Gras',
// 				organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 				blurhash: 'LHEpchR5Bqazt.j@aeoM~Eo|IVad',
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 			},
// 		],
// 		products: [],
// 		siteSetting: {
// 			id: 'cluj5j1ar001hysvybfgh1n7u',
// 			title: 'Golden Nugget Dispensary',
// 			bannerText: 'Now delivering to your door',
// 			description: 'Best nuggets coast to coast',
// 			primaryColor: '#14a33d',
// 			secondaryColor: '#13622a',
// 			tertiaryColor: '#fff2da',
// 			textColor: '#a8a8a8',
// 			backgroundColor: '#ffffff',
// 			organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 			createdAt: '2024-04-03T01:50:53.594Z',
// 			updatedAt: '2024-04-03T01:50:53.594Z',
// 		},
// 		categoryList: {
// 			id: 'cluj5j1ar001jysvykypvlbqu',
// 			organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 			createdAt: '2024-04-03T01:50:59.666Z',
// 			updatedAt: '2024-04-03T01:50:59.666Z',
// 		},
// 		schedule: [
// 			{
// 				id: 'cluj5j1ar001aysvyf64c9ri5',
// 				days: null,
// 				day: 'Monday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 			},
// 			{
// 				id: 'cluj5j1ar001bysvy8ye4wr5a',
// 				days: null,
// 				day: 'Tuesday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 			},
// 			{
// 				id: 'cluj5j1ar001cysvylbhd5p0z',
// 				days: null,
// 				day: 'Wednesday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 			},
// 			{
// 				id: 'cluj5j1ar001dysvybkj54a81',
// 				days: null,
// 				day: 'Thursday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 			},
// 			{
// 				id: 'cluj5j1ar001eysvyaquprqup',
// 				days: null,
// 				day: 'Friday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 			},
// 			{
// 				id: 'cluj5j1ar001fysvy6nebh8cw',
// 				days: null,
// 				day: 'Saturday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 			},
// 			{
// 				id: 'cluj5j1ar001gysvyfj9ru85l',
// 				days: null,
// 				day: 'Sunday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wsofppp',
// 			},
// 		],
// 		subdomain: {
// 			id: 'gras',
// 			isValid: true,
// 			createdAt: '2024-04-03T01:50:53.594Z',
// 			updatedAt: '2024-04-03T01:50:53.594Z',
// 		},
// 	},
// 	{
// 		id: 'bf346k4u7x2b2hhr6wvgdddp',
// 		name: 'SunnySide',
// 		stripeAccountId: null,
// 		stripeOnboardingComplete: false,
// 		addressId: 'cluj5j2p7001nysvya9n04pc4',
// 		dialCode: '1',
// 		phone: '6663776778',
// 		termsAccepted: false,
// 		subdomainId: 'sunnyside',
// 		createdAt: '2024-04-03T01:50:53.594Z',
// 		updatedAt: '2024-04-03T01:50:53.594Z',
// 		showInMarketPlace: true,
// 		isSubscribedForDelivery: false,
// 		isSubscribedForPickup: false,
// 		isSubscribedForDailyDeals: false,
// 		subscriptionPlanId: '1',
// 		vendorId: '3',
// 		vendorName: 'sunnyside',
// 		ecommerceUrl: 'https://www.sunnyside.shop/store/lancaster-pa',
// 		pos: 'none',
// 		inventory: 'none',
// 		metrcLicenseNumber: null,
// 		metrcUserKey: null,
// 		dutchieKey: null,
// 		weedmapsKey: null,
// 		blazeKey: null,
// 		address: {
// 			id: 'cluj5j2p7001nysvya9n04pc4',
// 			street1: '1866 Fruitville Pike',
// 			street2: '',
// 			city: 'Lancaster',
// 			state: 'PA',
// 			zipcode: 17601,
// 			country: 'United States',
// 			countryCode: 'US',
// 			coordinateId: 'cluj5j2p7001oysvykk1k9u8a',
// 			createdAt: '2024-04-03T01:50:53.594Z',
// 			updatedAt: '2024-04-03T01:50:53.594Z',
// 			coordinates: {
// 				id: 'cluj5j2p7001oysvykk1k9u8a',
// 				latitude: 39.3077,
// 				longitude: -76.5958,
// 				radius: 10000,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 			},
// 		},
// 		images: [
// 			{
// 				id: 'cluj5j2p7001rysvyfbnti2sl',
// 				location:
// 					'https://storage.cloud.google.com/fa7347ba6f76eacc-image-dispensary/sunnyside/logo-small.png?authuser=3',
// 				alt: 'SunnySide',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 				blurhash: 'LVQuj9n$ozr=cZXTrqX9LNX9aJX9',
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 			},
// 		],
// 		products: [
// 			{
// 				id: '6',
// 				name: 'Magic Mountain Bush',
// 				description: 'helpful for your heart',
// 				features: 'fresh, relaxing',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 				rating: 5,
// 				tags: 'flower, og',
// 				createdAt: '2024-04-03T01:51:09.968Z',
// 				updatedAt: '2024-04-03T01:51:09.968Z',
// 				variants: [
// 					{
// 						id: '7',
// 						name: 'Magic Mountain Bush',
// 						sku: '1234567',
// 						organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 						organizationName: 'SunnySide',
// 						productId: '6',
// 						rating: 4.5,
// 						unit: 'g',
// 						size: 3.5,
// 						quantity: 3,
// 						basePrice: 6999,
// 						discount: 5,
// 						isDiscount: true,
// 						salePrice: 6499,
// 						currency: 'USD',
// 						stock: 5,
// 						createdAt: '2024-04-03T01:51:09.968Z',
// 						updatedAt: '2024-04-03T01:51:09.968Z',
// 					},
// 				],
// 				reviews: null,
// 				categories: [
// 					{
// 						id: '9',
// 						name: 'Flower',
// 						slug: 'flower',
// 						icon: 'Breakfast',
// 						createdAt: '2024-04-03T01:51:06.331Z',
// 						updatedAt: '2024-04-03T01:51:06.331Z',
// 					},
// 				],
// 			},
// 			{
// 				id: '7',
// 				name: 'Razmatazz',
// 				description: 'sweet and sour',
// 				features: 'fresh, relaxing',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 				rating: 4,
// 				tags: 'flower, og',
// 				createdAt: '2024-04-03T01:51:09.968Z',
// 				updatedAt: '2024-04-03T01:51:09.968Z',
// 				variants: [
// 					{
// 						id: '8',
// 						name: 'Razmatazz',
// 						sku: '1234567',
// 						organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 						organizationName: 'SunnySide',
// 						productId: '7',
// 						rating: 4.5,
// 						unit: 'g',
// 						size: 3.5,
// 						quantity: 3,
// 						basePrice: 6999,
// 						discount: 5,
// 						isDiscount: true,
// 						salePrice: 6499,
// 						currency: 'USD',
// 						stock: 5,
// 						createdAt: '2024-04-03T01:51:09.968Z',
// 						updatedAt: '2024-04-03T01:51:09.968Z',
// 					},
// 				],
// 				reviews: null,
// 				categories: [
// 					{
// 						id: '9',
// 						name: 'Flower',
// 						slug: 'flower',
// 						icon: 'Breakfast',
// 						createdAt: '2024-04-03T01:51:06.331Z',
// 						updatedAt: '2024-04-03T01:51:06.331Z',
// 					},
// 				],
// 			},
// 			{
// 				id: '8',
// 				name: 'Eagle cbd oil',
// 				description: 'Satisfying Liquid Goochy',
// 				features: 'fresh, relaxing',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 				rating: 2.5,
// 				tags: 'cbd, og',
// 				createdAt: '2024-04-03T01:51:09.968Z',
// 				updatedAt: '2024-04-03T01:51:09.968Z',
// 				variants: [],
// 				reviews: null,
// 				categories: [
// 					{
// 						id: '9',
// 						name: 'Flower',
// 						slug: 'flower',
// 						icon: 'Breakfast',
// 						createdAt: '2024-04-03T01:51:06.331Z',
// 						updatedAt: '2024-04-03T01:51:06.331Z',
// 					},
// 				],
// 			},
// 		],
// 		siteSetting: {
// 			id: 'cluj5j2p8001xysvyre2yjoxw',
// 			title: 'Sunnyside',
// 			bannerText: 'Sunnyside Banner Text',
// 			description: 'Sunnyside Description text',
// 			primaryColor: '#14a33d',
// 			secondaryColor: '#13622a',
// 			tertiaryColor: '#fff2da',
// 			textColor: '#a8a8a8',
// 			backgroundColor: '#ffffff',
// 			organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 			createdAt: '2024-04-03T01:50:53.594Z',
// 			updatedAt: '2024-04-03T01:50:53.594Z',
// 		},
// 		categoryList: null,
// 		schedule: [
// 			{
// 				id: 'cluj5j2p8001zysvy4p1d2u74',
// 				days: null,
// 				day: 'Monday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 			},
// 			{
// 				id: 'cluj5j2p80020ysvy9sp1y2c3',
// 				days: null,
// 				day: 'Tuesday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 			},
// 			{
// 				id: 'cluj5j2p80021ysvyktetw0of',
// 				days: null,
// 				day: 'Wednesday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 			},
// 			{
// 				id: 'cluj5j2p80022ysvyvhg4f9vy',
// 				days: null,
// 				day: 'Thursday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 			},
// 			{
// 				id: 'cluj5j2p80023ysvyqut5vt8h',
// 				days: null,
// 				day: 'Friday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 			},
// 			{
// 				id: 'cluj5j2p80024ysvyfz3qdtha',
// 				days: null,
// 				day: 'Saturday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 			},
// 			{
// 				id: 'cluj5j2p80025ysvyx9ychqgp',
// 				days: null,
// 				day: 'Sunday',
// 				openAt: 900,
// 				closeAt: 2100,
// 				createdAt: '2024-04-03T01:50:53.594Z',
// 				updatedAt: '2024-04-03T01:50:53.594Z',
// 				organizationId: 'bf346k4u7x2b2hhr6wvgdddp',
// 			},
// 		],
// 		subdomain: {
// 			id: 'sunnyside',
// 			isValid: true,
// 			createdAt: '2024-04-03T01:50:53.594Z',
// 			updatedAt: '2024-04-03T01:50:53.594Z',
// 		},
// 	},
// ];

export default function Carousel<D>({ items, title }: CarouselProps<D>) {
	const carousel = useRef<AliceCarousel>(null);
	return (
		<>
			<AliceCarousel
				// ref={carousel}
				// disableDotsControls
				// autoPlay
				// animationDuration={150}
				// autoPlayInterval={5000}
				// animationEasingFunction="linear"
				// disableButtonsControls
				// touchMoveDefaultEvents={false}
				// responsive={{
				// 	0: {
				// 		items: 1,
				// 		itemsFit: 'contain',
				// 	},
				// 	500: {
				// 		items: 2,
				// 		itemsFit: 'contain',
				// 	},
				// 	700: {
				// 		items: 3,
				// 		itemsFit: 'contain',
				// 	},
				// 	1100: {
				// 		items: 4,
				// 		itemsFit: 'contain',
				// 	},
				// 	1400: {
				// 		items: 5,
				// 		itemsFit: 'contain',
				// 	},
				// }}
				partialVisible
				sliderClass="border"
				itemClass="border"
				removeArrowOnDeviceType={['tablet', 'mobile']}
				renderArrowsWhenDisabled
				responsive={{
					superLargeDesktop: {
						breakpoint: { max: 4000, min: 1400 },
						items: 5,
						slidesToSlide: 4,
					},
					largeDesktop: {
						// the naming can be any, depends on you.
						breakpoint: { max: 1400, min: 1100 },
						items: 4,
						slidesToSlide: 3,
					},
					desktop: {
						breakpoint: { max: 1100, min: 700 },
						items: 3,
						slidesToSlide: 2,
					},
					tablet: {
						breakpoint: { max: 700, min: 464 },
						items: 2,
					},
					mobile: {
						breakpoint: { max: 464, min: 0 },
						items: 1,
						slidesToSlide: 1,
					},
				}}
			>
				{items}
			</AliceCarousel>
			{/* <div className="flex flex-row items-center justify-center">
				<div className="flex flex-row justify-center">
					<H4 className="float-left align-middle col-span-full px-7 pt-2 lg:!px-11 text-inverse-soft leading-2 drop-shadow text-left">
						{title}
					</H4>
					<CarouselButton
						className="btn-prev"
						direction="left"
						onClick={(e: any) => carousel?.current?.slidePrev(e)}
					/>
					<CarouselButton
						className="btn-next"
						direction="right"
						onClick={(e: any) => carousel?.current?.slideNext(e)}
					/>
				</div>
			</div> */}
		</>
	);
}
