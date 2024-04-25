/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type AppState } from '@cd/core-lib';
import { type ProductWithDashboardDetails } from '@cd/data-access';
import {
	Grid,
	H6,
	Icons,
	Page,
	PageHeader,
	usePagination,
	ProductRow,
	Row,
	type LayoutContextProps,
} from '@cd/ui-lib';
import axios from 'axios';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';

interface ProductsDashboardProps {
	products: ProductWithDashboardDetails[];
	setSearchValue: string;
}

let useSetProductSearch: Dispatch<SetStateAction<string>>;

function Products({ products }: ProductsDashboardProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [deleteName, setDeleteName] = useState('');
	const [deleteId, setDeleteId] = useState('');
	const [searchValue, setSearchValue] = useState('');

	useSetProductSearch = setSearchValue;

	const searchedProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchValue.toLowerCase()),
	);

	const currentProducts = usePagination(searchedProducts).current;

	const pageCount = searchValue
		? Math.ceil(currentProducts.length / 10)
		: Math.ceil(products.length / 10);

	const dialogClose = () => {
		setDialogOpen(false);
		setDeleteId('');
		setDeleteName('');
	};

	const handleDeleteProduct = async () => {
		if (deleteId) {
			try {
				const response = await axios.delete(`/api/products/${deleteId}`);
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
		<Page
			className={twMerge('bg-light lg:min-h-[710px] sm:px-4 !pt-0 md:pr-16')}
		>
			<PageHeader title="Products" Icon={Icons.Product}>
				{/* ADD PRODUCTS BUTTON */}
				{/* <Link href={getDashboardSite('/add-product')}>
					<Button className="bg-inverse hover:bg-inverse active:bg-accent-soft place-self-start">
						Add Product
					</Button>
				</Link> */}
			</PageHeader>
			<Grid className="gap-2 pt-2">
				<Row className="h-[44px] justify-start md:pl-1">
					<div className="w-[60px]"></div>
					<H6 className="min-w-[144px]">product</H6>
					<H6 className="flex w-[60px] justify-center ">rating</H6>
					{/* <H6 className="flex justify-center w-[80px] ">Price</H6> */}
					{/* <H6 className="flex justify-center w-[100px]">Sale</H6> */}
					<div className="min-w-[50px] sm:w-[120px]"></div>
				</Row>
				{currentProducts.length > 0 ? (
					currentProducts.map((product) => (
						<ProductRow key={`product-${product.id}`} product={product} />
					))
				) : (
					<Row className="h-[52px]">There are no products available.</Row>
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
	);
}

Products.getLayoutContext = (): LayoutContextProps => ({
	searchPlaceholder: 'Search Products',
	onSearchChange: (e) => {
		if (e?.target) {
			useSetProductSearch((e.target as HTMLInputElement).value);
		}
	},
});

function mapStateToProps(state: AppState) {
	const { dispensary } = state;
	return {
		products: dispensary.products,
	};
}

export default connect(mapStateToProps)(Products);
