// import { Delete } from "@mui/icons-material";
// import { Avatar, Box, Button, IconButton, Pagination } from "@mui/material";
import axios from "axios";
// import ConfirmationAlert from "components/ConfirmationAlert";
// import FlexBox from "components/FlexBox";
// import User2 from "components/icons/User2";
// import AdminDashboardLayout from "components/layout/AdminDashboardLayout";
// import AdminDashboardNavigation from "components/layout/AdminDashboardNavigation";
// import DashboardPageHeader from "components/layout/DashboardPageHeader";
// import Loading from "components/Loading";
// import TableRow from "components/TableRow";
// import { H5, H6, Paragraph } from "components/Typography";
// import useUsers from "hooks/useUsers";
// import Link from "next/link";
import React, { useState } from "react";
import prisma, {User} from "@cd/data-access"
import { usePagination } from "hooks";
import { Card, FlexBox, H6, IconButton, Icons, Page, Paragraph, Row } from "@cd/shared-ui";
import Link from "next/link";

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
    <Page>
      {/* <DashboardPageHeader
        title="Users"
        icon={User2}
        navigation={<AdminDashboardNavigation />}
        button={
          <Link href="/admin/users/add">
            <Button color="primary" sx={{ bgcolor: "primary.light", px: "2rem" }}>
              Add User
            </Button>
          </Link>
        }
      /> */}
      <Row>
        <H6>Name</H6>
        <H6>Email</H6>
        <H6>Phone</H6>
        <H6>Role</H6>
      </Row>

        {currentUsers.length > 0 ? currentUsers.map((user: User) => {
          return (
            <Link href={`/users/${user.id}`} key={user.id}>
              <Row>
                <FlexBox>
                  {/* <Image src={ user.images[ 0 ]?.location } alt="" height={ 100 } width={ 100 } /> */}
                  <H6>{user.firstName} {user.lastName}</H6>
                </FlexBox>
                <Paragraph>{user.email}</Paragraph>
                <Paragraph>{user.phone || "-"}</Paragraph>
                <Paragraph>{user.memberships?[0]?.role}</Paragraph>
                <IconButton Icon={Icons.XIcon}
                  onClick={ (e) => {
                    e.preventDefault()
                    e.stopPropagation();
                    setDialogOpen(true);
                    setDeleteId(user.id);
                  }}
                >
                  <div className="hidden sm:block">Delete</div>
                </IconButton>
              </Row>
            </Link>
          );
        }) : (<Card>There are no users.</Card>)}

        {/* <ConfirmationAlert
          open={dialogOpen}
          close={dialogClose}
          handleConfirm={handleDeleteProduct}
          description="Want to remove this user."
        /> */}

        {/* <FlexBox justifyContent="center" mt={5}>
          <Pagination
            count={Math.ceil(users.length / 10)}
            onChange={(_, value) => setCurrentPage(value)}
          />
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
  let users: User[] = await prisma.user.findMany(
    // { where: { organizationId } }
  ) || [];

  return {
    props: {
      users,
  }}
}