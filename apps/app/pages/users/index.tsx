import { User, UserWithDetails } from '@cd/data-access';
import { Button, Card, DeleteButton, Grid, H6, Icons, Page, Paragraph, Row } from '@cd/shared-ui';
import axios from 'axios';
import { PageHeader, ProtectedComponent } from 'components';
import { usePagination } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { urlBuilder } from '../../src/utils';

type UsersDashboardProps = {
    users: UserWithDetails[];
};
export default function Users({ users }: UsersDashboardProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const currentUsers: UserWithDetails[] = usePagination(currentPage, users);

    const dialogClose = () => {
        setDeleteId('');
        setDialogOpen(false);
    };

    const handleDeleteUser = async () => {
        if (deleteId) {
            try {
                await axios.delete(`/api/users/${deleteId}`);
                // refetch();
                setDeleteId('');
                setDialogOpen(false);
                toast.success('User deleted Successfully');
            } catch (error) {
                console.error(error);
                toast.error(error.response.statusText);
            }
        }
    };

    return (
        <ProtectedComponent>
            <Page>
                <PageHeader
                    title="Users"
                    Icon={Icons.User2}
                    Button={
                        <Link href="/users/add">
                            <Button>Add User</Button>
                        </Link>
                    }
                />
                <Grid>
                    <Row className="h-[44px]">
                        <div className="hidden sm:block w-[100px]"></div>
                        <H6 className="grow">Name</H6>
                        <H6 className="hidden lg:flex justify-start w-[240px]">Email</H6>
                        <H6 className="flex justify-center w-[120px]">Phone</H6>
                        <H6 className="flex justify-center w-[100px]">Role</H6>
                        <div className="min-w-[50px] md:w-[120px]"></div>
                    </Row>
                    {users && currentUsers.length > 0 ? (
                        currentUsers.map((user) => {
                            return (
                                <Link href={`/users/${user.id}`} key={user.id}>
                                    <Row className="h-[54px] py-0">
                                        <Image
                                            className="hidden sm:block"
                                            src={user.imageUser[0]?.location}
                                            alt=""
                                            height={100}
                                            width={100}
                                        />
                                        <H6 className="grow">
                                            {user.firstName} {user.lastName}
                                        </H6>
                                        <Paragraph className="hidden lg:flex justify-start w-[240px]">
                                            {user.email}
                                        </Paragraph>
                                        <Paragraph className="flex justify-center w-[120px]">
                                            {user.phone || '-'}
                                        </Paragraph>
                                        <Paragraph className="flex justify-center w-[100px]">
                                            {user.memberships[0]?.role.substring(0, 1).toLocaleUpperCase() +
                                                user.memberships[0]?.role.slice(1).toLocaleLowerCase()}{' '}
                                        </Paragraph>
                                        <DeleteButton
                                            onClick={() => {
                                                console.log('do nothing');
                                            }}
                                        ></DeleteButton>
                                    </Row>
                                </Link>
                            );
                        })
                    ) : (
                        <Card>There are no users.</Card>
                    )}
                </Grid>

                {/* <ConfirmationAlert
        modalId="confirmation-alert"
          open={ dialogOpen }
          setOpen={ setDialogOpen }
          handleConfirm={handleDeleteUser}
          description="Remove this user?"
        /> */}

                {/* <FlexBox justifyContent="center" mt={5}>
          <Pagination
            count={Math.ceil(users.length / 10)}
            onChange={(_, value) => setCurrentPage(value)}
          />
        </FlexBox> */}
            </Page>
        </ProtectedComponent>
    );
}

export async function getServerSideProps() {
    const users: User[] = await (await fetch(urlBuilder.next + '/api/users')).json();
    return {
        props: {
            users,
        },
    };
}
