/* eslint-disable jest/no-commented-out-tests */
import { shallow } from 'enzyme';
import { VerifyPhotoId } from '../../components';

describe('Verify Photo Id tests', () => {
	it('should be defined', () => {
		const wrapper = shallow(<VerifyPhotoId />);
		expect(wrapper).toBeDefined();
	});
	// it('an id with date of birth over 21 years will return idVerified: true and isLegalAge: true', () => {});
	// it('an id with date of birth under 21 years will return idVerified: true and isLegalAge: false', () => {});
	// it('an invalid id will return idVerified: true and isLegalAge: false' and scannedDOB:null, () => {});
	// it('a date of birth that  will return idVerified: true and isLegalAge: false', () => {});
});
