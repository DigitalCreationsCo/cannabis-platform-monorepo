const getPhoneWithoutDialCode = (phone: string) => {
	const dialCode = '+1';
	return phone.startsWith(dialCode) ? phone.split(dialCode)[1] : phone;
};

const prependDialCode = (phone: string, dialCode = '+1') => {
	if (phone.indexOf('+') !== 0) {
		phone = `${dialCode}${phone}`;
	}
	return phone;
};

export { getPhoneWithoutDialCode, prependDialCode }