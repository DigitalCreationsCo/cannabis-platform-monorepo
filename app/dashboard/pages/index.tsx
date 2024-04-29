import { getDashboardSite } from '@cd/core-lib';
import {
	Button,
	Center,
	FlexBox,
	H1,
	H3,
	Page,
	SignInButton,
	type LayoutContextProps,
  Footer,
} from '@cd/ui-lib';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ReactElement, type PropsWithChildren } from 'react';
import backdrop from '../public/marijuana-backdrop.png';
import DashboardTopBar from '@/components/layouts/DashboardTopBar';

export default function DashboardHome() {
	return (
		<Page className="m-0 flex grow border-b bg-transparent p-0 md:p-0 lg:p-0 h-[666px]">
			<ImageBackDrop src={backdrop}>
				<Center className="space-y-4 m-auto">
					<FlexBox className="">
						<H1 color="light" className='tracking-normal'>Welcome to Gras</H1>
						<H3 className="whitespace-pre md:text-4xl tracking-normal" color="light">
							Dispensary Success Services
						</H3>
					</FlexBox>
					<FlexBox className="items-center space-y-2">
						{/* <H5 color="light">Sign in to use this app</H5> */}
						<SignInButton size="lg" bg="primary" hover="primary-light" />
					</FlexBox>

					<FlexBox className="items-center space-y-2 pb-4">
						{/* <H3 color="light">{TextContent.account.ARE_YOU_A_DISPENSARY}</H3> */}
						<Link href="/auth/join">
							<Button
								type="button"
								size="lg"
								bg="primary"
								transparent
								className="hover:bg-primary-light p-4"
							>
								{`Create a Dispensary account`}
							</Button>
						</Link>
					</FlexBox>
				</Center>
			</ImageBackDrop>
		</Page>
	);
}

const ImageBackDrop = ({
	src,
	children,
}: { src: string | StaticImageData } & PropsWithChildren) => {
	return (
		<div className="relative flex w-full h-full grow">
			<Image
				src={src}
				alt=""
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					zIndex: -1,
					objectFit: 'cover',
					objectPosition: '80% 40%',
				}}
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


DashboardHome.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showTopBar: true,
	showSideNav: false,
});

DashboardHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
	<DashboardTopBar />
      {page}
      <Footer />
    </>
  );
};