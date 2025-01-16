/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loggerMiddleware = (store) => (next) => (action) => {
	return next(action);
};

export default loggerMiddleware;
