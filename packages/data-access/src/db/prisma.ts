import { PrismaClient } from '@prisma/client';

// console.info(` :: data-access package is in ${process.env.NODE_ENV} mode.`)
declare global {
  var prisma: PrismaClient | undefined;
}

// const url = process.env?.DATABASE_URL
// console.log('database url: ', url);
// if (!url) {
//     throw new Error(
//         ` :: Cannot create prisma client instance, missing env variable DATABASE_URL.`
//       )
// }
// // console.info(` :: connecting to database at ${url}.`)

const prisma =
  global.prisma ||
  new PrismaClient({
    // datasources: {
    //     db: { url: url }
    // }
  });

function dateToString(doc: any) {
  if (doc != null || doc != undefined) {
    Object.keys(doc).forEach((key) => {
      // console.log("key pair: ", doc[key]);
      if (typeof doc[key] === 'object' && doc[key] !== null) {
        // console.log("object found");
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

  if (Array.isArray(results)) {
    results.length > 0 && results.forEach((doc) => dateToString(doc));
  }
  results = dateToString(results);
  const after = Date.now();

  console.log(
    `Total Query ${params.model}.${params.action} took ${after - before}ms`
  );
  return results;
});

if (process?.env?.['NODE_ENV'] === 'development') global.prisma = prisma;

export default prisma;
