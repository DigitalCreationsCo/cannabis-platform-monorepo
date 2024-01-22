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
	H3,
	H4,
	IconWrapper,
	Page,
	Paragraph,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Icons from '@cd/ui-lib/src/icons';
import { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import ContinueSignUp from 'components/form/ContinueSignUp';
import friendsVideo from '../../public/Gras-community-clip.mp4';

function StartPage() {
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
		<Page className="bg-secondary text-light p-0 sm:p-0 md:p-0 lg:p-0">
			{/* <ImageBackDrop video={friendsVideo}></ImageBackDrop> */}
			<FlexBox className="mx-auto flex p-4 px-8 md:px-20 w-full space-x-2 items-center space-y-2 lg:space-y-8">
				<div className="flex flex-col self-center text-center lg:py-4">
					<H1
						color="light"
						className="mx-auto text-center text-[1.5rem] md:text-[2rem] lg:text-[3rem] whitespace-pre-line overflow-x-visible border-b border-transparent text-inverse w-lg font-semibold tracking-wide"
					>
						{/* {TextContent.info.SAME_DAY_DELIVERY}&nbsp;🌴 */}
						{TextContent.info.TOP_SHELF_CANNABIS_DELIVERED_DAILY}&nbsp;🌴
					</H1>
					{/* <Button
										size="lg"
										bg="primary"
										transparent
										className="uppercase hover:bg-primary-light p-8 self-end"
										onClick={openCheckAgeModalOrEnterSite}
									> */}
					<H3 className="text-xl md:text-2xl lg:text-4xl">
						{TextContent.info.ENJOY_BUD_WITH_YOUR_BUDS}
					</H3>
					{/* </Button> */}
				</div>
				<div className="mx-auto items-center self-center">
					<video
						className="w-full lg:max-w-3xl 2xl:max-w-5xl"
						style={{
							// position: 'absolute',
							aspectRatio: 'auto',
							// width: '100%',
							// height: '100%',
							// zIndex: -1,
							objectFit: 'cover',
							objectPosition: '40% 40%',
							left: '0',
							top: '0',
						}}
						src={friendsVideo}
						autoPlay
						loop
						muted
					/>
				</div>
				<HowItWorks />
			</FlexBox>
			<SignUpForm />

			<div className="w-full px-8 md:px-16 lg:w-4/5 mx-auto py-20">
				<hr className="border-2" />
			</div>
			{!isSignedIn && (
				<FlexBox className={twMerge('hidden sm:block py-2 w-fit mx-auto')}>
					<H4 className="text-center font-normal">
						{TextContent.account.DISPENSARIES_START_HERE}
					</H4>
					<Link href={getDashboardSite('/signup/create-dispensary-account')}>
						<Button
							bg="primary"
							transparent
							className="hover:bg-primary-light px-4"
						>
							<Paragraph color="light">
								{TextContent.account.CREATE_DISPENSARY_ACCOUNT}
							</Paragraph>
						</Button>
					</Link>
				</FlexBox>
			)}
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
		<div className="text-xl pt-4 pb-6">
			<FlexBox className="w-full md:w-full lg:px-20 md:flex-row justify-center gap-8 lg:gap-12 pb-6 mx-auto text-xl">
				<FlexBox className="md:max-w-[300px] xl:max-w-[240px] 2xl:max-w-[320px] flex-row md:flex-col items-center gap-4 text-center">
					<IconWrapper
						Icon={Icons.MobileAdd}
						iconSize={window.innerWidth < 1000 ? 60 : 76}
					/>
					<Paragraph className="xl:text-2xl">
						Sign up below for free and get a daily deal via text message.
					</Paragraph>
				</FlexBox>
				<FlexBox className="md:max-w-[300px] xl:max-w-[240px] 2xl:max-w-[320px] flex-row md:flex-col items-center gap-4 text-center">
					<IconWrapper
						Icon={Icons.MobileCheck}
						iconSize={window.innerWidth < 1000 ? 60 : 76}
					/>
					<Paragraph className="lg:text-2xl">
						If interested just reply with the number of packs you want.
					</Paragraph>
				</FlexBox>
				<FlexBox className="md:max-w-[300px] xl:max-w-[240px] 2xl:max-w-[320px] flex-row md:flex-col items-center gap-4 text-center">
					<IconWrapper
						Icon={Icons.MobilityServices}
						iconSize={window.innerWidth < 1000 ? 60 : 76}
					/>
					<Paragraph className="lg:text-2xl">
						Your weed will be delivered to your doorstep the same day.*
					</Paragraph>
				</FlexBox>
			</FlexBox>
			<div>
				<Paragraph className="text-center ">
					* {TextContent.info.TIME_GUARANTEE}
				</Paragraph>
			</div>
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
		<Card className="!rounded w-11/12 mx-auto text-dark text-center lg:!py-12">
			<H4>SIGN UP BELOW</H4>
			<Paragraph className="font-semibold text-xl pt-4">
				We'll send you a daily deal via text message with great deals on good
				weed.
			</Paragraph>
			<Paragraph className="mx-auto pt-2">
				<Button
					onClick={openLoginModal}
					bg="transparent"
					hover="transparent"
					className="underline self-center text-blue-700"
				>
					(Already A Member? Sign In)
				</Button>
			</Paragraph>
			<ContinueSignUp />
		</Card>
	);
};

StartPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showTopBar: true,
});
export default StartPage;
