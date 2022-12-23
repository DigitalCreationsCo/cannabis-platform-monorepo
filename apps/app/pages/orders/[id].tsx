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
import prisma, {Order} from "@cd/data-access"
import React, { Fragment, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Order, OrderItems, Product } from "__types__/common";

export default function OrderDetails() {
  const { query } = useRouter();
  const [ order, setOrder ] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const fetchOrderDetails = async () => {
    // replace with redux action
    try {
      const { data } = await axios.get(`/api/orders/${query.id}`);
      setOrderStatus(data.status);
      setOrder(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
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
  const calculatePrice = (items: OrderItems[]) => {
    const preTaxTotal = items.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
    const total = preTaxTotal + order.tax;
    setOrder((state) => ({ ...state, items, preTaxTotal, total }));
  };

  // change the quantity for a item
  const handleQuantityChange = (qty: number, productId: string) => {
    const items = order.items.map((item) => {
      return item.productId === productId ? { ...item, quantity: qty } : item;
    });
    reCalculate(items);
  };

  // delete item from order
  const deleteOrderItem = (productId: string) => {
    const items = order.items.filter((item) => item.productId !== productId);
    reCalculate(items);
  };

  // add new item in order
  const addOrderItem = (product: Product) => {
    const priceObj = product.skus[0].price;
    const price = priceObj.base - (priceObj.base * priceObj.discount) / 100;

    const item = {
      price,
      quantity: 1,
      name: product.item,
      productId: product._id,
      img: product.skus[0]?.image[0]?.location,
    };

    const items = [...order.items, item];
    reCalculate(items);

    setSearchProduct("");
    search(null);
  };

  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        title="Order Details"
        icon={ShoppingBag}
        navigation={<AdminDashboardNavigation />}
        button={
          <Link href="/admin/orders">
            <Button color="primary" sx={{ bgcolor: "primary.light", px: "2rem" }}>
              Back to Order List
            </Button>
          </Link>
        }
      />

      {loading && <Loading />}

      {!loading && (
        <Fragment>
          <Card sx={{ p: "0px", mb: "30px" }}>
            <TableRow
              elevation={0}
              sx={{ bgcolor: "grey.200", p: "12px", borderRadius: "0px !important" }}
            >
              <FlexBox flex="0 0 0 !important" m={0.75} alignItems="center" whiteSpace="pre">
                <Typography fontSize="14px" color="grey.600" mr={0.5}>
                  Order ID:
                </Typography>
                <Typography fontSize="14px">{order._id}</Typography>
              </FlexBox>

              <FlexBox className="pre" m={0.75} alignItems="center">
                <Typography fontSize="14px" color="grey.600" mr={0.5}>
                  Placed on:
                </Typography>

                <Typography fontSize="14px">
                  {format(new Date(order.createdAt), "dd MMM, yyyy")}
                </Typography>
              </FlexBox>

              <Box maxWidth="160px">
                <TextField
                  select
                  fullWidth
                  value={orderStatus}
                  label="Order Status"
                  placeholder="Order Status"
                  onChange={(e) => setOrderStatus(e.target.value)}
                >
                  {orderStatusList.map((item) => (
                    <MenuItem value={item.value} key={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </TableRow>

            <Box p="1rem 1.5rem 10px" position="relative">
              <TextField
                fullWidth
                label="Add Product"
                value={searchProduct}
                onChange={(e) => {
                  search(e);
                  setSearchProduct(e.target.value);
                }}
              />

              {resultList.length > 0 && (
                <SearchResultCard elevation={2}>
                  {resultList.map((item) => (
                    <MenuItem key={item._id} onClick={() => addOrderItem(item)}>
                      {item.item}
                    </MenuItem>
                  ))}
                </SearchResultCard>
              )}

              {notFoundResult && (
                <SearchResultCard elevation={2}>
                  <Paragraph p={2}>Not Found Products</Paragraph>
                </SearchResultCard>
              )}
            </Box>

            <Box py={1}>
              {order.items.map((item, index) => (
                <FlexBox px={2} py={1} flexWrap="wrap" alignItems="center" key={index}>
                  <FlexBox flex="2 2 260px" m={0.75} alignItems="center">
                    <Avatar src={item.img} sx={{ height: 64, width: 64 }} />
                    <Box ml={2.5}>
                      <H6 my="0px">{item.name}</H6>

                      <FlexBox alignItems="center">
                        <Typography fontSize="14px" color="grey.600">
                          ${item.price} x
                        </Typography>

                        <Box maxWidth="60px" ml={1} mt={0.5}>
                          <TextField
                            fullWidth
                            type="number"
                            defaultValue={item.quantity}
                            InputProps={{ inputProps: { min: "1" } }}
                            onChange={(e) => handleQuantityChange(+e.target.value, item.productId)}
                          />
                        </Box>
                      </FlexBox>
                    </Box>
                  </FlexBox>

                  <FlexBox flex="0 0 0 !important" m={0.75} alignItems="center">
                    <IconButton onClick={() => deleteOrderItem(item.productId)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </FlexBox>
                </FlexBox>
              ))}
            </Box>
          </Card>

          <Grid container spacing={3}>
            <Grid item lg={6} md={6} xs={12}>
              <Card sx={{ p: "20px 30px", mb: "1.5rem" }}>
                <H5 mt={0} mb={2}>
                  Shipping Address
                </H5>

                <H6>Name: {order.shipping.name}</H6>
                <Paragraph>Email: {order.shipping.email}</Paragraph>
                <Paragraph>Phone: {order.shipping.phone}</Paragraph>
                <Paragraph>
                  Address:{" "}
                  {`${order.shipping.address}, ${order.shipping.city}, ${order.shipping.postalCode}, ${order.shipping.country}`}
                </Paragraph>
              </Card>

              <LoadingButton
                fullWidth
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                loading={loadingButton}
                // sx={{ display: "block" }}
              >
                Save Order
              </LoadingButton>
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <Card sx={{ p: "20px 30px", mb: "1.5rem" }}>
                <H5 mt={0} mb={2}>
                  Total Summary
                </H5>

                <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography fontSize="14px" color="grey.600">
                    Subtotal:
                  </Typography>
                  <H6 my="0px">${order.preTaxTotal.toFixed(2)}</H6>
                </FlexBox>

                <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography fontSize="14px" color="grey.600">
                    Shipping fee:
                  </Typography>
                  <H6 my="0px">${0}</H6>
                </FlexBox>

                <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography fontSize="14px" color="grey.600">
                    Discount:
                  </Typography>
                  <H6 my="0px">${order.discount}</H6>
                </FlexBox>

                <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography fontSize="14px" color="grey.600">
                    Tax:
                  </Typography>
                  <H6 my="0px">${order.tax.toFixed(2)}</H6>
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

                <Divider sx={{ mb: "0.5rem" }} />

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
                )}
              </Card>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </AdminDashboardLayout>
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
