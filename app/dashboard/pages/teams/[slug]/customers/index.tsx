/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Customer, getCustomersByDispensary } from '@cd/data-access';
import {
	DeleteButton,
	Grid,
	H6,
	Icons,
	Page,
	PageHeader,
	Paragraph,
	Row,
	usePagination,
	type LayoutContextProps,
	Button,
	CheckBox,
} from '@cd/ui-lib';
import axios from 'axios';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Table } from '@/components/shared/table/Table';
import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import { wrapper } from '@/lib/store';

type CustomerDashboardProps = {
	customers: Customer[];
};

function CustomersPage({ customers }: CustomerDashboardProps) {
	const { t } = useTranslation();

	if (!customers) throw new Error();

	const [, setDialogOpen] = useState(false);
	const [deleteId, setDeleteId] = useState('');

	const { current, PaginationButtons } = usePagination(customers, 50);

	const dialogClose = () => {
		setDeleteId('');
		setDialogOpen(false);
	};

	const handleDeleteCustomer = async () => {
		if (deleteId) {
			try {
				await axios.delete(`/api/customer/${deleteId}`);
				setDeleteId('');
				setDialogOpen(false);
				toast.success('Customer deleted Successfully');
			} catch (error: any) {
				console.error(error);
				toast.error(error.response.statusText);
			}
		}
	};

	return (
		<div className="bg-light lg:min-h-[710px]">
			<PageHeader title="Customer List" Icon={Icons.UserFavorite}>
				<div className="flex flex-row gap-x-5 my-4">
					<Link href="/customer/create">
						<Button className="bg-amber-100 hover:bg-amber-200 active:bg-amber-200 place-self-start px-4 mt-2">
							{t('add-customer')}
						</Button>
					</Link>
					<Link href="/customer/import">
						<Button className="bg-amber-100 hover:bg-amber-200 active:bg-amber-200 place-self-start px-4 mt-2">
							{t('import-customers')}
						</Button>
					</Link>
				</div>
			</PageHeader>
			{/* <Grid className="gap-2">
				<Row className="grid h-[44px] grid-cols-12">
					<H6 className="col-span-4">{t('name')}</H6>
					<H6 className="col-span-4">{t('email')}</H6>
					<H6 className="col-span-2">{t('phone')}</H6>
					<H6 className="col-span-2">{t('role')}</H6>
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
									<DeleteButton onClick={handleDeleteCustomer}></DeleteButton>
								</Row>
							</Link>
						))}
						<PaginationButtons />
					</>
				) : (
					<Row className="h-[52px]">{`No users are found.`}</Row>
				)}
			</Grid> */}

			<Table
				cols={[t('name'), t('email'), t('phone'), 'Subscribed']}
				body={current.map((customer) => {
					return {
						id: customer.id,
						cells: [
							{
								wrap: true,
								element: (
									<div className="flex items-center justify-start space-x-2">
										<Paragraph className="font-semibold">
											{customer.firstName} {customer.lastName}
										</Paragraph>
									</div>
								),
							},
							{ wrap: true, text: customer.email },
							{ wrap: true, text: customer.phone },
							{
								wrap: true,
								element: <CheckBox checked={customer.isOptInMessages} />,
							},
						],
					};
				})}
			></Table>

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
		</div>
	);
}

CustomersPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default CustomersPage;

export async function getServerSideProps({
	locale,
	query,
}: GetServerSidePropsContext) {
	const client = await clientPromise;
	const { slug } = query as { slug: string };

	const customers = await getCustomersByDispensary({
		client,
		where: { teamSlug: slug },
	});

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			teamFeatures: env.teamFeatures,
			customers: JSON.parse(JSON.stringify(customers)),
		},
	};
}
