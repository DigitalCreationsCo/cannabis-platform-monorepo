import { IconEye as EyeIcon, IconEyeCancel as  EyeSlashIcon } from '@tabler/icons-react';

const TogglePasswordVisibility = ({
	isPasswordVisible,
	handlePasswordVisibility,
}: {
	isPasswordVisible: boolean;
	handlePasswordVisibility: () => void;
}) => {
	return (
		<button
			onClick={handlePasswordVisibility}
			className="flex pointer my-auto self-center items-center text-white absolute right-3 top-[50px]"
			type="button"
		>
			{!isPasswordVisible ? (
				<EyeIcon className="h-6 w-4 text-primary" />
			) : (
				<EyeSlashIcon className="h-6 w-4 text-primary" />
			)}
		</button>
	);
};

export default TogglePasswordVisibility;
