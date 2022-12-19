// import { Delete } from "@mui/icons-material";
// import { Avatar, Button, IconButton, Pagination, TextField, Typography } from "@mui/material";
// import axios from "axios";
// import ConfirmationAlert from "components/ConfirmationAlert";
// import FlexBox from "components/FlexBox";
// import DeliveryBox from "components/icons/DeliveryBox";
// import AdminDashboardLayout from "components/layout/AdminDashboardLayout";
// import AdminDashboardNavigation from "components/layout/AdminDashboardNavigation";
// import DashboardPageHeader from "components/layout/DashboardPageHeader";
// import Loading from "components/Loading";
// import TableRow from "components/TableRow";
// import { H5 } from "components/Typography";
// import useProducts from "hooks/useProducts";
// import Link from "next/link";
import React, { useState } from "react";
// import toast from "react-hot-toast";
// import pagination from "__server__/utils/pagination";
import prisma, { Organization, Product, Order, User } from "@cd/data-access"
import { Center, Currency, FlexBox, H6, IconButton, Icons, Page, Paragraph, Row, TextField, Grid, Table } from "@cd/shared-ui"
import { usePagination } from "hooks";
import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface ProductsDashboardProps {
    products: Product[];
}

export default function Products ({ products }: ProductsDashboardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const currentProducts = usePagination(currentPage, filteredProducts);

    const pageCount = searchValue
    ? Math.ceil(currentProducts.length / 10)
      : Math.ceil(products.length / 10);
  
  const dialogClose = () => {
    setDeleteId("");
    setDialogOpen(false);
  };

  const handleDeleteProduct = async () => {
    if (deleteId) {
      try {
        await axios.delete(`/api/products/${deleteId}`);
        // refetch();
        setDeleteId("");
        setDialogOpen(false);
        toast.success("Product deleted Successfully");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Page>
      <TextField
        placeholder="Search Product..."
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Grid>
          <Row>
          <div className="hidden sm:block w-[60px] "></div>
          <H6 className="grow ">Name</H6>
          <H6 className="flex justify-center w-[60px] ">Stock</H6>
          <H6 className="flex justify-center w-[80px] ">Price</H6>
          <H6 className="flex justify-center w-[100px]">Sale</H6>
          <div className="min-w-[50px] sm:w-[120px]"></div>
        </Row>
          {currentProducts.map((product) => {
            const salePrice = product.basePrice - (product.basePrice * product.discount) / 100;
            product.salePrice = salePrice
            return (
              <Link href={`/products/${product.id}`} key={product.id}>
                <Row>
                  <Image className="hidden sm:block " src={ product.images[ 0 ]?.location } alt="" height={ 60 } width={ 60 } />
                  <H6 className="grow ">{ product.name }</H6>

                  <H6 className={ twMerge("flex justify-center w-[60px]", product.quantity < 6 ? 'text-primary' : 'text-secondary') }>{ product.quantity.toString().padStart(2, "0") }</H6>

                  <H6 className="flex justify-center w-[80px] ">
                    <Currency price={ product.basePrice } />
                  </H6>

                  <H6 className="flex justify-center w-[100px]">
                    <Currency price={product.salePrice} />
                  </H6>

                  <IconButton Icon={Icons.XIcon} className="min-w-[50px] sm:w-[120px] text-primary sm:space-x-2"
                    onClick={ (e) => {
                      e.stopPropagation();
                      setDialogOpen(true);
                      setDeleteId(product.id);
                    }}
                  >
                    <div className="hidden sm:block">Delete</div>
                  </IconButton>
                </Row>
              </Link>
            );
          }) }
        </Grid>

          {/* <ConfirmationAlert
            open={dialogOpen}
            close={dialogClose}
            handleConfirm={handleDeleteProduct}
            description="Want to remove this product."
          />

          <FlexBox justifyContent="center" mt={5}>
            <Pagination count={pageCount} onChange={(_, value) => setCurrentPage(value)} />
          </FlexBox> */}
    </Page>
  );
};

const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = { user: { username: 'kbarnes', organizationId: '2' } }
    let { user } = session
    return user;
}

export async function getServerSideProps({ req, res }) {
    
    let user = getUserInfo({req})
    let {organizationId} = user

    let products = await prisma.product.findMany({ where: { organizationId }, orderBy: [ { rating: 'desc' },{ quantity: 'desc' }],include: { images: true}}) || []

    return {
        props: {
            products,
    }}
}