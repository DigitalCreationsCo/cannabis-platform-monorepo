import { getPhoneWithoutDialCode } from '../../src/utils/phone.util';

describe('PhoneUtil', () => {
	it('split area code from phone number', () => {
		const phone = '+14155552671';
		expect(getPhoneWithoutDialCode(phone)).toEqual('4155552671');
	});
});
