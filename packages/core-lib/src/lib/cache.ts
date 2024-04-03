const cacheGet = (key: string) => {
	const cachedData = localStorage.getItem(key);
	if (cachedData) {
		return JSON.parse(cachedData);
	}
	return null;
};

const cacheSet = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const cacheDelete = (key: string) => {
	localStorage.removeItem(key);
};

const cacheKeys = () => {
	const keys = [];
	for (let i = 0; i < localStorage.length; i++) {
		keys.push(localStorage.key(i));
	}
	return keys;
};

export default function localStorageProvider() {
	// When initializing, we restore the data from `localStorage` into a map.
	let map: Map<string, any>;

	if (typeof window !== 'undefined') {
		// map = new Map();
		map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

		// if cacheProvider is expired, mutate the cache

		if (!map.has('expires') || map.get('expires') < Date.now()) {
			map.clear();
		} else {
			map.set('expires', Date.now() + 1000 * 60 * 60 * 24 * 1); // 1 day (in ms)
		}
		// Before unloading the app, we write back all the data into `localStorage`.
		window.addEventListener('beforeunload', () => {
			const appCache = JSON.stringify(Array.from(map.entries()));
			localStorage.setItem('app-cache', appCache);
		});
	} else map = new Map();

	// We still use the map for write & read for performance.
	return map;
}
export { cacheGet, cacheSet, cacheDelete, cacheKeys };
