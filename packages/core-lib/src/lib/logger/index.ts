import winston, { createLogger, format, info, transports } from 'winston';

const consoleLog = new transports.Console();
const remoteLog = new transports.Http({
	host: 'localhost',
	path: '/errors',
});

const logger = createLogger({
	format: format.prettyPrint(),
	// format: format.combine(
	// 	format.combine(
	// 		format.colorize(),
	// 		format.timestamp(),
	// 		format.align(),
	// 		format.printf((debug) => {
	// 			const { timestamp, level, message, ...args } = debug;

	// 			const ts = timestamp.slice(0, 19).replace('T', ' ');
	// 			return `${ts} [${level}]: ${JSON.stringify(message)}
	// 			)} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
	// 		}),
	// 	),
	// ),
	transports: [consoleLog],
});

function createRequestLogger(transports = [consoleLog]) {
	const requestLogger = createLogger({
		format: getRequestLogFormatter(),
		transports: transports,
	});

	return function logRequest(req: any, res: any, next: () => void) {
		requestLogger.info({ req, res });
		next();
	};
}

function createErrorLogger(transports = [remoteLog, consoleLog]) {
	const errLogger = createLogger({
		level: 'error',
		transports: transports,
	});

	return function logError(err: any, req: any, res: any, next: () => void) {
		errLogger.error({ err, req, res });
		next();
	};
}

function getRequestLogFormatter() {
	const { combine, timestamp, printf } = format;

	return combine(
		timestamp(),
		printf((info) => {
			const { req, res } = info.message;
			return `${info.timestamp} ${info.level}: ${req.hostname}${
				req.port || ''
			}${req.originalUrl}, ${res.statusCode}`;
		}),
	);
}

// console.log = (...args) => logger.info.call(logger, { ...args });
// console.info = (...args) => logger.info.call(logger, { ...args });
// console.warn = (...args) => logger.warn.call(logger, { ...args });
// console.error = (...args) => logger.error.call(logger, { ...args });
// console.debug = (...args) => logger.debug.call(logger, { ...args });

export { logger, createRequestLogger, createErrorLogger };
