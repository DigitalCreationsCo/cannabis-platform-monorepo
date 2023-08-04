/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
	calcSalePrice,
	dateToString,
	getDashboardSite,
	renderAddress,
	TextContent,
	urlBuilder,
	useProductSearch,
} from '@cd/core-lib';
import {
	type OrderStatus,
	type OrderWithDashboardDetails,
	type OrderWithDetails,
	type ProductVariantWithDetails,
} from '@cd/data-access';
import {
	AddProductModal,
	Button,
	Card,
	Center,
	FlexBox,
	Grid,
	H5,
	H6,
	Icons,
	LoadingDots,
	Page,
	PageHeader,
	Paragraph,
	PhoneNumber,
	Price,
	ProductItem,
	Row,
	Span,
	TextField,
	useOnClickOutside,
} from '@cd/ui-lib';
import axios from 'axios';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import logo from '../../../public/logo.png';
import {
	orders,
	organization,
	products,
	userDispensaryAdmin as user,
} from '../../data/dummyData';

export default function OrderDetails({
	order,
}: {
	order: OrderWithDashboardDetails;
}) {
	const [updateOrder, setUpdateOrder] = useState<OrderWithDetails>();
	const [orderStatus] = useState<OrderStatus>(order.orderStatus);

	const [searchProductTerms, setSearchProductTerms] = useState('');
	const [, setLoadingButton] = useState(false);

	const [openAddProduct, setOpenAddProduct] = useState(false);

	const toggleAddProduct = () => setOpenAddProduct((state) => !state);

	const [, setOpenDropDown] = useState(true);
	const dropDownRef = useRef(null);

	useOnClickOutside(dropDownRef, () => {
		setOpenDropDown(false);
	});

	const { notFoundResult, doSearchProducts, productSearchResult } =
		useProductSearch();

	function removeRelatedFields(order: OrderWithDetails) {
		// delete order['driver'];
		// delete order['customer'];
		// delete order.destinationAddress;
		return order;
	}

	function removeProductsFromItems(items: any[]) {
		return (
			items &&
			items.map((item) => {
				delete item['product'];
				return item;
			})
		);
	}
	const handleUpdate = async () => {
		setLoadingButton(true);
		try {
			if (order) {
				// setIsLoading(true);
				setUpdateOrder(removeRelatedFields({ ...order }));
				const response = await axios.put(urlBuilder.dashboard + '/api/orders', {
					...updateOrder,
					id: order.id,
					items: removeProductsFromItems(order.items as any[]),
					status: orderStatus,
				});
				if (response.status !== 200) throw Error('Could not save record');
				toast.success('Order Updated Successfully');
			}
			setLoadingButton(false);
			location.reload();
		} catch (error: any) {
			setLoadingButton(false);
			// setIsLoading(false);
			console.error(error);
			toast.error(error.message);
			// toast.error(error.message);
			location.reload();
		}
	};

	// calculate order total price
	const calculateTotal = (items: any[]) => {
		const subtotal = items.reduce(
			(prev, curr) => prev + curr.salePrice * curr.quantity,
			0,
		);
		const total = subtotal + order.taxAmount;
		// setUpdateOrder((state) => ({ ...state, subtotal, total }));
	};

	// change the quantity for a item
	const handleQuantityChange = (quantity: number, variantId: string) => {
		const items = order?.items?.map((item: any) => {
			return item.variantId === variantId ? { ...item, quantity } : item;
		});
		calculateTotal(items as any[]);
	};

	// delete item from order
	const handleDeleteItem = (variantId: string) => {
		const items = order?.items?.filter(
			(item: any) => item.variantId !== variantId,
		);
		calculateTotal(items as any[]);
	};

	// add new item in order
	const handleAddItem = (
		variant: ProductVariantWithDetails,
		quantity: number,
	) => {
		const salePrice = calcSalePrice(variant.basePrice, variant.discount);

		const addItem: any = {
			discount: variant.discount,
			currency: variant.currency,
			createdAt: variant.createdAt,
			updatedAt: variant.updatedAt,
			productVariant: variant,
			name: variant.name,
			unit: variant.unit,
			size: variant.size,
			basePrice: variant.basePrice,
			variantId: variant.id,
			salePrice,
			quantity,
			orderId: order.id,
		};

		const items = [...order.items, addItem];
		calculateTotal(items);

		setSearchProductTerms('');
		doSearchProducts(null);
	};

	return (
		<Page>
			<PageHeader title={`Order #${order.id}`} Icon={Icons.DeliveryTruck}>
				<Link href={getDashboardSite('/orders')}>
					<Button className="bg-inverse hover:bg-inverse active:bg-accent-soft place-self-start">
						Back to Orders
					</Button>
				</Link>
			</PageHeader>

			<AddProductModal
				className="z-100 w-screen"
				modalVisible={openAddProduct}
				onClose={toggleAddProduct}
				description="Add Product"
			>
				<TextField
					className="shadow"
					value={searchProductTerms}
					onChange={(e: any) => {
						doSearchProducts(e);
						setSearchProductTerms(e.target?.value);
					}}
					placeholder="Search Products"
				/>
				{productSearchResult.length > 0 ? (
					<FlexBox className="flex grow flex-row space-x-3 overflow-scroll pb-4">
						{productSearchResult.map((product) => (
							<ProductItem
								key={product.id}
								data={product}
								handleConfirm={handleAddItem}
							/>
						))}
					</FlexBox>
				) : (
					<Center>
						<LoadingDots />
					</Center>
				)}

				{notFoundResult && (
					// <SearchResultCard elevation={2}>
					<Paragraph>No Products Found</Paragraph>
					// </SearchResultCard>
				)}
			</AddProductModal>

			<Grid className="gap-2 pt-2">
				<Row className="grid h-[55px] grid-cols-12 justify-between">
					<H6 className="col-span-4">
						{`Ordered on ${format(new Date(order.createdAt), 'MMM dd, yyyy')}`}
					</H6>

					<FlexBox className="flex-row items-center">
						<H6 className="col-span-2 hidden justify-self-end sm:block">
							Status
						</H6>
						<Paragraph>{orderStatus}</Paragraph>
						{/* <Select
                                className='col-span-2'
                                defaultValue={orderStatus}
                                values={[ orderStatus ]}
                                // values={[orderStatus, ...orderStatusList]}
                                // setOption={setOrderStatus as Dispatch<SetStateAction<string | number>>}
                            /> */}
					</FlexBox>
				</Row>

				<Card className="border">
					<Paragraph className="whitespace-nowrap">
						{TextContent.delivery.DELIVER_FOR_f(order.customer.username)}
						<br />
						<Span className="whitespace-nowrap font-semibold">
							{`${order.customer.firstName} ${order.customer.lastName}`}
						</Span>
					</Paragraph>

					<Paragraph>{order.customer.email}</Paragraph>

					<Paragraph>
						{PhoneNumber({
							dialCode: user.dialCode,
							phone: user.phone,
						})}
					</Paragraph>

					<Paragraph>
						{renderAddress({ address: order.destinationAddress })}
					</Paragraph>
				</Card>

				<FlexBox className="flex-col items-stretch space-x-0">
					<Row className="h-[44px] items-center justify-start">
						<H6>{TextContent.ui.ITEMS}</H6>

						{/* <Button
                                className="place-self-start bg-inverse hover:bg-inverse active:bg-accent-soft"
                                onClick={toggleAddProduct}
                            >
                                {TextContent.products.ADD_PRODUCT}
                            </Button> */}
					</Row>

					{order.items.map((item, index: number) => (
						<Row key={index} className="flex h-[66px] md:space-x-4">
							<Image
								src={item.images?.[0]?.location || logo}
								className={twMerge('hidden sm:block sm:visible ')}
								alt={`order-item-${item.id}`}
								height={64}
								width={64}
							/>

							<FlexBox className="grow ">
								<Paragraph>{item.name}</Paragraph>
							</FlexBox>

							<Price
								basePrice={item.basePrice}
								discount={item.discount}
								salePrice={item.salePrice}
							/>

							{/* {orderStatus === 'Pending' ? (
                                    <TextField
                                        containerClassName=" w-fit"
                                        className="w-[66px]"
                                        type="number"
                                        defaultValue={item.quantity}
                                        onChange={(e: any) =>
                                            handleQuantityChange(e.target.value, item.id)
                                        }
                                    />
                                ) : ( */}
							<Paragraph>qty {item.quantity}</Paragraph>
							{/* )} */}

							{/* <DeleteButton
                                    onClick={() => handleDeleteItem(item.variantId)}
                                ></DeleteButton> */}
						</Row>
					))}
				</FlexBox>

				<Grid className="grid-cols-6">
					<FlexBox className="col-span-2 col-start-2">
						<H5>Subtotal</H5>
						<H6>
							<Price basePrice={order.subtotal} />
						</H6>
					</FlexBox>

					{/* <FlexBox>
                            <H5>Delivery Fee</H5>
                            <H6>
                                <Price basePrice={0} />
                            </H6>
                        </FlexBox> */}

					<FlexBox className="col-span-2">
						<H5>Tax</H5>
						<H6>
							<Price basePrice={order.taxAmount} />
						</H6>
					</FlexBox>

					<FlexBox className="col-span-2">
						<H5>Total</H5>
						<H6>
							<Price basePrice={order.total} />
						</H6>
					</FlexBox>
				</Grid>

				{/* <FlexBox className="justify-center items-stretch">
                        <Button 
                        size='lg'
                        className="flex grow" 
                        onClick={handleUpdate} 
                        loading={loadingButton}>
                            {TextContent.ui.SAVE_CHANGES}
                        </Button>
                    </FlexBox> */}
			</Grid>
		</Page>
	);
}

export async function getServerSideProps({
	req,
	params,
}: {
	req: any;
	params: any;
}) {
	try {
		// const order = await (
		//     await axios(urlBuilder.dashboard + `/api/orders/${params.id}`, {
		//         headers: {
		//             Cookie: req.headers.cookie
		//         }
		//     })
		// ).data;
		// if (!order) return { notFound: true };
		return {
			props: {
				user: dateToString(user),
				organization: dateToString(organization),
				products: dateToString(products) || [],
				orders: dateToString(orders) || [],
				order: dateToString(orders[0]) || {},
			},
		};
	} catch (error: any) {
		console.info('Orders/[id] SSR error: ', error.message);
		throw new Error(error);
	}
}
