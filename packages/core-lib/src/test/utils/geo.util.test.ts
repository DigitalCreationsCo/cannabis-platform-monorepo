import { AddressCreateType, Coordinates } from '@cd/data-access';
import {
	coordinatesIsEmpty,
	getCoordinatePairFromCoordinates,
	getGeoJsonPairFromCoordinates,
} from '../..';
const coordinates1: Coordinates = [58.123, 58.124];
const coordinates2: Coordinates = [58.2353, 28.2353];
const coordinates3: Coordinates = [25.2353, 77.3333];

describe('getCoordinatePairFromCoordinates', () => {
	it('should return the correct coordinate pair', () => {
		expect(getCoordinatePairFromCoordinates(coordinates1)).toStrictEqual([
			58.124, 58.123,
		]);
		expect(getCoordinatePairFromCoordinates(coordinates2)).toStrictEqual([
			28.2353, 58.2353,
		]);
		expect(getCoordinatePairFromCoordinates(coordinates3)).toStrictEqual([
			77.3333, 25.2353,
		]);
	});
});
describe('getGeoJsonPairFromCoordinates', () => {
	it('should return the correct coordinate pair', () => {
		expect(getGeoJsonPairFromCoordinates(coordinates1)).toStrictEqual({
			type: 'Point',
			coordinates: [58.124, 58.123],
		});
		expect(getGeoJsonPairFromCoordinates(coordinates2)).toStrictEqual({
			type: 'Point',
			coordinates: [28.2353, 58.2353],
		});
		expect(getGeoJsonPairFromCoordinates(coordinates3)).toStrictEqual({
			type: 'Point',
			coordinates: [77.3333, 25.2353],
		});
	});
});
describe('coordinatesIsEmpty', () => {
	it('should return the correct coordinate pair', () => {
		expect(
			coordinatesIsEmpty({ coordinates: coordinates1 } as AddressCreateType),
		).toStrictEqual(false);
		expect(
			coordinatesIsEmpty({ coordinates: coordinates2 } as AddressCreateType),
		).toStrictEqual(false);
		expect(
			coordinatesIsEmpty({ coordinates: coordinates3 } as AddressCreateType),
		).toStrictEqual(false);
		expect(
			coordinatesIsEmpty({ coordinates: {} } as AddressCreateType),
		).toStrictEqual(true);
		expect(
			coordinatesIsEmpty({ coordinates: undefined } as AddressCreateType),
		).toStrictEqual(true);
		expect(
			coordinatesIsEmpty({
				coordinates: { latitude: 0, longitude: 0 },
			} as AddressCreateType),
		).toStrictEqual(true);
		expect(
			coordinatesIsEmpty({ coordinates: { latitude: 0 } } as AddressCreateType),
		).toStrictEqual(true);
		expect(
			coordinatesIsEmpty({
				coordinates: { longitude: 0 },
			} as AddressCreateType),
		).toStrictEqual(true);
	});
});
