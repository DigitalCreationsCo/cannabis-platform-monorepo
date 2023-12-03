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
} from '@cd/ui-lib';
// import { useEffect } from 'react';
import router from 'next/router';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { DispensaryCard, InfoCard } from '../../components';
// import { shopTour } from '../../tour';

export default function MarketPlace() {
	const marketplace = useSelector(selectShopState);
	const dispensaries = useSelector(selectMarketPlaceDispensaries);
	const isLoadedDispensaries = marketplace.isSuccess || !marketplace.isLoading;

	const selectedLocation = useSelector(selectSelectedLocationState);

	const { user } = useSelector(selectUserState);

	const grasArticles = useSelector(selectBlogsByTag('gras'));
	const articles = useSelector(selectBlogState);
	const isLoadedArticles = articles.isSuccess || !articles.isLoading;

	// function startShopTour() {
	// 	shopTour.start();
	// }

	// useEffect(() => {
	// 	if (!user.isSignUpComplete) startShopTour();
	// }, [user.isSignUpComplete]);

	const styles = {
		responsiveHeading: [
			'text-2xl md:text-4xl pb-0 px-4 lg:px-0 whitespace-normal font-semi-bold hidden sm:block',
		],
	};

	return (
		<Page gradient="pink" className="lg:px-0 pb-14">
			<div className="cursor-default pt-2 md:pt-0 lg:px-8 xl:w-5/12">
				<div id={'shop-tour-step1'} className="lg:w-fit">
					<H1 color="light" className={twMerge(styles.responsiveHeading)}>
						{TextContent.info.CANNABIS_DELIVERED}
					</H1>
					<H3 className="text-inverse px-4 ">
						Good day{user.firstName && `, ${user.firstName}`}!
					</H3>
				</div>
			</div>
			{/* <H5 className="text-2xl px-8 lg:px-16">{`Gras delivers bud in ${
				selectedLocation.address.city || 'Baltimore'
			}`}</H5> */}
			<Grid className="relative space-y-5">
				<Carousel
					startHidden={false}
					loading={!isLoadedDispensaries}
					infinite={process.env.NODE_ENV === 'development'}
					title={`Find Dispensaries In ${
						selectedLocation.address.city || 'Baltimore'
					}`}
					Component={DispensaryCard}
					data={dispensaries}
					dataKey={'dispensaries'}
					autoplaySpeed={6000}
					speed={90}
					skeletonNum={4}
				/>
				<Carousel
					startHidden={false}
					loading={!isLoadedArticles}
					Component={InfoCard}
					infinite={false}
					title={`What's New In Cannabis`}
					data={grasArticles}
					dataKey={'gras'}
					autoplaySpeed={5000}
					speed={90}
					skeletonNum={1}
				/>
				{/* <Carousel
          title={`Recommended Products`}
          Component={ProductItem}
          // data={dispensaries}
          // data={_dispensaryCardMockData[0]}
          data={_dispensaryCardMockData[0].products.map(product => product.variants[0])}
          dataKey="dispensary"
          autoplaySpeed={7000}
        /> */}

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
			</Grid>
		</Page>
	);
}

MarketPlace.getLayoutContext = (): LayoutContextProps => ({
	showSideNav: true,
	showHeader: false,
});
