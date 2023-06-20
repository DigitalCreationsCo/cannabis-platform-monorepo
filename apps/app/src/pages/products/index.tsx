import { getDashboardSite, usePagination } from '@cd/core-lib';
import { ProductWithDashboardDetails } from '@cd/data-access';
import { Button, Card, Grid, H6, Icons, LayoutContextProps, Page, PageHeader, ProductRow, Row } from '@cd/ui-lib';
import axios from 'axios';
import { orders, organization, products, userDispensaryAdmin as user } from 'data/dummyData';
import Link from 'next/link';
import { dateToString } from 'pages/dashboard';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

interface ProductsDashboardProps {
    products: ProductWithDashboardDetails[];
    setSearchValue: string;
}

let
useSetProductSearch : Dispatch<SetStateAction<string>>;

export default function Products({ products }: ProductsDashboardProps) {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteName, setDeleteName] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [searchValue, setSearchValue] = useState('');

    useSetProductSearch = setSearchValue;
    useEffect(() => {}, [searchValue])

    const 
    searchedProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const 
    currentProducts = usePagination(currentPage, searchedProducts);

    const 
    pageCount = searchValue ? Math.ceil(currentProducts.length / 10) : Math.ceil(products.length / 10);

    const dialogClose = () => {
        setDialogOpen(false);
        setDeleteId('');
        setDeleteName('');
    };

    const handleDeleteProduct = async () => {
        if (deleteId) {
            try {
                
                const 
                response = await axios.delete(`/api/products/${deleteId}`);
                
                toast.success('Product deleted Successfully');
            } catch (error: any) {
                console.error(error);
                toast.error(error.response.statusText);
            } finally {
                setDeleteId('');
                setDeleteName('');
                setDialogOpen(false);
            }
        }
    };

    return (
            <Page className={twMerge("sm:px-4 !pt-0 md:pr-16")}>
                
                <PageHeader
                    title="Products"
                    Icon={Icons.Product}
                    >
                        <Button className="place-self-start">
                        <Link href={getDashboardSite("/add-product")}>
                            <Button className="bg-inverse hover:bg-inverse active:bg-accent-soft">Add Product</Button>
                        </Link></Button>
                        </PageHeader>
                        
                <Grid className='pt-2 gap-2'>
                    <Row className="h-[44px] md:pl-1 justify-start">
                        <div className="w-[60px]"></div>
                        <H6 className="min-w-[144px]">
                            product</H6>
                        <H6 className="flex justify-center w-[60px] ">rating</H6>
                        {/* <H6 className="flex justify-center w-[80px] ">Price</H6> */}
                        {/* <H6 className="flex justify-center w-[100px]">Sale</H6> */}
                        <div className="min-w-[50px] sm:w-[120px]"></div>
                    </Row>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                                <ProductRow 
                                key={`product-${product.id}`} 
                                product={product} />
                            )
                        )
                    ) : 
                    <Card>There are no products available.</Card> 
                    }
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
    );
}

Products.getLayoutContext = ():LayoutContextProps => ({
    placeholder: 'Search Products', 
    onSearchChange: (e) => {
            if (e?.target) {
                useSetProductSearch((e.target as HTMLInputElement).value);
            }
        }
    }
);


export async function getServerSideProps({ req, res }: { req: any; res: any }) {

    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

    // const products = await (await fetch(urlBuilder.dashboard + '/api/products', {
    //     headers: {
    //         Cookie: req.headers.cookie
    //     }
    // })).json();
    return {
        props: { 
            user: dateToString(user), 
            organization: dateToString(organization), 
            products: dateToString(products) || [], 
            orders: dateToString(orders) || [], 
        }
    };
}
