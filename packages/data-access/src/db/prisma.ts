import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

function dateToString(doc: any) {
	if (doc != null || doc != undefined) {
		Object.keys(doc).forEach((key) => {
			// if type is non-null object
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

prisma.$use(async (params: any, next: any) => {
	const before = Date.now();
	let results = await next(params);
	if (Array.isArray(results))
		results.length > 0 && results.forEach((doc) => dateToString(doc));
	results = dateToString(results);
	const after = Date.now();

	console.info(
		`Total Query ${params.model}.${params.action} took ${after - before}ms`
	);
	return results;
});

if (process?.env?.['NODE_ENV'] === 'development') global.prisma = prisma;

export default prisma;
