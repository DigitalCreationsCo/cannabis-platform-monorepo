import { type UserCreateType } from '@cd/data-access';

/**
 * isEmpty
 * @param object
 * @returns true if object is an object and is empty, false otherwise
 */
export function isEmpty(object: any) {
	return (object && Object.keys(object).length === 0) || false;
}

/**
 * isArray
 * @param val
 * @returns true if val is an array, false otherwise
 */
export const isArray = (val: any) => {
	return Object.prototype.toString.apply(val) === '[object Array]';
};

/**
 * formats any user data from form data into data shape for db insert / update
 * @param user
 * returns UserCreateType ready for db
 */
export const normalizeUserData = (user: UserCreateType) => {
	if (typeof user.profilePicture === 'string')
		user.profilePicture = { location: user.profilePicture };
	if (user.address && !isArray(user.address)) {
		user = { ...user, address: [{ ...user.address }] };
	}
	return user;
};

export const pruneData = (data: Record<string, any>, fields: string[]) => {
	return Object.keys(data)
		.filter((field) => !fields.includes(field))
		.reduce((obj, key) => {
			return {
				...obj,
				[key]: data[key],
			};
		}, {});
};

export const shuffle = (array: any[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export function dateToString(doc: any) {
	if (doc != null || doc != undefined) {
		Object.keys(doc).forEach((key) => {
			// console.info("key pair: ", doc[key]);
			if (typeof doc[key] === 'object' && doc[key] !== null) {
				// console.info("object found");
				dateToString(doc[key]);
			}
			// if type is date
			if (
				typeof doc[key] === 'object' &&
				doc[key] !== null &&
				Object.prototype.toString.call(doc[key]) === '[object Date]'
			) {
				doc[key] = JSON.parse(JSON.stringify(doc[key]));
			}
		});
	}
	return doc;
}

export function addressObjectIntoArray(user: any): UserCreateType {
	const address = user.address;
	if (!isArray(address)) user.address = [address];
	return user;
}

/**
 * For two arrays, reconcile the first array with duplicate or new items from the second array
 * @param state Array
 * @param payload Array
 * @returns Array
 */
export function reconcileStateArray<T>(state: T[], payload: T[]) {
	// console.log('state ', state);
	// console.log('payload', payload);
	let s = state;
	payload.forEach((item) => {
		// @ts-ignore
		const index = s.findIndex((i) => i.id === item.id);
		if (index === -1) s = [...s, item];
		else s[index] = item;
	});
	return s;
}
