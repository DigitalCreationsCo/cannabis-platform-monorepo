import { defaultHeaders, availableRoles, type ApiResponse } from '@cd/core-lib';
import { type Dispensary, type StaffMember } from '@cd/data-access';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';

interface UpdateMemberRoleProps {
	team: Dispensary;
	member: StaffMember;
}

const UpdateMemberRole = ({ team, member }: UpdateMemberRoleProps) => {
	const { t } = useTranslation('common');

	const updateRole = async (member: StaffMember, role: string) => {
		const response = await fetch(`/api/dispensaries/${team.slug}/members`, {
			method: 'PATCH',
			headers: defaultHeaders,
			body: JSON.stringify({
				memberId: member.userId,
				role,
			}),
		});

		const json = (await response.json()) as ApiResponse;

		if (!response.ok) {
			toast.error(json.error.message);
			return;
		}

		toast.success(t('member-role-updated'));
	};

	return (
		<select
			className="select select-bordered select-sm rounded"
			defaultValue={member.role}
			onChange={(e: any) => updateRole(member, e.target.value)}
		>
			{availableRoles.map((role) => (
				<option value={role.id} key={role.id}>
					{role.id}
				</option>
			))}
		</select>
	);
};

export default UpdateMemberRole;
