import { axios} from '../src/axiosInstance'

describe('axios instance', () => {
	it('should be defined', () => {
		expect(axios).not.toBe(undefined)
	});
});
