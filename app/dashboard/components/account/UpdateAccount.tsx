import env from '@/lib/env';
import type { StaffMember } from '@cd/data-access';
import UpdateEmail from './UpdateEmail';
import UpdateName from './UpdateName';
import UpdateTheme from './UpdateTheme';
import UploadAvatar from './UploadAvatar';

interface UpdateAccountProps {
	user: Partial<StaffMember>;
	allowEmailChange: boolean;
}

const UpdateAccount = ({ user, allowEmailChange }: UpdateAccountProps) => {
	return (
		<div className="flex gap-6 flex-col">
			<UpdateName user={user} />
			<UpdateEmail user={user} allowEmailChange={allowEmailChange} />
			<UploadAvatar user={user} />
			{env.darkModeEnabled && <UpdateTheme />}
		</div>
	);
};

export default UpdateAccount;
