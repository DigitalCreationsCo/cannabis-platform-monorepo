export const getPhoneWithoutDialCode = (phone: string) => {
	const dialCode = '+1';
	return phone.startsWith(dialCode) ? phone.split(dialCode)[1] : phone;
};
