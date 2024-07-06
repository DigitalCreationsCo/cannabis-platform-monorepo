import { useDispensary } from '@cd/core-lib';
import {
	Button,
	FlexBox,
	Grid,
	LoadingPage,
	Page,
	PageHeader,
	TextField,
} from '@cd/ui-lib';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Error as ErrorComponent } from '@/components/shared';

export default function AddCustomer() {
	const { t } = useTranslation('common');
	const { isLoading, isError, team } = useDispensary();

	if (isLoading) {
		return <LoadingPage />;
	}

	if (isError) {
		return <ErrorComponent message={isError.message} />;
	}

	if (!team) {
		return <ErrorComponent message={t('team-not-found')} />;
	}

	return (
		<Page className="bg-light lg:min-h-[710px]">
			<PageHeader
				title={`Add Customer`}
				Icon={UserPlusIcon}
				Button={
					<Link href={`/teams/${team.slug}/customers`}>
						<Button>{`Back to Users`}</Button>
					</Link>
				}
			/>
			<Grid>
				<TextField
					label="Name"
					name={`Name`}
					value={''}
					onChange={() => null}
				/>
				<FlexBox className="items-stretch justify-center py-2">
					<Button className="flex grow">{`Save Customer`}</Button>
				</FlexBox>
			</Grid>
		</Page>
	);
}
