import {
	getDashboardSite,
	// selectDispensaryState,
	// selectUserState,
	// TextContent,
} from '@cd/core-lib';
import {
	Button,
	Center,
	FlexBox,
	H1,
	H3,
	Page,
	Paragraph,
	SignInButton,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
// import Router from 'next/router';
import { type PropsWithChildren } from 'react';
import backdrop from '../../public/marijuana-backdrop.png';
// import { useAppSelector } from '../redux/hooks';

function DashboardStart() {
	// const { isSignedIn } = useAppSelector(selectUserState);
	// const { dispensary } = useAppSelector(selectDispensaryState);
	// if (isSignedIn) Router.push(TextContent.href.dashboard_f(dispensary.id));

	return (
		<ImageBackDrop src={backdrop}>
			<Page className="m-0 flex grow border-b bg-transparent p-0 md:p-0 lg:p-0">
				<Center className="space-y-4 m-auto">
					<FlexBox className="md:flex-row">
						<H3 className="whitespace-pre md:text-4xl" color="light">
							{`Welcome to `}
						</H3>
						<H1 color="light">Gras</H1>
					</FlexBox>
					<FlexBox className="items-center space-y-2">
						{/* <H5 color="light">Sign in to use this app</H5> */}
						<SignInButton size="lg" bg="primary" hover="primary-light" />
					</FlexBox>

					<FlexBox className="items-center space-y-2 pb-4">
						{/* <H3 color="light">{TextContent.account.ARE_YOU_A_DISPENSARY}</H3> */}
						<Link href={getDashboardSite('/signup/create-dispensary-account')}>
							<Button
								type="button"
								size="lg"
								bg="primary"
								transparent
								className="hover:bg-primary-light p-4"
							>
								<Paragraph color="light">
									{`Create a Dispensary account`}
								</Paragraph>
							</Button>
						</Link>
					</FlexBox>
				</Center>
			</Page>
		</ImageBackDrop>
	);
}

const ImageBackDrop = ({
	src,
	children,
}: { src: string | StaticImageData } & PropsWithChildren) => {
	return (
		<div className="relative flex h-full grow">
			<Image
				src={src}
				alt=""
				fill
				style={{
					zIndex: -1,
					objectFit: 'cover',
					objectPosition: '80% 40%',
				}}
				loading="eager"
				placeholder="blur"
				priority
			/>
			<div
				className="flex h-full grow"
				style={{
					zIndex: -1,
					backgroundColor: 'rgba(255,255,255,.14)',
					position: 'absolute',
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

export default DashboardStart;

DashboardStart.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showTopBar: true,
	showSideNav: false,
});
