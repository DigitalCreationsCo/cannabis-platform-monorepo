/* eslint-disable */
import axios from 'axios';
import { useState } from 'react';
// import toast from "react-hot-toast";
import { Product } from '@cd/data-access';
import { Button, Card, DeleteButton, Grid, H6, Icons, Page, Row } from '@cd/shared-ui';
import { Layout, PageHeader, ProtectedComponent } from 'components';
import { usePagination } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { calcSalePrice, urlBuilder } from '../../src/utils';

interface ProductsDashboardProps {
    products: Product[];
    setSearchValue: string;
}

const ProductsSetSearchDispatch = {
    setSearchValue: null
}

export default function Products({ products }: ProductsDashboardProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteName, setDeleteName] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [searchValue, setSearchValue] = useState('');

    ProductsSetSearchDispatch.setSearchValue = setSearchValue;

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    const currentProducts = usePagination(currentPage, filteredProducts);

    const pageCount = searchValue ? Math.ceil(currentProducts.length / 10) : Math.ceil(products.length / 10);

    const dialogClose = () => {
        setDeleteId('');
        setDeleteName('');
        setDialogOpen(false);
    };

    const handleDeleteProduct = async () => {
        if (deleteId) {
            try {
                await axios.delete(`/api/products/${deleteId}`);
                // refetch();
                setDeleteId('');
                setDeleteName('');
                setDialogOpen(false);
                toast.success('Product deleted Successfully');
            } catch (error) {
                setDeleteId('');
                setDeleteName('');
                setDialogOpen(false);
                console.error(error);
                toast.error(error.response.statusText);
            }
        }
    };

    return (
        <ProtectedComponent>
            <Page>
                <PageHeader
                    title="Products"
                    Icon={Icons.Delivery}
                    Button={
                        <Link href="/add-product">
                            <Button>Add Product</Button>
                        </Link>
                    }
                />
                <Grid>
                    <Row className="h-[44px]">
                        <div className="hidden sm:block w-[60px] "></div>
                        <H6 className="grow ">Name</H6>
                        {/* <H6 className="flex justify-center w-[60px] ">Stock</H6> */}
                        {/* <H6 className="flex justify-center w-[80px] ">Price</H6> */}
                        {/* <H6 className="flex justify-center w-[100px]">Sale</H6> */}
                        <div className="min-w-[50px] sm:w-[120px]"></div>
                    </Row>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => {
                            product.salePrice = calcSalePrice(product.basePrice, product.discount);
                            return (
                                <Link href={`/products/${product.id}`} key={product.id}>
                                    <Row className="h-[54px] py-0">
                                        {product.variants[0].images[0] && (
                                            <Image
                                                className=""
                                                src={product.variants[0].images[0]?.location}
                                                alt=""
                                                height={60}
                                                width={60}
                                            />
                                        )}
                                        <H6 className="grow">{product.name}</H6>

                                        {/* <H6 className={ twMerge("flex justify-center w-[60px]", product.stock < 6 && 'text-error') }>{ product.stock.toString().padStart(2, "0") }</H6> */}

                                        {/* <H6 className="flex justify-center w-[80px] ">
                    <Price price={ product.basePrice } />
                  </H6> */}

                                        {/* <H6 className="flex justify-center w-[100px]">
                    <Price price={product.salePrice} />
                  </H6> */}

                                        <DeleteButton
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setDialogOpen(true);
                                                setDeleteId(product.id);
                                                setDeleteName(product.name);
                                            }}
                                        ></DeleteButton>
                                    </Row>
                                </Link>
                            );
                        })
                    ) : (
                        <Card>There are no products available.</Card>
                    )}
                </Grid>

                {/* <ConfirmationAlert
          modalId={"confirmation-alert"}
          handleConfirm={handleDeleteProduct}
          description={`Do you want to delete ${deleteName}?`}
        /> */}

                {/* <FlexBox justifyContent="center" mt={5}>
            <Pagination count={pageCount} onChange={(_, value) => setCurrentPage(value)} />
          </FlexBox> */}
            </Page>
        </ProtectedComponent>
    );
}

Products.getLayout = function (page: JSX.Element) {
    return (
        <Layout placeholder={ 'Search Products' } onSearchChange={ (e) => {
            const { target } = e
            if (target) {
                ProductsSetSearchDispatch.setSearchValue((target as HTMLInputElement).value);
            }
        } }>
            {page}
        </Layout>
    );
};

export async function getServerSideProps({ req, res }) {
    const products = await (await fetch(urlBuilder.next + '/api/products')).json();
    return {
        props: {
            products,
        },
    };
}
