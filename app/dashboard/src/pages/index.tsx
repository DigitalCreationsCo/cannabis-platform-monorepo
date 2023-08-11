import { getDashboardSite, TextContent } from '@cd/core-lib';
import {
	Button,
	Center,
	FlexBox,
	H1,
	H3,
	H5,
	Page,
	Paragraph,
	SignInButton,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { type PropsWithChildren } from 'react';
import backdrop from '../../public/marijuana-backdrop.png';

function WelcomePage() {
	return (
		<ImageBackDrop src={backdrop}>
			<Page className="m-0 border-b bg-transparent p-0 md:p-0 lg:p-0">
				<Center className="space-y-2">
					<FlexBox className="items-center">
						<FlexBox className="md:flex-row">
							<H3 className="whitespace-pre md:text-4xl" color="light">
								{`Welcome to `}
							</H3>
							<H1 color="light">Gras</H1>
						</FlexBox>
						<H5 color="light">Sign in to use this app</H5>
						<SignInButton size="lg" bg="primary" hover="primary-light" />
					</FlexBox>

					<FlexBox className="items-center pb-4">
						<H5 color="light">{TextContent.account.ARE_YOU_A_DISPENSARY}</H5>
						<Link href={getDashboardSite('/signup/create-dispensary-account')}>
							<Button
								size="lg"
								bg="primary"
								transparent
								className="hover:bg-primary-light p-4"
							>
								<Paragraph color="light">
									{`Create a dispensary account`}
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
		<div className="relative flex h-full grow border">
			<Image
				src={src}
				alt=""
				fill
				style={{
					zIndex: -1,
					objectFit: 'cover',
					objectPosition: '80% 20%',
				}}
				priority
			/>
			<div
				className="flex h-full grow"
				style={{
					zIndex: -1,
					backgroundColor: 'rgba(0,0,0,0.4)',
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

export default WelcomePage;

WelcomePage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showTopBar: true,
	showSideNav: false,
});
