import {
	Button,
	FlexBox,
	Grid,
	Icons,
	Page,
	PageHeader,
	Row,
	TextField,
} from '@cd/ui-lib';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AddUser() {
	return (
		<Page className="bg-light lg:min-h-[710px]">
			<PageHeader
				title="Add Dispensary Staff"
				Icon={UserPlusIcon}
				Button={
					<Link href="/users">
						<Button>{`Back to Users`}</Button>
					</Link>
				}
			/>
			<Grid>
				<Row>
					<TextField
						label="Name"
						name={`Name`}
						placeholder="Stock"
						value={''}
						// onBlur={handleBlur}
						onChange={() => null}
					/>
					{/* <TextField
                                                                containerClassName="w-fit px-0 mx-0"
                                                                className="px-0 mx-0 w-[80px]"
                                                                name={`variants[${index}].size`}
                                                                placeholder="Size"
                                                                value={values?.variants?.[index].size}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                            />
                                                            <TextField
                                                                containerClassName="w-fit px-0 mx-0"
                                                                className="px-0 mx-0 w-[80px]"
                                                                name={`variants[${index}].basePrice`}
                                                                placeholder="Price"
                                                                value={values?.variants?.[index].basePrice}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                            />
                                                            <TextField
                                                                containerClassName="w-fit px-0 mx-0"
                                                                className="px-0 mx-0 w-[80px]"
                                                                name={`variants[${index}].discount`}
                                                                placeholder="Discount"
                                                                value={values?.variants?.[index].discount}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                            /> */}
				</Row>
				<FlexBox className="items-stretch justify-center py-2">
					<Button className="flex grow">{`Save User`}</Button>
				</FlexBox>
			</Grid>
		</Page>
	);
}
