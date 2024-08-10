import {
	getDashboardSite,
	getShopSite,
	replaceRelativePath,
	TextContent,
} from '@cd/core-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/assets/images/logo.png';
import { styles } from '../styleClassNames';
import CopyRight from './CopyRight';
import FlexBox from './FlexBox';
import Grid from './Grid';
import { GrasSignature, H6, Paragraph } from './Typography';

export default function Footer({
	className,
}: {
	className?: string | string[];
}) {
	const navigation = [
		{
			name: TextContent.account.CREATE_DISPENSARY_ACCOUNT,
			href: getDashboardSite('/auth/join'),
		},
		{ name: 'Services', href: TextContent.href.services },
		{ name: 'Support', href: getDashboardSite(TextContent.href.support) },
		{ name: 'About Gras', href: getShopSite(TextContent.href.about) },
	];
	const legal = [
		// {
		// 	name: 'Frequently Asked Questions',
		// 	href: getShopSite(TextContent.href.faq),
		// },
		// { name: 'Help Center', href: getShopSite(TextContent.href.help) },
		{
			name: 'Terms and Conditions',
			href: TextContent.href.terms,
		},
		{ name: 'Privacy Policy', href: TextContent.href.privacy },
		// { name: 'Compliance', href: getShopSite(TextContent.href.compliance) },
		// {
		// 	name: 'User Terms and Conditions',
		// 	href: getShopSite(TextContent.href.user_tos),
		// },
		// {
		// 	name: 'Delivery Terms and Conditions',
		// 	href: getShopSite(TextContent.href.driver_tos),
		// },
		{ name: 'Blog', href: getShopSite(TextContent.href.blog) },
	];

	return (
		<FlexBox
			className={twMerge(
				styles.FOOTER.container,
				'text-inverse-soft',
				className
			)}
		>
			<Grid className="overflow-x-hidden w-[277px] mx-auto mt-8 sm:mt-20 md:mt-5 grid md:w-3/4 max-w-screen-lg pb-16 lg:pb-0 grid-rows-auto gap-6 md:gap-10 lg:gap-4 md:grid-cols-4 lg:grid-cols-6 overflow-visible">
				<div className="col-span-2">
					<div className="flex w-full flex-col flex-wrap md:ml-0">
						{navigation.map((item, index) => (
							<FooterLink key={index} {...item} />
						))}
					</div>
				</div>
				<div className="col-span-2">
					<div className="flex-col flex w-full flex-wrap lg:ml-0">
						{legal.map((item, index) => (
							<FooterLink key={index} {...item} />
						))}
					</div>
				</div>
				<div className="col-span-2 md:!col-span-4 lg:!col-span-2 md:!row-start-2 lg:!row-start-1 md:!col-start-1 lg:!col-start-5 row-span-3">
					<FlexBox className="pb-4 justify-center flex-row items-center">
						<Link
							href={getShopSite('/')}
							//  className="z-10">
							className={twMerge(
								'z-10 flex flex-row gap-x-4 items-center',
								styles.shadow.logoShadow
							)}
						>
							<GrasSignature className="text-inverse pt-1 pb-0 mb-0 leading-3">
								Gras
							</GrasSignature>
							<Image
								alt="Gras"
								className="w-[36px] bg-inverse rounded-full"
								src={logo}
								quality={25}
							/>
						</Link>
					</FlexBox>

					<FlexBox className="mt-2 flex-row justify-center gap-x-8 text-inverse">
						<a
							href="https://twitter.com/gras_cannabis"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-light"
						>
							<span className="sr-only">Twitter</span>
							<Twitter />
						</a>
						<a
							href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61553103098585"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-light"
						>
							<span className="sr-only">Facebook</span>
							<Facebook />
						</a>
						<a
							href="https://www.instagram.com/grascannabis/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-light"
						>
							<span className="sr-only">Instagram</span>
							<Instagram />
						</a>
						<a
							href="https://www.linkedin.com/company/gras-delivery/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-light"
						>
							<span className="sr-only">Linkedin</span>
							<Linkedin />
						</a>
					</FlexBox>

					<FlexBox className="mt-6 mx-auto max-w-sm md:font-medium">
						<Paragraph>
							{TextContent.info.ABOUT_GRAS_2}
							{TextContent.info.GRAS_MISSION_3}
						</Paragraph>
						<CopyRight className="md:font-medium" />
					</FlexBox>
				</div>
				<div className="w-full row-start-1 md:!row-start-5 md:!col-start-1 lg:!row-start-4 lg:!col-start-5 col-span-2 md:col-span-full">
					<Paragraph
						color="light"
						className="font-medium md:mx-auto lg:m-0 w-fit"
					>
						{TextContent.info.CANNABIS_DELIVERED}
					</Paragraph>
				</div>
			</Grid>
		</FlexBox>
	);
}

const Twitter = ({ size = 28 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
	</svg>
);

const Facebook = ({ size = 28 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
	</svg>
);
const Instagram = ({ size = 28 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
	</svg>
);

const Linkedin = ({ size = 28 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
	</svg>
);

const FooterLink = ({ href, name }) => (
	<Link
		href={replaceRelativePath(href)}
		className="w-fit hover:!drop-shadow-[0px_3px_1px_#6f6f6f] hover:-translate-y-[2px] hover:scale-[107%] transition py-1"
	>
		<Paragraph className="font-medium">{name}</Paragraph>
	</Link>
);
