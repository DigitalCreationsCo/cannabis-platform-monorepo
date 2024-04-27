/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-named-as-default-member */
import path from 'path';
import winston, { createLogger, format, info, transports } from 'winston';

const logFormat = format.printf((info) => {
	if (typeof info.message === 'object') {
		info.message = JSON.stringify(info.message, null, 3);
	}
	return `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`;
});
const console = new winston.transports.Console();
const remote = new transports.Http({
	host: 'localhost',
	path: '/errors',
});

const logger = winston.createLogger({
	level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
	format: format.combine(
		format.label({ label: path.basename(require.main!.filename) }),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.splat(),
		format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
	),
	transports: [
		new transports.Console({
			format: format.combine(format.colorize(), logFormat),
		}),
		// new transports.File({
		// 	filename: 'logs/combined.log',
		// 	format: format.combine(
		// 		// Render in one line in your log file.
		// 		// If you use prettyPrint() here it will be really
		// 		// difficult to exploit your logs files afterwards.
		// 		format.json(),
		// 	),
		// }),
	],
	exitOnError: false,
});

function createRequestLogger(transports = [console]) {
	const requestLogger = createLogger({
		format: getRequestLogFormatter(),
		transports: transports,
	});

	return function logRequest(req: any, res: any, next: () => void) {
		requestLogger.info({ req, res });
		next();
	};
}

function createErrorLogger(transports = [remote, console]) {
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

export { logger, createRequestLogger, createErrorLogger };
