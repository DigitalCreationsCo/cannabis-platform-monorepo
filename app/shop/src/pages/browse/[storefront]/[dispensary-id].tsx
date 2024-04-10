import {
	isArray,
	renderAddress,
	renderSchedule,
	TextContent,
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
	LoadingPage,
	H1,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type PropsWithChildren, useState } from 'react';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';
import logo from '../../../../public/logo2.png';
import { wrapper } from '../../../store';

function Storefront({ dispensaryId }: { dispensaryId: string }) {
	const Router = useRouter();

	const { error, isLoading, data } = useSWR<OrganizationWithShopDetails>(
		() => `/api/organization/${dispensaryId}`,
		async (url: string) => {
			const response = await fetch(url);
			const json = await response.json();

			if (!response.ok) {
				throw new Error(
					json.error.message || 'An error occurred while fetching the data',
				);
			}

			return json.payload;
		},
	);

	console.info('data', data);
	const organization = data;

	if (isLoading) {
		return <LoadingPage />;
	}

	if (error || !organization) {
		return (
			<Page gradient="pink" className="w-full bg-transparent py-0 md:pb-24">
				<Head>
					<title>Grascannabis.org - Cannabis, Delivered.</title>
					<meta name="Gras App" content="Built by Gras Cannabis Co." />
				</Head>
				<Card className={twMerge(`m-auto items-center h-full w-full`)}>
					<ErrorMessage
						code={404}
						message={TextContent.error.DISPENSARY_NOT_FOUND}
					/>
				</Card>
			</Page>
		);
	}

	const applyDispensaryStyles: Record<string, string> = {
		'primary-color': organization.siteSetting.primaryColor as string,
		'secondary-color': organization.siteSetting.secondaryColor as string,
		'tertiary-color': organization.siteSetting.tertiaryColor as string,
		'text-color': organization.siteSetting.textColor as string,
		'background-color': organization.siteSetting.backgroundColor as string,
	};

	const Heading = () => (
		<>
			<H1
				style={{ color: applyDispensaryStyles['primary-color'] }}
				className={`whitespace-normal px-2`}
			>
				{organization.name}
			</H1>
			{organization.images?.length > 0 && (
				<Image
					className="shrink-0 w-[150px] relative"
					src={organization.images[0].location}
					alt={organization.name}
					width={150}
					height={150}
					priority
					loader={({ src }) => src}
				/>
			)}
			<Paragraph style={{ color: applyDispensaryStyles['text-color'] }}>
				{renderAddress({
					address: organization.address,
					lineBreak: false,
				})}
			</Paragraph>

			<DispensaryStatus />
		</>
	);

	const Body = () => (
		<>
			<H4
				style={{ color: applyDispensaryStyles['primary-color'] }}
				className="font-normal"
			>
				{organization.siteSetting.description}
			</H4>
		</>
	);

	const DispensaryStatus = () => (
		<FlexBox
			style={{ color: applyDispensaryStyles['primary-color'] }}
			className={`flex-col`}
		>
			{organization.isSubscribedForDelivery ? (
				<FlexBox className="flex-row">
					<IconWrapper Icon={icons.Truck} iconSize={28} />
					<Paragraph
						style={{ color: applyDispensaryStyles['text-color'] }}
						className="whitespace-pre text-lg font-semibold tracking-wider"
					>
						{' Accepting Delivery'}
					</Paragraph>
				</FlexBox>
			) : null}
			{organization.isSubscribedForPickup ? (
				<FlexBox className="flex-col">
					<FlexBox
						style={{ color: applyDispensaryStyles['text-color'] }}
						className="flex-row"
					>
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
			{/* {!organization.isSubscribedForDelivery &&
			!organization.isSubscribedForPickup ? (
				<Paragraph className="text-lg text-dark-soft tracking-wider">
					{TextContent.error.DISPENSARY_NOT_ACCEPTING_PAYMENTS}
				</Paragraph>
			) : null} */}
		</FlexBox>
	);

	const Contact = () => (
		<>
			{organization.isSubscribedForPickup ? (
				<FlexBox
					style={{ color: applyDispensaryStyles['text-color'] }}
					className="flex-row items-center"
				>
					<IconWrapper Icon={icons.Phone} iconSize={28} />
					<Link href={`tel:${organization.dialCode + organization.phone}`}>
						<Paragraph
							style={{ color: applyDispensaryStyles['text-color'] }}
							className="whitespace-pre font-semibold"
						>
							{` call us +${organization.dialCode + organization.phone}`}
						</Paragraph>
					</Link>
				</FlexBox>
			) : null}
		</>
	);

	const Schedule = () => (
		<>
			<Paragraph style={{ color: applyDispensaryStyles['text-color'] }}>
				Hours
			</Paragraph>
			<FlexBox className="flex-row whitespace-pre-line">
				<Paragraph style={{ color: applyDispensaryStyles['text-color'] }}>
					{renderSchedule(organization.schedule)}
				</Paragraph>
			</FlexBox>
		</>
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
			</div>
		);
	};

	function BackButton() {
		return (
			<Button
				style={{ color: applyDispensaryStyles['text-color'] }}
				size="sm"
				bg="transparent"
				hover="transparent"
				className="text-dark self-start sm:py-0 hover:underline"
				onClick={() => Router.back()}
			>
				<IconWrapper Icon={icons.ArrowLeft} className="pr-1" />
				back
			</Button>
		);
	}

	const BrowseMore = () => {
		return organization.ecommerceUrl ? (
			<Link
				href={organization.ecommerceUrl as string}
				// className={`text-[${organization.siteSetting.secondaryColor}] hover:text-[${organization.siteSetting.primaryColor}]`}
			>
				<Button
					size="lg"
					bg="primary"
					className="w-full hover:bg-primary-light transition duration-75"
				>
					<H4>Shop with {organization.name}</H4>
				</Button>
			</Link>
		) : (
			<></>
		);
	};

	return (
		<Page
			gradient="pink"
			// grow items-center min-h-screen
			className="w-full py-0 md:pt-12 md:pb-24 flex flex-col grow h-[96vh]"
		>
			<Head>
				<title>Grascannabis.org - Cannabis, Delivered.</title>
				<meta name="Gras App" content="Built by Gras Cannabis Co." />
			</Head>
			<Card
				style={{ backgroundColor: applyDispensaryStyles['background-color'] }}
				className={twMerge(
					`flex grow m-auto items-center h-full w-full !py-12 !pb-24`,
				)}
			>
				<BackButton />
				{organization ? (
					<div className="space-y-0">
						<Heading />
						<Body />
						<Contact />
						<Schedule />
						{/* <Products /> */}
						<BrowseMore />
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
	showFooter: false,
});

export default Storefront;

export const getServerSideProps = wrapper.getServerSideProps(
	() =>
		async ({ query }: any) => {
			try {
				console.info('query', query);
				if (!query['dispensary-id'])
					throw new Error(TextContent.error.DISPENSARY_NOT_FOUND);
				return {
					props: {
						dispensaryId: query['dispensary-id'],
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
