import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

function dateToString(doc: any) {
  if (doc != null || doc != undefined) {
    Object.keys(doc).forEach((key) => {
      // console.log("key pair: ", doc[key]);
      if (typeof doc[key] == "object" && doc[key] !== null) {
        // console.log("object found");
        dateToString(doc[key]);
      }
      if (key == "createdAt" || key == "updatedAt" || key == "deliveredAt" || key == "emailVerified") {
        // doc[key] = doc[key].toString();
        doc[key] = JSON.parse(JSON.stringify(doc[key]))
      }
    });
  }
  return doc;
}

prisma.$use(async (params, next) => {
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

if (process?.env?.["NODE_ENV"] === "development") global.prisma = prisma;

export default prisma;