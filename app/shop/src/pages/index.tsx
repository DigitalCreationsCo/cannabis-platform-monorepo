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
	H2,
	H3,
	H4,
	Page,
	Paragraph,
	Span,
	styles,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { motion } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import backdrop from '../../public/marijuana-backdrop.png';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

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

	const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<Page className="bg-secondary text-light p-0 sm:p-0 md:p-0 lg:p-0">
			<ImageBackDrop src={backdrop}>
				<FlexBox className="h-full w-full">
					<FlexBox className={twMerge(styles.HERO.container)}>
						<FlexBox className={twMerge(styles.HERO.content)}>
							<FlexBox className="m-auto">
								<H1
									color="light"
									className={twMerge(styles.HERO.responsiveHeading)}
								>
									Cannabis,&nbsp;Delivered{'\xa0'}🌴
								</H1>
								<H3 className="self-end pr-10" color="light">
									to your home 🏠
								</H3>
							</FlexBox>
							<FlexBox className="flex-row space-x-1 md:flex-col md:space-x-0">
								<H2 color="light" className="text-2xl md:text-3xl">
									fast,
								</H2>
								<H2 color="light" className="text-2xl md:text-3xl">
									easy,
								</H2>
								<H2 color="light" className="text-2xl md:text-3xl">
									secure delivery
								</H2>
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
					<FlexBox
						className="bg-secondary m-auto grow space-y-2 py-4 pb-8"
						style={{
							backgroundColor: 'rgba(0,120,0,0.8)',
							height: '100%',
							width: '100%',
							left: '0',
							top: '0',
						}}
					>
						<FlexBox className="m-auto h-[280px] grow items-end md:w-[480px]">
							<FlexBox className="m-auto grow flex-row items-end space-x-2 ">
								<H4
									color="light"
									className="text-light max-w-[360px] whitespace-pre-line border-b border-transparent text-justify"
								>
									Welcome to Gras!{'\n'}
								</H4>
								<button
									className="cursor-pointer items-center pb-0.5 text-2xl hover:underline"
									onClick={() => setDialogOpen(true)}
								>
									<H4 className="underline">Who are we?</H4>
								</button>
							</FlexBox>
							<FlexBox className="m-auto flex-row">
								<div className="chat chat-start">
									<motion.div
										animate={dialogOpen ? 'open' : 'closed'}
										transition={{ duration: 0.5 }}
										variants={{
											open: { opacity: 1, scale: 1 },
											closed: { opacity: 1, scale: 1 },
										}}
										className="chat-image 
									text-6xl"
									>
										{dialogOpen ? '😄' : '😊'}
									</motion.div>
									<motion.div
										className="chat-bubble bg-primary mb-2"
										animate={dialogOpen ? 'open' : 'closed'}
										variants={{
											open: { opacity: 1, scale: 1 },
											closed: { opacity: 0, scale: 0.5 },
										}}
									>
										{dialogOpen && (
											<div className="text-inverse flex flex-col">
												<Paragraph>
													Gras is a team of seasoned cannabis lovers providing a
													home-grown service within our communities.
													<br />
													Our mission is to elevate the voices of cannabis
													buyers and sellers through high quality service and
													support.
												</Paragraph>
												<Span className="mx-auto font-bold">
													We welcome everyone 21 years or older.
												</Span>
											</div>
										)}
									</motion.div>
								</div>
							</FlexBox>
						</FlexBox>
						{!isSignedIn && (
							<FlexBox className={twMerge(styles.about)}>
								<H4 className="text-xl">{`Dispensaries, Sign Up Here!`}</H4>
								<Link
									href={getDashboardSite('/signup/create-dispensary-account')}
								>
									<Button
										size="lg"
										bg="primary"
										transparent
										className="hover:bg-primary-light p-4"
									>
										<Paragraph color="light">
											{TextContent.account.CREATE_DISPENSARY_ACCOUNT}
										</Paragraph>
									</Button>
								</Link>
							</FlexBox>
						)}
					</FlexBox>
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
			className="relative flex grow"
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

StartPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showTopBar: true,
});
export default StartPage;
