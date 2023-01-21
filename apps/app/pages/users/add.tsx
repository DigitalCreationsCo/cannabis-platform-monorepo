import { Button, FlexBox, Grid, Icons, Page, Row, TextField } from '@cd/shared-ui';
import { PageHeader, ProtectedComponent } from 'components';
import Link from 'next/link';

export default function AddUser() {
    return (
        <ProtectedComponent>
            <Page>
                <PageHeader
                    title="Add Dispensary Staff"
                    Icon={Icons.User2}
                    Button={
                        <Link href="/users">
                            <Button>Back to Users</Button>
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
                    <FlexBox className="justify-center py-2 items-stretch">
                        <Button className="flex grow">Save User</Button>
                    </FlexBox>
                </Grid>
            </Page>
        </ProtectedComponent>
    );
}
