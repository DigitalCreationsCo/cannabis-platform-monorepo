/* eslint-disable @typescript-eslint/no-unused-vars */
import { usePagination } from '@cd/core-lib';
import { type UserWithDetails } from '@cd/data-access';
import {
	DeleteButton,
	Grid,
	H6,
	Icons,
	Page,
	PageHeader,
	Paragraph,
	Row,
	type LayoutContextProps,
} from '@cd/ui-lib';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { connect } from 'react-redux';
import { type RootState } from '../../../redux/store';

type UsersDashboardProps = {
	users: UserWithDetails[];
};

function Users({ users }: UsersDashboardProps) {
	const [, setDialogOpen] = useState(false);
	const [deleteId, setDeleteId] = useState('');

	const { current, PaginationButtons } = usePagination(users);

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
			} catch (error: any) {
				console.error(error);
				toast.error(error.response.statusText);
			}
		}
	};

	return (
		<Page>
			<PageHeader
				title="Users"
				Icon={Icons.User2}
				// Button={
				// 	<Link href="/users/add">
				// 		<Button>Add User</Button>
				// 	</Link>
				// }
			/>
			<Grid className="gap-2">
				<Row className="grid h-[44px] grid-cols-12">
					<H6 className="col-span-4">Name</H6>
					<H6 className="col-span-4">Email</H6>
					<H6 className="col-span-2">Phone</H6>
					<H6 className="col-span-2">Role</H6>
				</Row>
				{current.length > 0 ? (
					<>
						{current.map((user) => (
							<Link href={`/users/${user.id}`} key={user.id}>
								<Row className="h-[54px] py-0">
									<Image
										className="hidden sm:block"
										src={user?.profilePicture?.location || ''}
										alt=""
										height={100}
										width={100}
									/>
									<H6 className="grow">
										{user.firstName} {user.lastName}
									</H6>
									<Paragraph className="hidden w-[240px] justify-start lg:flex">
										{user.email}
									</Paragraph>
									<Paragraph className="flex w-[120px] justify-center">
										{user.phone || '-'}
									</Paragraph>
									<Paragraph className="flex w-[100px] justify-center">
										{user?.memberships?.length &&
											user?.memberships?.[0]?.role
												.substring(0, 1)
												.toLocaleUpperCase() +
												user.memberships[0].role
													.slice(1)
													.toLocaleLowerCase()}{' '}
									</Paragraph>
									<DeleteButton
										onClick={() => {
											console.info('do nothing');
										}}
									></DeleteButton>
								</Row>
							</Link>
						))}
						<PaginationButtons />
					</>
				) : (
					<Row className="h-[52px]">No users are found.</Row>
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
	);
}

Users.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

function mapStateToProps(state: RootState) {
	const { dispensary } = state;
	return {
		users: dispensary.users,
	};
}

export default connect(mapStateToProps)(Users);
