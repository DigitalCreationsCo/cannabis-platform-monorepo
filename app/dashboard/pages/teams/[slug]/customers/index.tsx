/* eslint-disable @typescript-eslint/no-unused-vars */
import { FreshSales, useDispensary } from '@gras/core';
import { type Customer } from '@gras/data-access';
import {
	PageHeader,
	Paragraph,
	usePagination,
	type LayoutContextProps,
	Button,
	CheckBox,
	Page,
} from '@gras/ui';
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
		<Page className="bg-light mb-24 p-0 m-0 lg:p-0">
			<PageHeader title="Customers" Icon={UserGroupIcon}>
				<div className="flex flex-row gap-x-5 my-4">
					<Link href={`/teams/${team?.slug}/customers/add`}>
						<Button className="bg-amber-100 hover:bg-amber-200 active:bg-amber-200 place-self-start px-4 mt-2">
							<PlusIcon height={20} width={20} className="mr-1" />
							{t('add-customer')}
						</Button>
					</Link>
					{/* <Link href={`/teams/${team?.slug}/customers/import`}>
						<Button className="bg-amber-100 hover:bg-amber-200 active:bg-amber-200 place-self-start px-4 mt-2">
							{t('import-customers')}
						</Button>
					</Link> */}
				</div>
			</PageHeader>
			<Table
				cols={[t('email'), t('name'), t('phone'), 'Join SMS']}
				body={current.map((customer) => {
					return {
						id: customer.id.toString(),
						cells: [
							{ wrap: true, text: customer.email },
							{
								wrap: true,
								element: (
									<div className="flex items-center justify-start space-x-2">
										<Paragraph>
											{customer.first_name} {customer.last_name}
										</Paragraph>
									</div>
								),
							},
							{ wrap: true, text: customer.mobile_number },
							{
								wrap: true,
								element: (
									<CheckBox
										// checked={Number(customer.sms_subscription_status) === 1}
										checked={true}
									/>
								),
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
		</Page>
	);
}

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

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			teamFeatures: env.teamFeatures,
			customers: JSON.parse(JSON.stringify(customers)),
		},
	};
}
