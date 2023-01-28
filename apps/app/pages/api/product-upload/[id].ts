import { ImageProduct } from '@cd/data-access';
import axios from 'axios';
import { authMiddleware, healthCheckMiddleware } from 'middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { urlBuilder } from '../../../src/utils';

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
handler.use(authMiddleware).use(healthCheckMiddleware);
// .use(parseMultipartForm)

// update product route
handler.put(async (req: ExtendApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const { data } = await axios.put(urlBuilder.main.productUpdate(id), req, {
            responseType: 'stream',
            headers: {
                'Content-Type': req.headers['content-type'],
            },
        });
        data.pipe(res);
    } catch (error) {
        throw new Error(error.message);
    }
});

export const config = {
    api: {
        bodyParser: false,
    },
};
export default handler;
