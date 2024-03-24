import {
	axios,
	isValidOrderRecord,
	renderAddress,
	selectCartState,
	selectIsCartEmpty,
	selectUserState,
	TextContent,
	urlBuilder,
} from '@cd/core-lib';
import {
	type Address,
	type AddressUserCreateType,
	type OrderCreateType,
} from '@cd/data-access';
import {
	Button,
	Card,
	DeliveryGuarantee,
	FlexBox,
	H3,
	H4,
	LoadingPage,
	Page,
	Paragraph,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { RenderCart } from '../../components';

function Checkout() {
	const [loadingButton, setLoadingButton] = useState(false);

	const { order, isLoading } = useSelector(selectCartState);

	const cartIsEmpty = useSelector(selectIsCartEmpty);

	async function canCheckout(order: OrderCreateType) {
		!cartIsEmpty && isValidOrderRecord(order);
	}

	async function createStripeCheckout() {
		try {
			const response = await axios.post(
				urlBuilder.shop + '/api/stripe/checkout-session',
				order,
			);

			if (response.data.success === 'false')
				throw new Error(response.data.error);

			if (response.status === 302 && response.data.success === 'true')
				window.location.href = response.data.redirect;
		} catch (error: any) {
			console.error('create checkout error:', error);
			throw new Error(error.message);
		}
	}

	const onSubmit = async () => {
		try {
			setLoadingButton(true);
			await canCheckout(order);
			await createStripeCheckout();
			toast.success('Checking out');
			setLoadingButton(false);
		} catch (error: any) {
			toast.error(error.message);
			setLoadingButton(false);
		}
	};

	return (
		<>
			{isLoading && <LoadingPage />}
			{!isLoading && (
				<Page className="items-center pb-0 md:pb-24">
					<Card className="min-w-full space-y-2">
						<H3 className="text-primary">Checkout</H3>

						<div className={styles.banner}>
							<div>
								<H4>{TextContent.prompt.READY_CHECKOUT}</H4>
								<Paragraph>{TextContent.prompt.REVIEW_PLACE_ORDER}</Paragraph>
							</div>

							<div className="h-fit lg:w-[300px]">
								<Button
									className={twMerge(
										loadingButton ? 'bg-primary-light' : 'bg-primary',
										'm-auto w-[200px]',
									)}
									loading={loadingButton}
									disabled={!!cartIsEmpty}
									bg="primary"
									size="lg"
									hover={'primary-light'}
									onClick={onSubmit}
								>
									Place my order
								</Button>
							</div>
						</div>

						<div className={styles.checkout}>
							<RenderCart />

							<FlexBox className={styles.review}>
								<div className={styles.container}>
									<Paragraph className={styles.heading}>Order from</Paragraph>

									<div className={twMerge(styles.box)}>
										<H3 className={styles.heading}>
											{order?.organization?.name || ''}
										</H3>

										<Paragraph className="text-center">
											{renderAddress({
												address: order?.organization.address,
											})}
										</Paragraph>
									</div>
								</div>

								<ReviewDeliveryAddress
									orderAddress={order?.destinationAddress}
								/>
							</FlexBox>
						</div>

						<DeliveryGuarantee />
					</Card>
				</Page>
			)}
		</>
	);
}

export default Checkout;

Checkout.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

function ReviewDeliveryAddress({
	orderAddress,
}: {
	orderAddress: Address | AddressUserCreateType;
}) {
	const { user } = useSelector(selectUserState);
	// const selectedAddress = useSelector(selectSelectedLocationState);
	// const [address, setAddress] = useState(selectedAddress['address']);
	const [showDropdown] = useState(false);

	return (
		// CHANGE DELIVERY ADDRESS FUNCTIONALITY
		// <div className="dropdown">
		//     <Paragraph className='text-primary'>Delivery to</Paragraph>
		//     <div className={twMerge([styles.addressContainer,])}>
		//         {!showDropdown &&
		//         <Button
		//         className='relative flex flex-col h-full w-[300px] m-auto text-center rounded justify-center'
		//         // onClick={() => setShowDropdown(true)}
		//         borderColor='primary'
		//         bg='transparent'
		//         hover='transparent'
		//         border={true}>
		//             <Paragraph>{user?.firstName} {user?.lastName}</Paragraph>
		//             <Paragraph>{renderAddress({ address: orderAddress })}</Paragraph>
		//         </Button>
		//         }

		//         {/* DROPDOWN TO SELECT A DIFFERENT ADDRESS */}
		//         {/* {showDropdown &&
		//         <div>
		//             {user?.address.map((selectAddress, index) =>
		//                 <div className={styles.selectAddress}>
		//                 <Paragraph key={`select-address-${index}`}>
		//                     {renderAddress({ address: selectAddress, showCountry: false, showZipcode: false} )}</Paragraph>
		//                 </div>
		//             )}
		//         </div>
		//         } */}

		//     </div>
		// </div>
		<div className={styles.container}>
			<Paragraph className={styles.heading}>Delivery to</Paragraph>
			{!showDropdown && (
				<Button
					// onClick={() => setShowDropdown(true)}
					borderColor="primary"
					bg="transparent"
					hover="transparent"
					border
					className={twMerge([
						styles.box,
						'flex-col w-full h-full',
						'cursor-default',
					])}
				>
					<Paragraph>
						{user?.firstName} {user?.lastName}
					</Paragraph>
					<Paragraph className="font-normal">
						{renderAddress({ address: orderAddress as Address })}
					</Paragraph>
				</Button>
			)}
		</div>
	);
}

const styles = {
	banner:
		'flex flex-col lg:flex-row space-y-2 md:space-y-0 space-x-5 lg:justify-between lg:pr-8 items-center',

	checkout: 'flex flex-col-reverse md:flex-row space-y-4 md:justify-around',
	review: 'md:mr-0 space-y-4 px-8 pb-12',

	container: 'w-full sm:w-[300px]',
	heading: 'text-primary pl-4',
	box: 'border rounded py-4 h-fit',
	selectAddress: '',
};
