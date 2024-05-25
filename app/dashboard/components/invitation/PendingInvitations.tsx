import { Error, LetterAvatar } from '@/components/shared';
import { Table } from '@/components/shared/table/Table';
import { type ApiResponse, defaultHeaders, useInvitations } from '@cd/core-lib';
import { type Invitation } from '@cd/data-access';
import { H2, Paragraph } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationDialog from '../shared/ConfirmationDialog';

const PendingInvitations = ({ team }: { team: any }) => {
	const [selectedInvitation, setSelectedInvitation] = useState<any>(null);

	const [confirmationDialogVisible, setConfirmationDialogVisible] =
		useState(false);

	const { isLoading, isError, invitations, mutateInvitation } = useInvitations({
		slug: team.slug,
		sentViaEmail: true,
	});

	const { t } = useTranslation('common');

	if (isLoading) {
		return <></>;
	}

	if (isError) {
		return <Error message={isError.message} />;
	}

	const deleteInvitation = async (invitation: Invitation) => {
		if (!invitation) {
			return;
		}

		const sp = new URLSearchParams({ id: invitation.id });

		const response = await fetch(
			`/api/dispensaries/${team.slug}/invitations?${sp.toString()}`,
			{
				method: 'DELETE',
				headers: defaultHeaders,
			},
		);

		const json = (await response.json()) as ApiResponse<unknown>;

		if (!response.ok) {
			toast.error(json.error.message);
			return;
		}

		mutateInvitation();
		toast.success(t('invitation-deleted'));
	};

	if (!invitations || !invitations.length) {
		return null;
	}

	return (
		<div className="space-y-3">
			<div className="space-y-3">
				<H2 className="text-xl font-medium leading-none tracking-tight">
					{t('pending-invitations')}
				</H2>
				<Paragraph className="text-sm text-gray-500 dark:text-gray-400">
					{t('description-invitations')}
				</Paragraph>
			</div>

			<Table
				cols={[t('email'), t('role'), t('expires-at'), t('actions')]}
				body={invitations.map((invitation) => {
					return {
						id: invitation.id,
						cells: [
							{
								wrap: true,
								element: invitation.email ? (
									<div className="flex items-center justify-start space-x-2">
										<LetterAvatar name={invitation.email} />
										<span>{invitation.email}</span>
									</div>
								) : undefined,
							},
							{ text: invitation.role },
							{ wrap: true, text: new Date(invitation.expires).toDateString() },
							{
								buttons: [
									{
										color: 'error',
										text: t('remove'),
										onClick: () => {
											setSelectedInvitation(invitation);
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
				visible={confirmationDialogVisible}
				onCancel={() => setConfirmationDialogVisible(false)}
				onConfirm={() => deleteInvitation(selectedInvitation)}
				title={t('confirm-delete-member-invitation')}
			>
				{t('delete-member-invitation-warning', {
					email: selectedInvitation?.email,
				})}
			</ConfirmationDialog>
		</div>
	);
};

export default PendingInvitations;
