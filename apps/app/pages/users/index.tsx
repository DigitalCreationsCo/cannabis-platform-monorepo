import axios from "axios";
import React, { useState } from "react";
import prisma, {User} from "@cd/data-access"
import { usePagination } from "hooks";
import { Card, DeleteButton, Grid, H6, IconButton, Icons, Page, Paragraph, Row } from "@cd/shared-ui";
import Link from "next/link";
import Image from "next/image";
import { ConfirmationAlert, PageHeader, ProtectedComponent } from "components";
import { Button } from "@cd/shared-ui";

type UsersDashboardProps = {
  users: User[];
}
export default function Users ({ users }: UsersDashboardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  
  const currentUsers = usePagination(currentPage, users);

  const dialogClose = () => {
    setDeleteId("");
    setDialogOpen(false);
  };

  const handleDeleteUser = async () => {
    if (deleteId) {
      try {
        await axios.delete(`/api/users/${deleteId}`);
        // refetch();
        setDeleteId("");
        setDialogOpen(false);
        toast.success("User deleted Successfully");
      } catch (error) {
        toast.error(error.response.data.message);
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
            <Button>
              Add User
            </Button>
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
          <div className="min-w-[50px] sm:w-[120px]"></div>
        </Row>
        { currentUsers.length > 0 ? currentUsers.map((user: User) => {
          return (
            <Link href={ `/users/${user.id}` } key={ user.id }>
              <Row className="h-[54px] py-0">
                <Image className="hidden sm:block" src={ user.imageUser[ 0 ]?.location } alt="" height={ 100 } width={ 100 } />
                <H6 className="grow">{ user.firstName } { user.lastName }</H6>
                <Paragraph className="hidden lg:flex justify-start w-[240px]">{ user.email }</Paragraph>
                <Paragraph className="flex justify-center w-[120px]">{ user.phone || "-" }</Paragraph>
                <Paragraph className="flex justify-center w-[100px]">{ user.memberships[ 0 ]?.role } </Paragraph>
                <IconButton Icon={ Icons.XIcon }
                  className="min-w-[50px] sm:w-[120px] text-primary sm:space-x-2 h-full"
                  size={ 12 }
                  data-modal-target="confirmation-alert"
                  onClick={ (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDialogOpen(true);
                    setDeleteId(user.id);
                  } }
                >
                  <div className="hidden sm:block">Delete</div>
                </IconButton>
              </Row>
            </Link>
          );
        }) : <Card>There are no users.</Card> }
      </Grid>

      <ConfirmationAlert
        modalId="confirmation-alert"
          open={ dialogOpen }
          setOpen={ setDialogOpen }
          handleConfirm={handleDeleteUser}
          description="Remove this user?"
        />

        {/* <FlexBox justifyContent="center" mt={5}>
          <Pagination
            count={Math.ceil(users.length / 10)}
            onChange={(_, value) => setCurrentPage(value)}
          />
        </FlexBox> */}
      </Page>
      </ProtectedComponent>
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
  let users: User[] = await prisma.user.findMany({
    orderBy: {
      id: 'desc',
    },
    where: {
      memberships: {
        some: {
          organizationId
        },
      },
    },
    include: {
      memberships: {
        orderBy: {
          role: 'asc'
        }
      },
      imageUser: true,
    },
  }) || [];

  return {
    props: {
      users,
  }}
}