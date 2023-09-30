import {
	renderAddress,
	renderSchedule,
	selectOrganizationBySubdomain,
	TextContent,
} from '@cd/core-lib';
import { type OrganizationWithShopDetails } from '@cd/data-access';
import {
	Card,
	ErrorMessage,
	FlexBox,
	H2,
	IconWrapper,
	Page,
	Paragraph,
	Small,
	type LayoutContextProps,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { useAppSelector } from '../../redux/hooks';
import { wrapper } from '../../redux/store';

function Storefront({ subdomain }: { subdomain: string }) {
	const organization = useAppSelector(
		selectOrganizationBySubdomain(subdomain),
	) as OrganizationWithShopDetails;
	return (
		<Page
			gradient="pink"
			className="w-full bg-transparent pb-0 sm:pt-12 md:pb-24 md:pt-12"
		>
			<Head>
				<title>Grascannabis.org - Cannabis, Delivered.</title>
				<meta name="Gras App" content="Built by Gras Cannabis Co." />
			</Head>
			{/* <Center className="md:bg-inverse m-auto justify-center space-y-4 rounded bg-transparent p-16 sm:shadow-md md:w-[450px]"> */}
			<Card
				className={twMerge(
					`m-auto h-full`,
					// `bg-[${organization.siteSetting.backgroundColor}]`,
				)}
			>
				{organization ? (
					<div className="bg m-auto">
						<H2 className="text-primary whitespace-normal drop-shadow-lg sm:drop-shadow-none">
							{organization.name}
						</H2>
						<Paragraph className="text-primary font-semibold">
							{organization.siteSetting.description}
						</Paragraph>
						{renderAddress({ address: organization.address, lineBreak: true })}
						<Paragraph className="text-primary font-semibold">
							{organization.siteSetting.bannerText}
						</Paragraph>
						<div>
							{organization.images?.length > 0 && (
								<Image
									src={organization.images[0].location}
									alt={organization.name}
									width={150}
									height={150}
									// className="h-full w-full rounded object-cover"
									// fill
									// sizes="(max-width: 250px)"
									// quality={25}
									priority
									loader={({ width, src }) => src + `?w=${width}`}
								/>
							)}
						</div>
						<FlexBox className="flex-row">
							<IconWrapper Icon={icons.Phone} iconSize={20} />
							<Link
								className="text-sm"
								href={`tel:${organization.dialCode + organization.phone}`}
							>
								{`+${organization.dialCode + organization.phone}`}
							</Link>
						</FlexBox>
						{organization.subscribedForDelivery ? (
							<FlexBox className="flex-row">
								<IconWrapper Icon={icons.Truck} iconSize={20} />
								<Small>{'Delivery'}</Small>
							</FlexBox>
						) : null}
						{organization.subscribedForPickup ? (
							<FlexBox className="flex-row">
								<IconWrapper Icon={icons.CurrencyDollar} iconSize={20} />
								<Small>{'Order Pickup'}</Small>
							</FlexBox>
						) : (
							TextContent.error.DISPENSARY_NOT_ACCEPTING_PAYMENTS
						)}
						<FlexBox className="flex-row whitespace-pre-line">
							{renderSchedule(organization.schedule)}
						</FlexBox>
					</div>
				) : (
					<ErrorMessage
						code={404}
						message={TextContent.error.DISPENSARY_NOT_FOUND}
					/>
				)}
			</Card>
		</Page>
	);
}

Storefront.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default Storefront;

export const getServerSideProps = wrapper.getServerSideProps(
	() =>
		async ({ query }: any) => {
			try {
				if (!query['storefront'])
					throw new Error(TextContent.error.DISPENSARY_NOT_FOUND);
				return {
					props: {
						subdomain: query['storefront'],
					},
				};
			} catch (error) {
				console.log(`StoreFront: ${error}`);
				return {
					notFound: true,
				};
			}
		},
);
