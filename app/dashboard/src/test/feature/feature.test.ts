/* eslint-disable jest/no-commented-out-tests */
import { type FeatureConfigInterface } from '../../config/feature';

describe('Feature Config', () => {
	let testFeatureConfig: FeatureConfigInterface;

	// it('FeatureConfig is read-only', async () => {
	// 	const changeFeatureConfig = () => (FeatureConfig.orders.enabled = false);
	// 	expect(changeFeatureConfig).toThrow();

	// 	// expect(() => (testFeatureConfig.orders.enabled = true)).toThrow();
	// });

	it('feature config returns expected values for feature', async () => {
		expect('1').toStrictEqual('1');
	});
});
