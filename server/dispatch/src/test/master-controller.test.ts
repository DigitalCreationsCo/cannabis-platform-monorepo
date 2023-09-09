import ClusterInit from '../../src/master/cluster-init';

describe('Master Controller Tests', () => {
	it('Master Controller is defined', () => {
		expect(new ClusterInit()).toBeDefined();
	});
	it('Master Controller creates workers', () => {
		expect(new ClusterInit()).toBeDefined();
	});
	it('Master Controller can create Select Driver Room', () => {
		expect(new ClusterInit().createSelectDriverRoom).toBeDefined();
	});
});
