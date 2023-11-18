import { getCache, setCache, setCacheEx } from '../../lib/redis-cart';

/* =================================
RedisController - controller class for redis db

members:

getCartCache
setCartCache

================================= */

export default class RedisController {
	static async getCartCache(req, res) {
		try {
			const key = req.params.id || '';
			const cache = await getCache(key);
			if (!cache) throw new Error('cache not found');
			return res.status(201).json({
				success: 'true',
				message: `get cart ${key} is successful.`,
				payload: cache,
			});
		} catch (error: any) {
			console.error('getCartCache: ', error);
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	static async setCartCache(req, res) {
		try {
			const { key, token } = req.body;
			setCache(key, token);
			return res.status(201).json({
				success: 'true',
				message: `cached cart key ${key} is successful.`,
			});
		} catch (error: any) {
			console.info('setCartCache: ', error);
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	static async setCartCacheEx(req, res) {
		try {
			const { key, expire, token } = req.body;
			setCacheEx(key, expire, token);
			return res.status(201).json({
				success: 'true',
				message: `cached cart key ${key} is successful.`,
			});
		} catch (error: any) {
			console.info('setCartCacheEx: ', error);
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}
}
