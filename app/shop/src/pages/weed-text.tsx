import {
	getDashboardSite,
	modalActions,
	modalTypes,
	selectUserState,
	TextContent,
	useAppDispatch,
	useAppSelector,
} from '@cd/core-lib';
import {
	Button,
	Card,
	FlexBox,
	H1,
	H2,
	H5,
	IconWrapper,
	Page,
	Paragraph,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Icons from '@cd/ui-lib/src/icons';
import { type StaticImageData } from 'next/image';
import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import ContinueSignUp from 'components/form/ContinueSignUp';

function WeedTextSignUp() {
	const { isSignedIn } = useAppSelector(selectUserState);
	const dispatch = useAppDispatch();

	function openCheckAgeModalOrEnterSite() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.checkAgeModal,
				modalText: '',
			}),
		);
	}

	return (
		<Page
			className={twMerge(
				styles.gradient,
				'text-light p-0 sm:p-0 md:p-0 lg:p-0 !border-none',
			)}
		>
			{/* <ImageBackDrop video={friendsVideo}></ImageBackDrop> */}
			<FlexBox className="mx-auto flex p-4 px-8 md:px-20 w-full space-x-2 items-center space-y-8 lg:space-y-8">
				<div className="flex flex-col self-center text-center lg:py-2">
					<H1 className="text-[1.4rem] md:text-4xl text-light mx-auto text-center whitespace-pre-line overflow-x-visible border-b border-transparent w-lg font-semibold tracking-wide">
						{/* {TextContent.info.SAME_DAY_DELIVERY}&nbsp;🌴 */}
						{/* {TextContent.info.TOP_SHELF_CANNABIS_DELIVERED_DAILY}&nbsp;🌴 */}
						We Deliver Top-Shelf Cannabis Daily&nbsp;🌴
					</H1>
					{/* <Button
										size="lg"
										bg="primary"
										transparent
										className="uppercase hover:bg-primary-light p-8 self-end"
										onClick={openCheckAgeModalOrEnterSite}
									> */}
					<H2 className="text-[1.2rem] md:text-3xl">
						{/* {TextContent.info.ENJOY_BUD_WITH_YOUR_BUDS} */}
						{/* So You Can Enjoy Bud With Your Buds */}
						Enjoy Bud With Your Buds
					</H2>
					{/* </Button> */}
				</div>

				<HowItWorks />
			</FlexBox>

			<SignUpForm />

			{/* <div className="px-8 w-5/6 mx-auto pt-20">
				<hr className="border-2" />
			</div>
			{!isSignedIn && (
				<FlexBox
					className={twMerge('hidden sm:block py-2 w-fit mx-auto mt-16')}
				>
					<H5 className="text-center font-normal">
						{TextContent.account.DISPENSARIES_START_HERE}
					</H5>
					<Link href={getDashboardSite('/signup/create-dispensary-account')}>
						<Button
							bg="primary"
							transparent
							className="hover:bg-primary-light m-2 px-4 mx-auto"
						>
							<Paragraph className="text-md">
								{TextContent.account.CREATE_DISPENSARY_ACCOUNT}
							</Paragraph>
						</Button>
					</Link>
				</FlexBox>
			)} */}
		</Page>
	);
}

const ImageBackDrop = ({
	video,
	src,
	children,
}: { video?: any; src?: string | StaticImageData } & PropsWithChildren) => {
	return (
		<div
			className="relative flex w-full grow"
			style={{
				clipPath: 'inset(0 0 0 0)',
			}}
		>
			<video
				style={{
					position: 'absolute',
					aspectRatio: 'auto',
					width: '100%',
					height: '100%',
					zIndex: -1,
					objectFit: 'cover',
					objectPosition: '40% 40%',
					left: '0',
					top: '0',
				}}
				src={video}
				autoPlay
				loop
				muted
			/>
			<div
				style={{
					zIndex: -1,
					backgroundColor: 'rgba(20,100,20,0.13)',
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

const HowItWorks = () => {
	return (
		<div className="py-8 md:pt-2">
			<FlexBox className="w-full md:w-full lg:px-20 sm:flex-row justify-center gap-8 mx-auto text-xl">
				<FlexBox className="md:max-w-[180px] xl:max-w-[240px] 2xl:max-w-[240px] flex-row sm:flex-col items-center gap-4 text-center">
					<IconWrapper
						Icon={Icons.MobileAdd}
						iconSize={window.innerWidth < 1000 ? 48 : 60}
					/>
					<Paragraph className="text-md md:text-lg">
						Sign up below for free and get a daily deal via text message.
					</Paragraph>
				</FlexBox>
				<FlexBox className="md:max-w-[180px] xl:max-w-[240px] 2xl:max-w-[240px] flex-row sm:flex-col items-center gap-4 text-center">
					<IconWrapper
						Icon={Icons.MobileCheck}
						iconSize={window.innerWidth < 1000 ? 48 : 60}
					/>
					<Paragraph className="text-md md:text-lg">
						If interested just reply with the number of packs you want.
					</Paragraph>
				</FlexBox>
				<FlexBox className="md:max-w-[180px] xl:max-w-[240px] 2xl:max-w-[240px] flex-row sm:flex-col items-center gap-4 text-center">
					<IconWrapper
						Icon={Icons.MobilityServices}
						iconSize={window.innerWidth < 1000 ? 48 : 60}
					/>
					<Paragraph className="text-md md:text-lg">
						{/* Your weed will be delivered to your doorstep the same day.* */}
						Your weed will be delivered to your doorstep the same day.
					</Paragraph>
				</FlexBox>
			</FlexBox>
			{/* <div>
				<Paragraph className="text-center">
					* {TextContent.info.TIME_GUARANTEE}
				</Paragraph>
			</div> */}
		</div>
	);
};

const SignUpForm = () => {
	const dispatch = useAppDispatch();
	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			}),
		);
	}

	return (
		<Card className="!rounded w-3/4 md:!w-2/3 lg:max-w-[800px] mx-auto text-dark text-center lg:!py-8">
			<H5>SIGN UP BELOW</H5>
			<H5 className="pt-2">
				We'll send you a daily deal via text message with great deals on good
				weed.
			</H5>
			<Button
				onClick={openLoginModal}
				bg="transparent"
				hover="transparent"
				className="underline self-center text-blue-700"
			>
				(Already A Member? Sign In)
			</Button>
			<ContinueSignUp />
		</Card>
	);
};

WeedTextSignUp.getLayoutContext = (): LayoutContextProps => ({
	showTopBar: true,
});
export default WeedTextSignUp;

const styles = {
	gradient: [
		'bg-gradient-to-b',
		'from-10%',
		'from-secondary-light',
		'to-secondary',
		'p-0 lg:p-16 h-max',
	],
};
