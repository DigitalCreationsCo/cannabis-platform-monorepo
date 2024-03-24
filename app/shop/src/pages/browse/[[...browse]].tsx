import {
	selectBlogsByTag,
	selectBlogState,
	selectMarketPlaceDispensaries,
	selectSelectedLocationState,
	selectShopState,
	selectUserState,
	TextContent,
} from '@cd/core-lib';
import {
	Carousel,
	Grid,
	H1,
	H3,
	Page,
	type LayoutContextProps,
	FlexBox,
} from '@cd/ui-lib';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { DispensaryCard, InfoCard } from '../../components';
// import { shopTour } from '../../tour';

export default function MarketPlace() {
	const marketplaceData = useSelector(selectShopState);
	const { dispensaries } = marketplaceData;
	// const isLoadedDispensaries = marketplace.isSuccess || !marketplace.isLoading;

	const { user } = useSelector(selectUserState);
	// const selectedLocation = useSelector(selectSelectedLocationState);

	// const grasArticles = useSelector(selectBlogsByTag('gras'));
	// const articles = useSelector(selectBlogState);
	// const isLoadedArticles = articles.isSuccess || !articles.isLoading;

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

	console.info('dispensaries: ', dispensaries);
	return (
		<Page gradient="green" className="lg:px-0 pb-24 min-h-[510px]">
			<div className="cursor-default pt-2 md:pt-0">
				<div id={'shop-tour-step1'} className="">
					<H1 color="light" className={twMerge(styles.responsiveHeading)}>
						{TextContent.info.CANNABIS_DELIVERED}
					</H1>
					<H3 className="text-inverse px-4">
						Good day{user.firstName && `, ${user.firstName}`}!
					</H3>
				</div>
			</div>

			<FlexBox className="flex-row w-full p-4">
				<RenderMap />
			</FlexBox>

			{/* <H5 className="text-2xl px-8 lg:px-16">{`Gras delivers bud in ${
				selectedLocation.address.city || 'Baltimore'
			}`}</H5> */}

			<Grid className="w-full relative space-y-5">
				<Carousel
					settings={{ infinite: true }}
					data={dispensaries}
					datatype="dispensary"
					SliderComponent={DispensaryCard}
				/>
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

const RenderMap = () => {
	return (
		<iframe
			title="embed-map"
			className="w-full"
			height="250"
			width="250"
			style={{ border: 0 }}
			loading="eager"
			allowFullScreen
			referrerPolicy="no-referrer-when-downgrade"
			src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_EMBED_API_KEY}&q=New+York,NY&zoom=14`}
		></iframe>
	);
};
