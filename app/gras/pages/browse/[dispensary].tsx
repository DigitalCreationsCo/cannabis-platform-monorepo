import {
	type ApiResponse,
	fetcher,
	isArray,
	renderAddress,
	renderSchedule,
	TextContent,
	urlBuilder,
} from '@cd/core-lib';
import {
	type ProductVariantWithDetails,
	type Dispensary,
	dispensaries,
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
import {
	ArrowLeftIcon,
	CurrencyDollarIcon,
	TruckIcon,
} from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type PropsWithChildren, useState, type ReactElement } from 'react';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';
import env from '@/lib/env';
import SEOMetaTags from '@/lib/SEOMetaTags';
import logo from 'public/logo.png';

function DispensaryPage({
	dispensary: organization,
}: {
	dispensary: Dispensary;
}) {
	const Router = useRouter();

	// const { error, isLoading, data } = useSWR<Dispensary>(
	// 	() => `/api/dispensaries/${dispensaryId}`,
	// 	async (url: string) => {
	// 		const response = await fetch(url);
	// 		const json = await response.json();

	// 		if (!response.ok) {
	// 			throw new Error(
	// 				json.error.message || 'An error occurred while fetching the data'
	// 			);
	// 		}

	// 		return json.payload;
	// 	}
	// );

	// console.info('token: ', token);
	// const { data, error, isLoading } = useSWR<ApiResponse<Dispensary>>(
	// 	[`/api/dispensaries/${slug}`, token],
	// 	fetcher
	// );

	// if (isLoading) {
	// 	return <LoadingPage />;
	// }

	if (!organization.name) {
		return (
			<Page gradient="pink" className="w-full bg-transparent py-0 md:pb-24">
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
		'primary-color': organization.siteSetting?.primaryColor as string,
		'secondary-color': organization.siteSetting?.secondaryColor as string,
		'tertiary-color': organization.siteSetting?.tertiaryColor as string,
		'text-color': organization.siteSetting?.textColor as string,
		'background-color': organization.siteSetting?.backgroundColor as string,
	};

	const Heading = () => (
		<div>
			{/* <H1
				style={{ color: applyDispensaryStyles['primary-color'] }}
				className={`whitespace-normal px-2`}
			>
				{organization.name}
			</H1> */}
			{(organization.images?.length && organization.images?.length > 0 && (
				<div className="min-h-[150px] content-center">
					<Image
						style={{
							maxWidth: '220px',
							height: 'auto',
						}}
						src={organization.images[0].location}
						alt={organization.name}
						width={300}
						height={150}
						priority
						loader={({ src }) => src}
						blurDataURL={organization.images[0].blurhash || ''}
						placeholder={organization.images[0].blurhash ? 'blur' : 'empty'}
						quality={25}
					/>
				</div>
			)) || <></>}
			<DispensaryStatus />
			<Paragraph style={{ color: applyDispensaryStyles['text-color'] }}>
				{renderAddress({
					address: organization.address,
					lineBreak: false,
				})}
			</Paragraph>
			<Description />
		</div>
	);

	const DispensaryStatus = () => (
		<FlexBox
			style={{ color: applyDispensaryStyles['primary-color'] }}
			className={`flex-col`}
		>
			{organization.isSubscribedForDelivery ? (
				<FlexBox className="flex-row">
					<IconWrapper Icon={TruckIcon} iconSize={28} />
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
						<IconWrapper Icon={CurrencyDollarIcon} iconSize={28} />
						<Paragraph className="whitespace-pre text-lg font-semibold tracking-wider">
							{'Order for Pickup'}
						</Paragraph>
					</FlexBox>
				</FlexBox>
			) : null}
			{/* {!organization.isSubscribedForDelivery &&
			!organization.isSubscribedForPickup ? (
				<Paragraph className="text-lg text-dark-soft tracking-wider">
					{TextContent.error.DISPENSARY_NOT_ACCEPTING_PAYMENTS}
				</Paragraph>
			) : null} */}

			{/* Banner Info */}
			<H4>{organization.siteSetting?.bannerText}</H4>
		</FlexBox>
	);

	const Description = () => (
		<>
			<Paragraph
				style={{ color: applyDispensaryStyles['tertiary-color'] }}
				className="max-w-sm"
			>
				{organization.siteSetting?.description}
			</Paragraph>
		</>
	);

	const Contact = () => (
		<>
			{organization.isSubscribedForPickup ? (
				<>
					{/* <FlexBox
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
				</FlexBox> */}
				</>
			) : (
				<></>
			)}
		</>
	);

	const Schedule = () => (
		<>
			<FlexBox className="flex-col w-fit whitespace-pre-line">
				<Paragraph style={{ color: applyDispensaryStyles['text-color'] }}>
					Hours
				</Paragraph>
				{renderSchedule(organization.schedule).map((day) => (
					<FlexBox
						key={`schedule-${day[0]}`}
						className="flex-row justify-between w-full space-x-4 font-light"
					>
						<Paragraph style={{ color: applyDispensaryStyles['text-color'] }}>
							{day[0]}
						</Paragraph>
						<Paragraph style={{ color: applyDispensaryStyles['text-color'] }}>
							{day[1].split(' ').map((time, i) => (
								<span key={`schedule-${day[0]}-time-${i}`}> {time}</span>
							))}
						</Paragraph>
					</FlexBox>
				))}
			</FlexBox>
		</>
	);

	// const Products = () => {
	// 	return (
	// 		<div className="sm:pb-8">
	// 			<H4 className="pb-2">Selection</H4>
	// 			<Grid className="grid-cols-3 pb-8">
	// 				{isArray(organization.products) ? (
	// 					organization.products.map((product, i) => {
	// 						console.info('product', product);
	// 						return (
	// 							(isArray(product.variants) &&
	// 								product.variants.length > 0 &&
	// 								product.variants.map((variant, index) => (
	// 									<ProductItem
	// 										key={`${organization.name}-product-${i}-variant-${index}`}
	// 										data={variant}
	// 									/>
	// 								))) ||
	// 							null
	// 						);
	// 					})
	// 				) : (
	// 					<BrowseMore />
	// 				)}
	// 			</Grid>
	// 		</div>
	// 	);
	// };

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
				<IconWrapper Icon={ArrowLeftIcon} className="pr-1" />
				back
			</Button>
		);
	}

	const BrowseMore = () => (
		<div className="w-full sm:w-fit">
			{organization.ecommerceUrl ? (
				<Link href={organization.ecommerceUrl as string} target="_blank">
					<Button
						bg="primary"
						className="p-6 px-10 w-full hover:bg-primary-light transition duration-75"
					>
						<H4>Visit {organization.name}</H4>
					</Button>
				</Link>
			) : (
				<></>
			)}
		</div>
	);

	return (
		<>
			<SEOMetaTags />
			<Page
				gradient="pink"
				className="w-full !pt-0 pb-0 px-0 md:!pt-12 sm:!pb-24 md:!pb-24 lg:!pb-24 xl:!pb-24 !min-h-full"
			>
				<Card
					style={{ backgroundColor: applyDispensaryStyles['background-color'] }}
					className={twMerge(
						'mx-auto flex grow md:!flex-grow-0 !w-full !py-12 !pb-24'
					)}
				>
					<BackButton />
					{organization ? (
						<div className="flex flex-col w-full space-y-2">
							<Heading />
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
		</>
	);
}

DispensaryPage.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>;
};

export const getServerSideProps = async ({ query, locale }: any) => {
	try {
		if (!query['dispensary']) throw new Error("Couldn't find the dispensary.");

		const token = env.nextAuth.secret;
		// const response = await fetch(
		// 	`${urlBuilder.shop}/api/dispensaries/${query['dispensary']}`,
		// 	{ headers: { authorization: 'Bearer ' + token } }
		// );

		// if (!response.ok) {
		// 	throw new Error(
		// 		(await response.json()).error.message ||
		// 			'An error occurred while fetching the data'
		// 	);
		// }
		// const dispensary = await response.json();

		const dispensary = dispensaries.find((d) => d.slug === query['dispensary']);
		console.info('fetched dummy data: dispensary: ', dispensary);
		return {
			props: {
				...(locale ? await serverSideTranslations(locale, ['common']) : {}),
				dispensary: JSON.parse(JSON.stringify(dispensary)),
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default DispensaryPage;

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
