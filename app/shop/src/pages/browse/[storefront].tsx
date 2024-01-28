import {
	isArray,
	renderAddress,
	renderSchedule,
	selectOrganizationBySubdomain,
	TextContent,
	useAppSelector,
} from '@cd/core-lib';
import {
	type ProductVariantWithDetails,
	type OrganizationWithShopDetails,
} from '@cd/data-access';
import {
	Button,
	Card,
	ErrorMessage,
	FlexBox,
	Grid,
	H2,
	H4,
	H6,
	IconWrapper,
	Page,
	Paragraph,
	Price,
	type LayoutContextProps,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { type PropsWithChildren, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../../public/logo2.png';
import { wrapper } from '../../store';

function Storefront({ subdomain }: { subdomain: string }) {
	const organization = useAppSelector(
		selectOrganizationBySubdomain(subdomain),
	) as OrganizationWithShopDetails;

	const Heading = () => (
		<div className={''}>
			{organization.images?.length > 0 && (
				<Image
					className="shrink-0 w-[100px] sm:w-[150px] relative float-right"
					src={organization.images[0].location}
					alt={organization.name}
					width={150}
					height={150}
					priority
					loader={({ width, src }) => src + `?w=${width}`}
				/>
			)}
			<H2
				className={`text-[${organization.siteSetting.primaryColor}] whitespace-normal drop-shadow-lg sm:drop-shadow-none`}
			>
				{organization.name}
			</H2>

			{/* address */}
			<Paragraph className="sm:text-lg">
				{renderAddress({
					address: organization.address,
					lineBreak: false,
				})}
			</Paragraph>

			{/* subtitle */}
			<DispensaryStatus />
		</div>
	);

	const Body = () => (
		<div>
			{/* info text */}
			<H4 className="text-primary font-normal">
				{organization.siteSetting.description}
			</H4>
		</div>
	);

	const DispensaryStatus = () => (
		<FlexBox
			className={`flex-col text-[${organization.siteSetting.primaryColor}]`}
		>
			{organization.subscribedForDelivery ? (
				<FlexBox className="flex-row">
					<IconWrapper Icon={icons.Truck} iconSize={28} />
					<Paragraph className="whitespace-pre text-lg font-semibold tracking-wider">
						{' Accepting Delivery'}
					</Paragraph>
				</FlexBox>
			) : null}
			{organization.subscribedForPickup ? (
				<FlexBox className="flex-col">
					<FlexBox className="flex-row">
						<IconWrapper Icon={icons.CurrencyDollar} iconSize={28} />
						<Paragraph className="whitespace-pre text-lg font-semibold tracking-wider">
							{'Order for Pickup'}
						</Paragraph>
					</FlexBox>

					{/* Banner Info */}
					<H4 className={`text-primary`}>
						{organization.siteSetting.bannerText}
					</H4>
				</FlexBox>
			) : null}
			{!organization.subscribedForDelivery &&
			!organization.subscribedForPickup ? (
				<Paragraph className="text-lg text-dark-soft tracking-wider">
					{TextContent.error.DISPENSARY_NOT_ACCEPTING_PAYMENTS}
				</Paragraph>
			) : null}
		</FlexBox>
	);

	const Contact = () => (
		<div>
			{organization.subscribedForPickup ? (
				<FlexBox className="flex-row items-center">
					<IconWrapper Icon={icons.Phone} iconSize={28} />
					<Link href={`tel:${organization.dialCode + organization.phone}`}>
						<Paragraph className="whitespace-pre font-semibold">
							{` call us +${organization.dialCode + organization.phone}`}
						</Paragraph>
					</Link>
				</FlexBox>
			) : null}
			<Paragraph>Hours</Paragraph>
			<FlexBox className="flex-row whitespace-pre-line">
				{renderSchedule(organization.schedule)}
			</FlexBox>
		</div>
	);

	const Products = () => {
		return (
			<div className="sm:pb-8">
				<H4 className="pb-2">Selection</H4>
				<Grid className="grid-cols-3 pb-8">
					{isArray(organization.products) ? (
						organization.products.map((product, i) => {
							console.info('product', product);
							return (
								(isArray(product.variants) &&
									product.variants.length > 0 &&
									product.variants.map((variant, index) => (
										<ProductItem
											key={`${organization.name}-product-${i}-variant-${index}`}
											data={variant}
										/>
									))) ||
								null
							);
						})
					) : (
						<BrowseMore />
					)}
				</Grid>
				<BrowseMore />
			</div>
		);
	};
	return (
		<Page gradient="pink" className="w-full bg-transparent pb-0 md:pb-24 pt-14">
			<Head>
				<title>Grascannabis.org - Cannabis, Delivered.</title>
				<meta name="Gras App" content="Built by Gras Cannabis Co." />
			</Head>
			<Card
				className={twMerge(
					// `bg-[${organization.siteSetting.backgroundColor}] m-auto items-center h-full w-full`,
					`m-auto items-center h-full w-full`,
				)}
			>
				{organization ? (
					<div className="space-y-4">
						<BackButton />

						<Heading />
						<Body />
						<Contact />
						<Products />
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

	function BackButton() {
		return (
			<Button
				size="sm"
				bg="transparent"
				className="text-dark self-start  sm:py-0"
				onClick={() => Router.back()}
			>
				<IconWrapper Icon={icons.ArrowLeft} className="pr-1" />
				back
			</Button>
		);
	}

	function BrowseMore() {
		return (
			<Link
				href={organization.ecommerceUrl as string}
				// className={`text-[${organization.siteSetting.secondaryColor}] hover:text-[${organization.siteSetting.primaryColor}]`}
			>
				<Button
					size="lg"
					bg="accent-soft"
					className="w-full bg-accent-soft hover:bg-primary"
				>
					<H4>More from {organization.name}</H4>
				</Button>
			</Link>
		);
	}
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

type ProductItemProps = {
	className?: string;
	data: ProductVariantWithDetails;
	handleConfirm?: any;
};
function ProductItem({
	data: product,
	className,
	handleConfirm,
}: ProductItemProps & PropsWithChildren) {
	const [openConfirm, setOpenConfirm] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const toggleConfirm = () => setOpenConfirm((state) => !state);

	// console.info('product image source: ', product?.images?.[0]?.location)

	return (
		<div className={twMerge('border w-full h-full col-span-1', className)}>
			{product?.images?.[0]?.location ? (
				<img
					src={product?.images?.[0]?.location}
					alt={product.name}
					style={{ height: 80, maxHeight: 100, width: 80, maxWidth: 100 }}
					className="rounded object-cover place-self-center m-auto"
				/>
			) : (
				<img
					src={logo.src}
					alt={product.name}
					style={{ height: 80, maxHeight: 100, width: 80, maxWidth: 100 }}
					className="rounded object-cover place-self-center m-auto"
				/>
			)}
			<div className="h-full w-full p-4 space-y-2">
				<FlexBox className="flex-row justify-between">
					<H6 className="font-normal">{product.name}</H6>
					<Paragraph className="place-self-end">
						{product.size + product.unit}
					</Paragraph>
				</FlexBox>
				<Price
					className="justify-end"
					basePrice={product.basePrice}
					salePrice={product.salePrice}
					discount={product.discount}
					quantity={product.quantity}
					isDiscount={product.isDiscount}
					showDiscount
				/>
			</div>
		</div>
	);
}
