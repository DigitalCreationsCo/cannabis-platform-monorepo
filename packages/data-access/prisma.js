var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
const prisma = global.prisma || new PrismaClient();
function dateToString(doc) {
    if (doc != null || doc != undefined) {
        Object.keys(doc).forEach((key) => {
            // console.log("key pair: ", doc[key]);
            if (typeof doc[key] == "object" && doc[key] !== null) {
                // console.log("object found");
                dateToString(doc[key]);
            }
            if (key == "createdAt" || key == "updatedAt" || key == "deliveredAt" || key == "emailVerified") {
                // doc[key] = doc[key].toString();
                doc[key] = JSON.parse(JSON.stringify(doc[key]));
            }
        });
    }
    return doc;
}
prisma.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const before = Date.now();
    let results = yield next(params);
    if (Array.isArray(results)) {
        results.length > 0 && results.forEach((doc) => dateToString(doc));
    }
    results = dateToString(results);
    // const after = Date.now();
    // console.log(
    //   `Total Query ${params.model}.${params.action} took ${after - before}ms`
    // );
    return results;
}));
if (process.env.NODE_ENV === "development")
    global.prisma = prisma;
export default prisma;
