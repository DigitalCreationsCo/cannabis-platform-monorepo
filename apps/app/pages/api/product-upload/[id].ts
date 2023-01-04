import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { urlBuilder } from "../../../src/utils";
import NodeCache from "node-cache";
import { authMiddleware } from 'middleware';
import { ProductUpdatePayload } from "../../products/[id]";
import { ImageProduct } from "@prisma/client";
import formidable from 'formidable';

// const form = formidable({ multiples: true })
// async function parseMultipartForm(req, res, next) {
//   if (req.headers['content-type'] && req.headers['content-type'].indexOf('multipart/form-data') !== -1) {
//     form.parse(req, (err, fields, files) => {
//       if (!err) {
//         req.body = fields;
//         req.files = files;
//       }
//       next();
//     });
//   } else {
//     next();
//   }
// }

interface ExtendApiRequest extends NextApiRequest {
  // files: Express.MulterS3.File[];
  files: ImageProduct[];
}

const handler = nc();
handler.use(authMiddleware)
  // .use(parseMultipartForm)

// update product route
handler.put(async (req: ExtendApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const { data } = await axios.put(urlBuilder.main.productUpdate(id), req, {
      responseType: "stream",
      headers: {
        "Content-Type": req.headers["content-type"]
      }
    });
    data.pipe(res)
    // req.pipe(res)
    // return res.status(res.statusCode).json(data);
  } catch (error) {
    throw new Error(error.message);
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};
export default handler;
