// import Delete from "@mui/icons-material/Delete";
// import ShoppingBag from "@mui/icons-material/ShoppingBag";
// import { LoadingButton } from "@mui/lab";
// import { Avatar, Button, Card, Divider, Grid, MenuItem } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import { Box } from "@mui/system";
import axios from "axios";
// import FlexBox from "components/FlexBox";
// import AdminDashboardLayout from "components/layout/AdminDashboardLayout";
// import AdminDashboardNavigation from "components/layout/AdminDashboardNavigation";
// import DashboardPageHeader from "components/layout/DashboardPageHeader";
// import Loading from "components/Loading";
// import { SearchResultCard } from "components/search-box/HomeSearchBox";
// import TableRow from "components/TableRow";
// import { H5, H6, Paragraph } from "components/Typography";
// import { format } from "date-fns";
// import useProductSearch from "hooks/useProductSearch";
// import Link from "next/link";
import Router, { useRouter } from "next/router";
import prisma, {Order, OrderItem, Product} from "@cd/data-access"
import React, { Fragment, useEffect, useState } from "react";
import { PageHeader, ProtectedComponent } from "../../src/components";
import { Button, Card, DeleteButton, FlexBox, Grid, H6, Icons, Page, Paragraph, Row, TextField } from "@cd/shared-ui";
import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import { Currency } from "@cd/shared-ui";
import { IconButton } from "@cd/shared-ui";
import { H5 } from "@cd/shared-ui";
import toast from "react-hot-toast";
import { urlBuilder } from "../../src/utils";
// import { Order, OrderItems, Product } from "__types__/common";

