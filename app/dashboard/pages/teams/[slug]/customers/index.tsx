/* eslint-disable @typescript-eslint/no-unused-vars */
import { FreshSales, useDispensary } from '@cd/core-lib';
import { type Customer } from '@cd/data-access';
import {
	PageHeader,
	Paragraph,
	usePagination,
	type LayoutContextProps,
	Button,
	CheckBox,
} from '@cd/ui-lib';
import { PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { requestAsyncStorage } from 'next/dist/client/components/request-async-storage.external';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Table } from '@/components/shared/table/Table';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import env from '@/lib/env';

interface CustomerDashboardProps {
	customers: Customer[];
}

function CustomersPage({ customers }: CustomerDashboardProps) {
	const { t } = useTranslation();
	const { isLoading, isError, team } = useDispensary();

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
				// THIS API DOESNT EXIST
				await axios.delete(
					`/api/dispensaries/${team.slug}/customers/${deleteId}`
				);
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
			<PageHeader title="Customers" Icon={UserGroupIcon}>
				<div className="flex flex-row gap-x-5 my-4">
					{/* <Link href="/customers/add">
						<Button className="bg-amber-100 hover:bg-amber-200 active:bg-amber-200 place-self-start px-4 mt-2">
							{t('add-customer')}{' '}
							<PlusIcon height={20} width={20} className="ml-1" />
						</Button>
					</Link> */}
					<Link href="/customers/import">
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
				cols={[t('email'), t('name'), t('phone'), 'Subscribed']}
				body={current.map((customer) => {
					return {
						id: customer.id.toString(),
						cells: [
							{ wrap: true, text: customer.email },
							{
								wrap: true,
								element: (
									<div className="flex items-center justify-start space-x-2">
										<Paragraph className="font-semibold">
											{customer.first_name} {customer.last_name}
										</Paragraph>
									</div>
								),
							},
							{ wrap: true, text: customer.mobile_number },
							{
								wrap: true,
								element: <CheckBox checked={!!customer.subscription_status} />, // SUBSCRIPTION STATUS??
								// element: <CheckBox checked={!!customer.sms_subscription_status} />, // SUBSCRIPTION STATUS??
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
	req,
	res,
}: GetServerSidePropsContext) {
	(req as any).query = query;
	const teamMember = await throwIfNoDispensaryAccess(req, res);

	const customers = await FreshSales.getSegmentCustomers(
		teamMember.team.weedTextSegmentId ?? ''
	);

	// const customers = await getCustomersByDispensary({
	// 	client,
	// 	where: { teamSlug: slug },
	// });

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			teamFeatures: env.teamFeatures,
			customers: JSON.parse(JSON.stringify(customers)),
		},
	};
}
