/* eslint-disable import/order */
import { type Dispensary } from '@cd/data-access';
import { EmptyState, WithLoadingAndError } from '@/components/shared';
import ConfirmationDialog from '@/components/shared/ConfirmationDialog';
type ApiKey = any;
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import type { ApiResponse } from '@cd/core-lib';
import { Button, H2, Paragraph } from '@cd/ui-lib';
import { Table } from '@/components/shared/table/Table';
import NewAPIKey from './NewAPIKey';

interface APIKeysProps {
	team: Dispensary;
}

const APIKeys = ({ team }: APIKeysProps) => {
	const { t } = useTranslation('common');
	// const { data, isLoading, error, mutate } = useAPIKeys(team.slug);
	const [selectedApiKey, setSelectedApiKey] = useState<ApiKey | null>(null);
	const [createModalVisible, setCreateModalVisible] = useState(false);
	const [confirmationDialogVisible, setConfirmationDialogVisible] =
		useState(false);

	// Delete API Key
	const deleteApiKey = async (apiKey: ApiKey | null) => {
		if (!apiKey) {
			return;
		}

		const response = await fetch(
			`/api/dispensaries/${team.slug}/api-keys/${apiKey.id}`,
			{
				method: 'DELETE',
			},
		);

		setSelectedApiKey(null);
		setConfirmationDialogVisible(false);

		if (!response.ok) {
			const { error } = (await response.json()) as ApiResponse;
			toast.error(error.message);
			return;
		}

		// mutate();
		toast.success(t('api-key-deleted'));
	};

	// const apiKeys = data?.data ?? [];
	const apiKeys: ApiKey[] = [];

	return (
		<WithLoadingAndError isLoading={true} error={'error'}>
			<div className="space-y-3">
				<div className="flex justify-between items-center">
					<div className="space-y-3">
						<H2 className="text-xl font-medium leading-none tracking-tight">
							{t('api-keys')}
						</H2>
						<Paragraph className="text-sm text-gray-500 dark:text-gray-400">
							{t('api-keys-description')}
						</Paragraph>
					</div>
					<Button
						color="primary"
						size="md"
						onClick={() => setCreateModalVisible(true)}
					>
						{t('create-api-key')}
					</Button>
				</div>
				{apiKeys.length === 0 ? (
					<EmptyState
						title={t('no-api-key-title')}
						description={t('api-key-description')}
					/>
				) : (
					<>
						<Table
							cols={[t('name'), t('status'), t('created'), t('actions')]}
							body={apiKeys.map((apiKey) => {
								return {
									id: apiKey.id,
									cells: [
										{ wrap: true, text: apiKey.name },
										{
											badge: {
												color: 'success',
												text: t('active'),
											},
										},
										{
											wrap: true,
											text: new Date(apiKey.createdAt).toLocaleDateString(),
										},
										{
											buttons: [
												{
													color: 'error',
													text: t('revoke'),
													onClick: () => {
														setSelectedApiKey(apiKey);
														setConfirmationDialogVisible(true);
													},
												},
											],
										},
									],
								};
							})}
						></Table>
						<ConfirmationDialog
							title={t('revoke-api-key')}
							visible={confirmationDialogVisible}
							onConfirm={() => deleteApiKey(selectedApiKey)}
							onCancel={() => setConfirmationDialogVisible(false)}
							cancelText={t('cancel')}
							confirmText={t('revoke-api-key')}
						>
							{t('revoke-api-key-confirm')}
						</ConfirmationDialog>
					</>
				)}
				<NewAPIKey
					team={team}
					createModalVisible={createModalVisible}
					setCreateModalVisible={setCreateModalVisible}
				/>
			</div>
		</WithLoadingAndError>
	);
};

export default APIKeys;
