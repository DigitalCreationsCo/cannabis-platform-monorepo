import { Coordinates } from '@cd/data-access';

class util {
	static isEmpty(object: any) {
		if (object === undefined) return true;

		if (object === null) return true;

		if (Object.keys(object).length === 0) return true;

		return false;
	}

	static getGeoJsonPoint(coordinates: Coordinates) {
		console.info('is coordinates? ', coordinates);

		return (
			(coordinates.latitude &&
				coordinates.longitude && {
					type: 'Point',
					coordinates: [coordinates.longitude, coordinates.latitude],
				}) ||
			null
		);
	}
}

export default util;
