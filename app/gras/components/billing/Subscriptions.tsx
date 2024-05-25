import { type Service, type Subscription } from '@cd/data-access';
import { useTranslation } from 'next-i18next';
import { H2, Paragraph } from '@cd/ui-lib';

interface SubscriptionsProps {
	subscriptions: (Subscription & { product: Service })[];
}

const Subscriptions = ({ subscriptions }: SubscriptionsProps) => {
	const { t } = useTranslation('common');

	if (subscriptions.length === 0) {
		return null;
	}

	return (
		<div className="space-y-3">
			<H2 className="card-title text-xl font-medium leading-none tracking-tight">
				{t('subscriptions')}
			</H2>
			<table className="table w-full text-sm border">
				<thead>
					<tr>
						<th>ID</th>
						<th>{t('plan')}</th>
						<th>{t('start-date')}</th>
						<th>{t('end-date')}</th>
					</tr>
				</thead>
				<tbody>
					{subscriptions.map((subscription) => (
						<tr key={subscription.id}>
							<td>{subscription.id}</td>
							<td>{subscription.product.name}</td>
							<td>{new Date(subscription.startDate).toLocaleDateString()}</td>
							<td>{new Date(subscription.endDate).toLocaleDateString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Subscriptions;
