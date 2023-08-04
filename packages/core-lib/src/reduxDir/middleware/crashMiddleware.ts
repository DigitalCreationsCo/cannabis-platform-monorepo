/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const crashMiddleware = (store) => (next) => (action) => {
	try {
		return next(action);
	} catch (error) {
		console.info('Crash Middleware: Caught an exception: ');
		console.info(error);
		throw error;
	}
};

export default crashMiddleware;