export default function OrderDetails() {
  const { query } = useRouter();
  const [ order, setOrder ] = useState<Order>(null);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const fetchOrderDetails = async () => {
    // replace with redux action
    try {
      const { data } = await axios(urlBuilder.next + `/api/orders/${query.id}`);
      setOrderStatus(data.status);
      setOrder(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error)
      toast.error(error.response.statusText);
    }
  };

  useEffect(() => {
    if (query?.id) {
      fetchOrderDetails();
    }
  }, [query]);

  const handleSubmit = async () => {
    setLoadingButton(true);
    try {
      if (order) {
        await axios.put(`/api/orders/${order.id}`, {
          ...order,
          status: orderStatus,
          updatedAt: Date.now(),
        });
      }
      toast.success(`Order Updated Successfully`);
      Router.push("/orders");
      setLoadingButton(false);
    } catch (error) {
      toast.error(error.response.data.message || error.response.data.error);
      setLoadingButton(false);
    }
  };

  // calculate order total price
  const calculateTotal = (items: OrderItem[]) => {
    const subtotal = items.reduce((prev, curr) => prev + curr.salePrice * curr.quantity, 0);
    const total = subtotal + order.tax;
    setOrder((state) => ({ ...state, items, subtotal, total }));
  };

  // change the quantity for a item
  const handleQuantityChange = (quantity: number, productId: string ) => {
    const items = order.items.map((item: OrderItem) => {
      return item.id === productId ? { ...item, quantity } : item;
    });
    calculateTotal(items);
  };

  // delete item from order
  const deleteOrderItem = (productId: string) => {
    const items = order.items.filter((item: OrderItem) => item.id !== productId);
    calculateTotal(items);
  };

  // add new item in order
  const addOrderItem = (product: Product, quantity: number) => {
    const salePrice = product.basePrice - (product.basePrice * product.discount) / 100;

    const item = {
      ...product,
      salePrice,
      quantity,
    };

    const items = order.items.push(item)
    calculateTotal(items);

    setSearchProduct("");
    // search hook to api
    // search(null);
  };

  if (!order) return <div>There is no order</div>

  return (
    <ProtectedComponent>
      <Page>
      <PageHeader
        title="Order Details"
        Icon={Icons.ShoppingBagOutlined}
        // navigation={<AdminDashboardNavigation />}
        Button={
        <Link href="/orders">
          <Button>
            Back to Order List
          </Button>
        </Link>
        }
      />

        <>
          <Card>
            <Grid>
              <Row>
                <FlexBox>
                  <H6>Order #</H6>
                  <Paragraph>{ order.id }</Paragraph>
                </FlexBox>
                <FlexBox className="pre" m={0.75} alignItems="center">
                  <H6>Ordered on</H6>
                  <H6>
                    { format(new Date(order.createdAt), "MMM dd, yyyy") }
                  </H6>
                </FlexBox>

                <TextField
                  value={orderStatus}
                  label="Order Status"
                  placeholder="Order Status"
                  onChange={(e) => setOrderStatus(e.target.value)}
                />
            </Row>

            <FlexBox>
              <TextField
                label="Add Product"
                value={searchProduct}
                onChange={(e) => {
                  // search(e);
                  setSearchProduct(e.target.value);
                }}
              />
              <div>searching for: { searchProduct }</div>

              {/* {resultList.length > 0 && (
                <SearchResultCard elevation={2}>
                  {resultList.map((item) => (
                    <MenuItem key={item._id} onClick={() => addOrderItem(item)}>
                      {item.item}
                    </MenuItem>
                  ))}
                </SearchResultCard>
              )} */}

              {/* {notFoundResult && (
                <SearchResultCard elevation={2}>
                  <Paragraph p={2}>Not Found Products</Paragraph>
                </SearchResultCard>
              )} */}
            </FlexBox>

            <FlexBox>
              {order.items.map((item: OrderItem, index: number) => (
                <FlexBox key={index}>
                  <FlexBox>
                    <Image src={item.product.images[0]?.location} alt="" height={64} width={64} />
                    <FlexBox>
                      <H6>{item.name}</H6>

                      <FlexBox>
                        <H6>
                          <Currency price={item.salePrice} />
                        </H6>

                        <FlexBox>
                          <TextField
                            type="number"
                            defaultValue={item.quantity}
                            onChange={(e) => handleQuantityChange(e.target.value, item.id)}
                          />
                        </FlexBox>
                      </FlexBox>
                    </FlexBox>
                  </FlexBox>

                  <FlexBox>
                    <DeleteButton onClick={ () => deleteOrderItem(item.id) }></DeleteButton>
                  </FlexBox>
                </FlexBox>
              ))}
              </FlexBox>
            </Grid>
          </Card>

          <Grid>
            <Card>
              <H5>Shipping Address</H5>

              <H6>Name: {order.customer.firstName + order.customer.lastName}</H6>
              <Paragraph>Email: {order.customer.email}</Paragraph>
              <Paragraph>Phone: {order.customer.dialCode + order.customer.phone}</Paragraph>
              <Paragraph>
                Address:{" "}
                {`${order.deliveryInfo.street1 }, ${order.deliveryInfo.street2 }, ${order.deliveryInfo.city}, ${order.deliveryInfo.zipcode}, ${order.deliveryInfo.country}`}
              </Paragraph>
            </Card>

            <Button
              onClick={handleSubmit}
              loading={loadingButton}
            >
              Save Order
            </Button>
          </Grid>

          <Grid>
            <Card>
              <H5>
                Total
              </H5>

              <FlexBox>
                <H5>
                  Subtotal
                </H5>
                <H6><Currency price={ order.subtotal } /></H6>
              </FlexBox>

              <FlexBox>
                <H5>
                  Delivery Fee
                </H5>
                <H6><Currency price={0} /></H6>
              </FlexBox>

              {/* <FlexBox>
                <H5>
                  Discount
                </H5>
                <H6>${order.discount}</H6>
              </FlexBox> */}

              <FlexBox>
                <H5>
                  Tax
                </H5>
                <H6><Currency price={order.tax} /></H6>
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
            </Card>
          </Grid>
        </>
      </Page>
      </ProtectedComponent>
  );
};

const orderStatusList = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Processing",
    value: "Processing",
  },
  {
    label: "Delivered",
    value: "Delivered",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
];
