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
	FlexBox,
	H1,
	H2,
	H4,
	Page,
	Paragraph,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
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
		<Page className="bg-secondary text-light p-0 sm:p-0 md:p-0 lg:p-0 h-[666px]">
			<ImageBackDrop video={friendsVideo}>
				<FlexBox className="h-full w-full">
					<FlexBox
						className="m-auto grow space-y-2"
						style={{
							height: '100%',
							width: '100%',
							left: '0',
							top: '0',
						}}
					>
						<FlexBox className="flex p-4 px-8 lg:px-20 grow w-full space-x-2">
							<H1
								color="light"
								className="text-4xl sm:text-4xl lg:text-6xl whitespace-pre-line border-b border-transparent text-inverse w-lg font-semibold tracking-wide"
							>
								{TextContent.info.SAME_DAY_DELIVERY}&nbsp;🌴
							</H1>

							{!isSignedIn && (
								<FlexBox
									className={twMerge('hidden sm:block items-center pt-2')}
								>
									<H4 className="text-center font-normal">
										{TextContent.account.DISPENSARIES_START_HERE}
									</H4>
									<Link
										href={getDashboardSite('/signup/create-dispensary-account')}
									>
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
							{
								<div className="flex grow self-center">
									<Button
										size="lg"
										bg="primary"
										transparent
										className="uppercase hover:bg-primary-light p-8 self-end"
										onClick={openCheckAgeModalOrEnterSite}
									>
										<H2 className="font-bold">
											{TextContent.info.ENJOY_BUD_WITH_YOUR_BUDS}
										</H2>
									</Button>
								</div>
							}
						</FlexBox>
					</FlexBox>
				</FlexBox>
			</ImageBackDrop>
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
					backgroundColor: 'rgba(20,100,20,0.24)',
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

StartPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showTopBar: true,
});
export default StartPage;
