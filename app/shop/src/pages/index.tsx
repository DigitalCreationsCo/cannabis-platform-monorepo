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
	H6,
	Page,
	Paragraph,
	Span,
	styles,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { motion } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { useState, type PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';
import { twMerge } from 'tailwind-merge';
import backdrop from '../../public/marijuana-backdrop.png';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

function StartPage() {
	const { isSignedIn } = useAppSelector(selectUserState);

	const dispatch = useAppDispatch();
	const [cookies] = useCookies(['yesOver21']);

	function openCheckAgeModalOrEnterSite() {
		cookies['yesOver21'] === 'true'
			? router.push('/browse')
			: dispatch(
					modalActions.openModal({
						modalType: modalTypes.checkAgeModal,
						modalText: '',
					}),
			  );
	}

	const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<Page className="p-0 sm:p-0 md:p-0 lg:p-0">
			<ImageBackDrop src={backdrop}>
				<FlexBox className="w-full">
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
								<H2 color="light">fast</H2>
								<H2 color="light">easy</H2>
								<H2 color="light">secure</H2>
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
						className="bg-secondary m-auto space-y-2 py-4 pb-8"
						style={{
							backgroundColor: 'rgba(0,120,0,0.8)',
							height: '100%',
							width: '100%',
							left: '0',
							top: '0',
						}}
					>
						<FlexBox className="m-auto md:w-[480px]">
							<FlexBox className="m-auto flex-row items-end space-x-2">
								<H6
									color="light"
									className="text-light max-w-[360px] whitespace-pre-line border-b border-transparent text-justify"
								>
									Welcome to Gras!{'\n'}
								</H6>
								<button
									className="cursor-pointer text-2xl hover:underline"
									onClick={() => setDialogOpen(true)}
								>
									Who are we?
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
										className="chat-bubble bg-primary"
										animate={dialogOpen ? 'open' : 'closed'}
										variants={{
											open: { opacity: 1, scale: 1 },
											closed: { opacity: 0, scale: 0.5 },
										}}
									>
										{dialogOpen && (
											<>
												We are team of cannabis lovers providing a home-grown
												service for our community. We are help to elevate the
												voices of the cannabis community through high quality
												service and support.
												<br />
												<Span className="mx-auto font-bold">
													We welcome everyone 21 years or older.
												</Span>
											</>
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
