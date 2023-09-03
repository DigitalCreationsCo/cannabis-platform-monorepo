import {
	selectBlogState,
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
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { DispensaryCard, InfoCard } from '../../components';
// import { shopTour } from '../../tour';

export default function MarketPlace() {
	const { dispensaries } = useSelector(selectShopState);
	const selectedLocation = useSelector(selectSelectedLocationState);
	const { user } = useSelector(selectUserState);
	const { news } = useSelector(selectBlogState);

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
		<Page gradient="pink" className="lg:px-0">
			<div className="cursor-default pt-2 md:pt-0 lg:px-8 xl:absolute xl:w-5/12">
				<div className="lg:w-fit xl:m-auto">
					<H1 color="light" className={twMerge(styles.responsiveHeading)}>
						{TextContent.info.CANNABIS_DELIVERED}
					</H1>
					<H3 className="text-inverse px-4 ">
						Good day{user.firstName && `, ${user.firstName}`}!
					</H3>
				</div>
			</div>
			<Grid className="relative space-y-5">
				<Carousel
					Component={InfoCard}
					title={'Gras is now delivering in Baltimore!'}
					titleSize="lg"
					data={news}
					dataKey="news"
					autoplaySpeed={5000}
					speed={10000}
				/>

				<Carousel
					title={`Dispensaries Near You ( ${selectedLocation.address.city} )`}
					Component={DispensaryCard}
					data={dispensaries}
					dataKey="dispensary"
					autoplaySpeed={7000}
					speed={1000}
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
	showHeader: false,
});
