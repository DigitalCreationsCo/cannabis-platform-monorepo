import Realm, { type GeoPoint, BSON, type ObjectSchema } from 'realm';

export class DriverSession extends Realm.Object<DriverSession> {
	_id!: BSON.ObjectId;
	isOnline!: boolean;
	isActiveDelivery!: boolean;
	route!: GeoPoint[];
	id!: string;

	static schema: ObjectSchema = {
		name: 'driver_session',
		primaryKey: 'id',
		properties: {
			_id: { type: 'objectId', default: () => new BSON.ObjectId() },

			isOnline: { type: 'bool', default: false },
			isActiveDelivery: { type: 'bool', default: false },

			route: { type: 'list', default: [] },
			currentCoordinates: 'double[]',

			email: 'string',
			phone: 'string',

			firstName: 'string',
			lastName: 'string',

			id: 'string',
		},
	};
}
