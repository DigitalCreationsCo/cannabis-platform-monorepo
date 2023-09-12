import { AddressCreateType, Coordinates } from '@cd/data-access';
import { coordinatesIsEmpty, getCoordinatePairFromCoordinates, getGeoJsonPairFromCoordinates } from '../../src/utils/geo.util';
const coordinates1:Coordinates = {
    latitude: 58.123,
    longitude: 58.124,
    radius: 10000,
    id: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
}
const coordinates2:Coordinates = {
    latitude: 58.2353,
    longitude: 28.2353,
    radius: 10000,
    id: '124',
    createdAt: new Date(),
    updatedAt: new Date(),
}
const coordinates3:Coordinates = {
    latitude: 25.2353,
    longitude: 77.3333,
    radius: 10000,
    id: '125',
    createdAt: new Date(),
    updatedAt: new Date(),
}

describe('getCoordinatePairFromCoordinates', () => {
    expect(getCoordinatePairFromCoordinates(coordinates1)).toBe([58.124, 58.123]);
    expect(getCoordinatePairFromCoordinates(coordinates2)).toBe([28.2353, 58.2353]);
    expect(getCoordinatePairFromCoordinates(coordinates3)).toBe([77.3333, 25.2353]);
})
describe('getGeoJsonPairFromCoordinates', () => {
    expect(getGeoJsonPairFromCoordinates(coordinates1)).toBe({
        type: 'Point',
        coordinates: [58.124, 58.123],
    });
    expect(getGeoJsonPairFromCoordinates(coordinates2)).toBe({
        type: 'Point',
        coordinates: [28.2353, 58.2353],
    });
    expect(getGeoJsonPairFromCoordinates(coordinates3)).toBe({
        type: 'Point',
        coordinates: [77.3333, 25.2353],
    });
})
describe('coordinatesIsEmpty', () => {
    expect(coordinatesIsEmpty({coordinates: coordinates1} as AddressCreateType)).toBe(false);
    expect(coordinatesIsEmpty({coordinates: coordinates2} as AddressCreateType)).toBe(false);
    expect(coordinatesIsEmpty({coordinates: coordinates3} as AddressCreateType)).toBe(false);
    expect(coordinatesIsEmpty({coordinates: {}} as AddressCreateType)).toBe(true);
    expect(coordinatesIsEmpty({coordinates: undefined} as AddressCreateType)).toBe(true);
    expect(coordinatesIsEmpty({coordinates: { latitude: 0, longitude: 0 }} as AddressCreateType)).toBe(true);
    expect(coordinatesIsEmpty({coordinates: { latitude: 0 }} as AddressCreateType)).toBe(true);
    expect(coordinatesIsEmpty({coordinates: { longitude: 0 }} as AddressCreateType)).toBe(true);
})