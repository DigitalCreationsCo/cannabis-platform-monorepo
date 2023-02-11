import { UserWithDetails } from '@cd/data-access';
import {
    Button,
    Card,
    Center,
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
    Row
} from '@cd/shared-ui';
import axios from 'axios';
import { PageHeader, ProtectedComponent } from 'components';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { urlBuilder } from 'utils';
import { useAppState } from '../../src/context/AppProvider';
import { useOnClickOutside } from '../../src/hooks';

// To do:
// Add textfields
// add image
// add update api route
// add get api route, next and server

export default function UserDetails({ user }: { user: UserWithDetails }) {
    const { isLoading, setIsLoading } = useAppState();
    const [updateUser, setUpdateUser] = useState<UserWithDetails>();
    const [loadingButton, setLoadingButton] = useState(false);

    const [openDropDown, setOpenDropDown] = useState(true);
    const dropDownRef = useRef(null);
    useOnClickOutside(dropDownRef, () => {
        setOpenDropDown(false);
    });

    function removeRelatedFields(user) {
        // delete User['driver'];
        // delete User['customer'];
        // delete User['deliveryInfo'];
        return user;
    }

    const handleUpdate = async () => {
        setLoadingButton(true);
        try {
            if (user) {
                setIsLoading(true);
                setUpdateUser(removeRelatedFields({ ...user }));
                const response = await axios.put(urlBuilder.next + '/api/users', {
                    ...updateUser,
                    id: user.id,
                });
                if (response.status !== 200) throw Error('Could not save record');
                toast.success('User Updated Successfully');
            }
            setLoadingButton(false);
            location.reload();
        } catch (error) {
            setLoadingButton(false);
            setIsLoading(false);
            console.error(error);
            toast.error(error.response.statusText);
            location.reload();
        }
    };

    // change user admin level

    return (
        <ProtectedComponent>
            <Page>
                {isLoading ? (
                    <Center>
                        <Padding>
                            <LoadingDots />
                        </Padding>
                    </Center>
                ) : user ? (
                    <Grid className="md:max-w-fit">
                        <PageHeader
                            title={`User #${user?.id}`}
                            Icon={Icons.ShoppingBagOutlined}
                            Button={
                                <Link href="/users">
                                    <Button>Back to Users</Button>
                                </Link>
                            }
                        />
                        <Grid>
                            <FlexBox className="flex-col space-x-0 items-stretch">
                                <Row className="justify-between space-x-4">
                                    <H6>{`User joined on ${format(new Date(user.createdAt), 'MMM dd, yyyy')}`}</H6>
                                    {/* <FlexBox>
                                            <H6>Status</H6>
                                            <select className="select" defaultValue={UserStatus}>
                                                {UserStatus && <option>{UserStatus}</option>}
                                                {UserStatusList.filter((o) => o.value !== UserStatus).map((o) => (
                                                    <option
                                                        onClick={() => {
                                                            setUserStatus(o.value as UserStatus);
                                                        }}
                                                        key={'status-' + o.label}
                                                    >
                                                        {o.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </FlexBox> */}
                                </Row>
                                {/* <Row className="justify-start space-x-4 items-center">
                                        <H6>Items</H6>
                                        <Button
                                            onClick={toggleAddProduct}
                                            className="bg-light text-dark hover:text-light text-sm h-[30px] bUser"
                                        >
                                            Add Product
                                        </Button>
                                    </Row> */}
                            </FlexBox>
                        </Grid>

                        <Grid>
                            <Card>
                                <H5>{user.firstName + ' ' + user.lastName}</H5>
                                <Paragraph>{user.email}</Paragraph>
                                <Paragraph>
                                    <PhoneNumber phone={user.dialCode + '-' + user.phone} />
                                </Paragraph>
                                <Paragraph>
                                    {user.address[0].street1 +
                                        ' ' +
                                        user.address[0].street2 +
                                        '\n' +
                                        user.address[0].city +
                                        ' ' +
                                        user.address[0].state +
                                        ' ' +
                                        user.address[0].country +
                                        ' ' +
                                        user.address[0].zipcode}
                                </Paragraph>
                            </Card>
                        </Grid>

                        <FlexBox className="justify-center py-2 items-stretch">
                            <Button className="flex grow" onClick={handleUpdate} loading={loadingButton}>
                                Save User
                            </Button>
                        </FlexBox>
                    </Grid>
                ) : (
                    <Paragraph>The User is not found</Paragraph>
                )}
            </Page>
        </ProtectedComponent>
    );
}

export async function getServerSideProps({ params }) {
    try {
        const userData = await (await axios(urlBuilder.next + `/api/users/${params.id}`)).data;
        if (!userData) return { notFound: true };
        return {
            props: { user: userData },
        };
    } catch (error) {
        console.log('SSR error: ', error.message);
        throw new Error(error);
    }
}
