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
import friends1 from '../../public/friends1.png';
import friends2 from '../../public/friends2.png';
import backdrop from '../../public/marijuana-backdrop.png';
import { FlowingBackDrop } from '../lib/FlowingBackDrop';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

function FriendsPictures() {
	return (
		<FlexBox className="absolute bottom-0 h-full w-full flex-row items-end justify-between overflow-hidden">
			<Image
				src={friends2}
				alt="friends of gras 2"
				loading="eager"
				placeholder="blur"
				priority
				className="-my-5 min-w-[500px] w-[700px] overflow-hidden opacity-60 xl:block"
			/>
			<Image
				src={friends1}
				alt="friends of gras"
				placeholder="blur"
				className="-my-5 hidden w-[500px] overflow-hidden opacity-60 xl:block"
			/>
		</FlexBox>
	);
}

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
			<FlexBox className="h-full w-full">
				<FlexBox
					className={twMerge(styles.HERO.container, 'anim8-green-gradient')}
				>
					<FlexBox className={twMerge(styles.HERO.content)}>
						<FlexBox className="my-4 space-y-4 md:space-x-8 lg:flex-row ">
							<FlexBox className="m-auto">
								<H1
									color="light"
									className={twMerge(styles.HERO.responsiveHeading)}
								>
									Cannabis,&nbsp;Delivered{'\xa0'}🌴
								</H1>
								<H4
									className="self-end font-bold pr-10 sm:text-3xl"
									color="light"
								>
									same day home delivery 🏠
								</H4>
							</FlexBox>
							{/* <FlexBox className="flex-row  space-x-1 border lg:flex-col lg:space-x-0">
								<H2 color="light" className="text-2xl lg:text-3xl">
									fast,
								</H2>
								<H2 color="light" className="text-2xl lg:text-3xl">
									easy,
								</H2>
								<H2 color="light" className="text-2xl lg:text-3xl">
									secure delivery
								</H2>
							</FlexBox> */}
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

				<FlowingBackDrop src={backdrop}>
					<FriendsPictures />

					<FlexBox
						className="bg-secondary m-auto grow space-y-2 pb-8 sm:py-4"
						style={{
							backgroundColor: 'rgba(0,120,0,0.8)',
							height: '100%',
							width: '100%',
							left: '0',
							top: '0',
						}}
					>
						{!isSignedIn && (
							<FlexBox
								className={twMerge(styles.about, 'self-center xl:self-center')}
							>
								<H4 className="text-xl">
									{TextContent.account.DISPENSARIES_START_HERE}!
								</H4>
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
						<FlexBox className="relative m-auto flex min-h-[380px] max-w-[480px]">
							<FlexBox className="mx-auto flex-row flex-wrap justify-center items-start space-x-2">
								<H3
									color="light"
									className="text-light max-w-[360px] whitespace-pre-line border-b border-transparent text-justify"
								>
									Welcome to Gras.{'\n'}
								</H3>
								<button
									className="hover:text-secondary-light cursor-pointer items-center pb-0.5 text-2xl hover:underline"
									onClick={() => setDialogOpen(true)}
								>
									<H3 className="underline">Who are we?</H3>
								</button>
							</FlexBox>
							<FlexBox className="chat chat-start h-full grow flex-row items-center px-2">
								<motion.div
									className="bg-primary mb-2 rounded-[20px]"
									animate={dialogOpen ? 'open' : 'closed'}
									transition={{ duration: 0.3 }}
									variants={{
										open: { opacity: 1, scale: 1 },
										closed: { opacity: 0.5, scale: 0.5 },
									}}
								>
									{dialogOpen && (
										<div className="text-light flex flex-col space-y-2 p-8">
											<Paragraph>
												Gras is a team of seasoned cannabis lovers providing a
												home-grown service within our communities.
												<br />
												Our mission is to elevate the voices of cannabis buyers
												and sellers through high quality service and support.
											</Paragraph>
											<Span className="mx-auto text-2xl font-bold">
												We welcome everyone 21 years or older.
											</Span>
										</div>
									)}
									{/* <motion.div
										animate={dialogOpen ? 'open' : 'closed'}
										variants={{
											open: { opacity: 1, scale: 1 },
											closed: { opacity: 1, scale: 0.8 },
										}}
										className={twMerge(
											dialogOpen ? 'block' : 'absolute',
											'chat-image top-10 md:top-0 text-6xl',
										)}
									>
										{dialogOpen ? '😄' : '😊'}
									</motion.div> */}
								</motion.div>
							</FlexBox>
						</FlexBox>
					</FlexBox>
				</FlowingBackDrop>
			</FlexBox>
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
				loading="eager"
				placeholder="blur"
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
