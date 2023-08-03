import {
	getDashboardSite,
	modalActions,
	modalTypes,
	selectUserState,
	TextContent,
} from '@cd/core-lib';
import {
	Button,
	FlexBox,
	H1,
	H4,
	H6,
	Page,
	Paragraph,
	Span,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { useEffect, type PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';
import { twMerge } from 'tailwind-merge';
import backdrop from '../../public/marijuana-backdrop.png';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { shopTour } from '../tour/shopTour';

function LandingPage() {
	const { isSignedIn, user } = useAppSelector(selectUserState);

	function startShopTour() {
		shopTour.start();
	}

	useEffect(() => {
		if (!user.isSignUpComplete) startShopTour();
	}, [user.isSignUpComplete]);

	const dispatch = useAppDispatch();
	const [cookies] = useCookies(['yesOver21']);

	function openCheckAgeModalOrEnterSite() {
		cookies['yesOver21'] === 'true'
			? router.push('/browse')
			: dispatch(
					modalActions.openModal({
						modalType: modalTypes.checkAgeModal,
						modalText: '',
					})
			  );
	}

	const styles = {
		hero: [
			'w-full pt-4 pb-6 md:pt-4 px-4 md:px-14 lg:px-32',
			'justify-center',
			'opacity-80',
			'anim8-green-gradient',
		],
		heroContent: [
			'mx-auto',
			'md:flex-row items-start',
			'space-y-4 md:space-y-0 md:space-x-8',
		],
		responsiveHeading: [
			'text-2xl md:text-4xl pb-0 whitespace-normal font-semi-bold',
		],
		about: [
			'bg-inverse opacity-90 md:rounded ',
			'space-y-2',
			'mx-auto',
			'cursor-default w-full md:max-w-[440px] h-fit p-8 items-center shadow',
		],
	};

	return (
		<Page className="p-0 sm:p-0 md:p-0 lg:p-0">
			<ImageBackDrop src={backdrop}>
				<FlexBox className="w-full md:space-y-8 md:pb-8">
					<FlexBox className={twMerge(styles.hero)}>
						<FlexBox className={twMerge(styles.heroContent)}>
							<FlexBox className="m-auto">
								<H1
									color="light"
									className={twMerge(
										styles.responsiveHeading
									)}
								>
									Cannabis,&nbsp;Delivered{'\xa0'}🌴
								</H1>
								<H6 className="text-light w-full max-w-[360px] whitespace-pre-line text-justify">
									Welcome to Gras. {'\n'}
									We are team of cannabis lovers providing a
									home-grown service in our community. We
									serve by empowering the voices of our
									community through clarity and support.{' '}
									{'\n'}
									<Span className="m-auto text-center font-bold">
										We welcome everyone 21 years or older.
									</Span>
								</H6>
							</FlexBox>
							<Button
								size="lg"
								bg="secondary"
								transparent
								className="hover:bg-primary-light"
								onClick={openCheckAgeModalOrEnterSite}
							>
								Enter
							</Button>
						</FlexBox>
					</FlexBox>
					{!isSignedIn && (
						<FlexBox className={twMerge(styles.about)}>
							<FlexBox className="m-auto items-center space-y-2">
								<H4 className="text-xl">{`Dispensaries, Sign Up Here!`}</H4>
								<Link
									href={getDashboardSite(
										'/signup/create-dispensary-account'
									)}
								>
									<Button
										size="lg"
										bg="primary"
										transparent
										className="hover:bg-primary-light p-4"
									>
										<Paragraph color="light">
											{
												TextContent.account
													.CREATE_DISPENSARY_ACCOUNT
											}
										</Paragraph>
									</Button>
								</Link>
							</FlexBox>
						</FlexBox>
					)}
				</FlexBox>
			</ImageBackDrop>
		</Page>
	);
}

const ImageBackDrop = ({
	src,
	children,
}: { src: string | StaticImageData } & PropsWithChildren) => {
	return (
		<div
			className="flex grow"
			style={{
				clipPath: 'inset(0 0 0 0)',
			}}
		>
			<Image
				priority
				src={src}
				alt=""
				fill
				style={{
					zIndex: -1,
					objectFit: 'cover',
					objectPosition: '44% 20%',
				}}
			/>
			<div
				style={{
					zIndex: -1,
					backgroundColor: 'rgba(0,0,0,0.4)',
					position: 'fixed',
					height: '100%',
					width: '100%',
					left: '0',
					top: '0',
				}}
			></div>
			{children}
		</div>
	);
};

LandingPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showTopBar: true,
});
export default LandingPage;

{
	/* <FlexBox className={twMerge(styles.about)}>
                        <H3 className='text-secondary'>Welcome to Gras</H3>
                        <Paragraph>Gras is a home-grown service provider for cannabis lovers.
                            We are serving our cannabis communities by providing a service 
                            as a bridge of communication, clarity and support.
                        </Paragraph>

                        {!isSignedIn && <FlexBox className='m-auto items-center space-y-2'>
                            <H4 className='text-xl'>
                            {`Dispensaries, Sign Up Here!`}</H4>
                            <Link href="/signup/create-dispensary-account">
                                <Button size="lg" 
                                bg="primary" 
                                transparent
                                className="p-4 hover:bg-primary-light"
                                >
                                <Paragraph color="light">
                                    {`Create a dispensary account`}</Paragraph>
                                </Button>
                            </Link>
                        </FlexBox>}
                    </FlexBox> */
}
