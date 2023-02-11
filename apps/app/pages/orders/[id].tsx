import {
    OrderItem,
    OrderItemWithDetails,
    OrderStatus,
    OrderWithDetails,
    ProductVariantWithDetails,
} from '@cd/data-access';
import {
    Button,
    Card,
    Center,
    DeleteButton,
    FlexBox,
    Grid,
    H5,
    H6,
    Icons,
    LoadingDots,
    Padding,
    Page,
    Paragraph,
    PhoneNumber,
    Price,
    Row,
    TextField,
} from '@cd/shared-ui';
import axios from 'axios';
import { AddProduct, PageHeader, ProductItem, ProtectedComponent } from 'components';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { calcSalePrice, urlBuilder } from 'utils';
import { useAppState } from '../../src/context/AppProvider';
import { useOnClickOutside, useProductSearch } from '../../src/hooks';

export default function OrderDetails({ order }: { order: OrderWithDetails }) {
    const { isLoading, setIsLoading } = useAppState();
    const [updateOrder, setUpdateOrder] = useState<OrderWithDetails>();
    const [orderStatus, setOrderStatus] = useState<OrderStatus>(order.status);
    const [searchProductTerms, setSearchProductTerms] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);
    const [openAddProduct, setOpenAddProduct] = useState(false);

    const toggleAddProduct = () => setOpenAddProduct((state) => !state);

    const [openDropDown, setOpenDropDown] = useState(true);
    const dropDownRef = useRef(null);
    useOnClickOutside(dropDownRef, () => {
        setOpenDropDown(false);
    });

    const { notFoundResult, doSearchProducts, productSearchResult } = useProductSearch();

    function removeRelatedFields(order) {
        delete order['driver'];
        delete order['customer'];
        delete order['deliveryInfo'];
        return order;
    }

    function removeProductsFromItems(items: OrderItemWithDetails[]) {
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
                setIsLoading(true);
                setUpdateOrder(removeRelatedFields({ ...order }));
                const response = await axios.put(urlBuilder.next + '/api/orders', {
                    ...updateOrder,
                    id: order.id,
                    items: removeProductsFromItems(order.items),
                    status: orderStatus,
                });
                if (response.status !== 200) throw Error('Could not save record');
                toast.success('Order Updated Successfully');
            }
            setLoadingButton(false);
            location.reload();
        } catch (error) {
            setLoadingButton(false);

            setIsLoading(false);
            console.error(error);
            toast.error(error.response.statusText);
            // toast.error(error.message);
            location.reload();
        }
    };

    // calculate order total price
    const calculateTotal = (items: OrderItemWithDetails[]) => {
        const subtotal = items.reduce((prev, curr) => prev + curr.salePrice * curr.quantity, 0);
        const total = subtotal + order.tax;
        setUpdateOrder((state) => ({ ...state, subtotal, total }));
    };

    // change the quantity for a item
    const handleQuantityChange = (quantity: number, variantId: string) => {
        const items = order.items.map((item: OrderItemWithDetails) => {
            return item.variantId === variantId ? { ...item, quantity } : item;
        });
        calculateTotal(items);
    };

    // delete item from order
    const handleDeleteItem = (variantId: string) => {
        const items = order.items.filter((item: OrderItem) => item.variantId !== variantId);
        calculateTotal(items);
    };

    // add new item in order
    const handleAddItem = (variant: ProductVariantWithDetails, quantity: number) => {
        const salePrice = calcSalePrice(variant.basePrice, variant.discount);

        const addItem: OrderItemWithDetails = {
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
        <ProtectedComponent>
            <Page>
                {isLoading ? (
                    <Center>
                        <Padding>
                            <LoadingDots />
                        </Padding>
                    </Center>
                ) : (
                    (order && (
                        <Grid className="md:max-w-fit">
                            <PageHeader
                                title={`Order #${order?.id}`}
                                Icon={Icons.ShoppingBagOutlined}
                                Button={
                                    <Link href="/orders">
                                        <Button>Back to Orders</Button>
                                    </Link>
                                }
                            />
                            <AddProduct
                                className="z-100 w-screen"
                                open={openAddProduct}
                                onClose={toggleAddProduct}
                                description="Add Product"
                            >
                                <TextField
                                    className="shadow"
                                    value={searchProductTerms}
                                    onChange={(e) => {
                                        doSearchProducts(e);
                                        setSearchProductTerms(e.target.value);
                                    }}
                                    placeholder="Search Products"
                                />
                                {productSearchResult.length > 0 ? (
                                    <FlexBox className="pb-4 overflow-scroll space-x-3 flex flex-row grow">
                                        {productSearchResult.map((product) => (
                                            <ProductItem
                                                key={product.id}
                                                product={product}
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
                            </AddProduct>
                            <Grid>
                                <FlexBox className="flex-col space-x-0 items-stretch">
                                    <Row className="justify-between space-x-4">
                                        <H6>{`Ordered on ${format(new Date(order.createdAt), 'MMM dd, yyyy')}`}</H6>
                                        <FlexBox>
                                            <H6>Status</H6>
                                            <select className="select" defaultValue={orderStatus}>
                                                {orderStatus && <option>{orderStatus}</option>}
                                                {orderStatusList
                                                    .filter((o) => o.value !== orderStatus)
                                                    .map((o) => (
                                                        <option
                                                            onClick={() => {
                                                                setOrderStatus(o.value as OrderStatus);
                                                            }}
                                                            key={'status-' + o.label}
                                                        >
                                                            {o.label}
                                                        </option>
                                                    ))}
                                            </select>
                                        </FlexBox>
                                    </Row>
                                    <Row className="justify-start space-x-4 items-center">
                                        <H6>Items</H6>
                                        <Button
                                            onClick={toggleAddProduct}
                                            className="bg-light text-dark hover:text-light text-sm h-[30px] border"
                                        >
                                            Add Product
                                        </Button>
                                    </Row>

                                    {order.items.map((item: OrderItemWithDetails, index: number) => (
                                        <Row key={index} className="h-[66px] flex md:space-x-4">
                                            <Image
                                                src={item.productVariant?.images[0]?.location}
                                                className={twMerge('hidden sm:block sm:visible ')}
                                                alt=""
                                                height={64}
                                                width={64}
                                            />
                                            <FlexBox className="grow ">
                                                <H6 className="">{item.name}</H6>
                                            </FlexBox>

                                            <H6 className="">
                                                <Price price={item.salePrice} />
                                            </H6>
                                            {orderStatus === 'Pending' ? (
                                                <TextField
                                                    containerClassName=" w-fit"
                                                    className="w-[66px] font-semibold"
                                                    type="number"
                                                    defaultValue={item.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(e.target.value, item.variantId)
                                                    }
                                                />
                                            ) : (
                                                <H6 className="w-[66px] font-semibold mx-4 px-4">{item.quantity}</H6>
                                            )}

                                            <DeleteButton
                                                onClick={() => handleDeleteItem(item.variantId)}
                                            ></DeleteButton>
                                        </Row>
                                    ))}
                                </FlexBox>
                            </Grid>

                            <Grid>
                                <Card>
                                    <H5>Delivery</H5>
                                    <H6>{order.customer.firstName + ' ' + order.customer.lastName}</H6>
                                    <Paragraph>{order.customer.email}</Paragraph>
                                    <Paragraph>
                                        <PhoneNumber phone={order.customer.dialCode + '-' + order.customer.phone} />
                                    </Paragraph>
                                    <Paragraph>
                                        {order.deliveryInfo.street1 +
                                            ' ' +
                                            order.deliveryInfo.street2 +
                                            '\n' +
                                            order.deliveryInfo.city +
                                            ' ' +
                                            order.deliveryInfo.state +
                                            ' ' +
                                            order.deliveryInfo.country +
                                            ' ' +
                                            order.deliveryInfo.zipcode}
                                    </Paragraph>
                                </Card>
                            </Grid>

                            <FlexBox className="justify-center py-2 items-stretch">
                                <Button className="flex grow" onClick={handleUpdate} loading={loadingButton}>
                                    Save Order
                                </Button>
                            </FlexBox>

                            <Grid>
                                <Card>
                                    <Grid className="max-w-fit md:m-auto ">
                                        <FlexBox>
                                            <H5>Subtotal</H5>
                                            <H6>
                                                <Price price={order.subtotal} />
                                            </H6>
                                        </FlexBox>

                                        <FlexBox>
                                            <H5>Delivery Fee</H5>
                                            <H6>
                                                <Price price={0} />
                                            </H6>
                                        </FlexBox>

                                        {/* <FlexBox>
                <H5>
                  Discount
                </H5>
                <H6>${order.discount}</H6>
              </FlexBox> */}

                                        <FlexBox>
                                            <H5>Tax</H5>
                                            <H6>
                                                <Price price={order.tax} />
                                            </H6>
                                        </FlexBox>

                                        <FlexBox>
                                            <H5>Total</H5>
                                            <H6>
                                                <Price price={order.total} />
                                            </H6>
                                        </FlexBox>

                                        {/* <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
            <Typography fontSize="14px" color="grey.600">
              Shipping fee:
            </Typography>
            <FlexBox alignItems="center" maxWidth="100px" ml={1} mt={0.5}>
              <Typography mr={1}>$</Typography>
              <TextField defaultValue={0} type="number" fullWidth />
            </FlexBox>
          </FlexBox>

          <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
            <Typography fontSize="14px" color="grey.600">
              Discount:
            </Typography>

            <FlexBox alignItems="center" maxWidth="100px" ml={1} mt={0.5}>
              <Typography mr={1}>-$</Typography>
              <TextField defaultValue={discount} type="number" fullWidth />
            </FlexBox>
          </FlexBox> */}

                                        {/* <Divider sx={{ mb: "0.5rem" }} />

              <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
                <H6 my="0px">Total</H6>
                <H6 my="0px">${order.total.toFixed(2)}</H6>
              </FlexBox>

              {order.paymentType === "cash" && (
                <Typography fontSize="14px">Cash On Delivery Payment</Typography>
              )}

              {order.paymentStatus && order.paymentType === "card" && (
                <Typography fontSize="14px">
                  Paid by {order.paymentId.card.brand.toUpperCase()} Card
                </Typography>
              )} */}
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    )) || <Paragraph>The order is not found</Paragraph>
                )}
            </Page>
        </ProtectedComponent>
    );
}

const orderStatusList = [
    {
        label: 'Pending',
        value: 'Pending',
    },
    {
        label: 'Processing',
        value: 'Processing',
    },
    {
        label: 'Delivered',
        value: 'Delivered',
    },
    {
        label: 'Cancelled',
        value: 'Cancelled',
    },
];

const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = {
        user: { username: 'kbarnes', firstName: 'Katie', lastName: 'Barnes', memberships: [{ organizationId: '2' }] },
    };
    const { user } = session;
    return {
        session,
        user,
    };
};

export async function getServerSideProps({ req, res, params }) {
    try {
        // res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        const order = await (await axios(urlBuilder.next + `/api/orders/${params.id}`)).data;
        if (!order) return { notFound: true };

        return {
            props: { order },
        };
    } catch (error) {
        console.log('SSR error: ', error.message);
        throw new Error(error);
    }
}
