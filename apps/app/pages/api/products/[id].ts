import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { urlBuilder } from '../../../src/utils';
// import adminMiddleware from "__server__/middleware/adminMiddleware";
// import editorMiddleware from "__server__/middleware/editorMiddleware";
// import errorMiddleware from "__server__/middleware/errorMiddleware";
// import { deleteFiles } from "__server__/middleware/uploadMiddleware";
import { authMiddleware, healthCheckMiddleware } from 'middleware';

// api route handler
const handler = nc();

// logged in user checker and admin user checker middleware
handler.use(authMiddleware).use(healthCheckMiddleware);

// get a single product
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const { data } = await axios(urlBuilder.main.productById(id));
        return res.status(res.statusCode).json(data);
    } catch (error) {
        console.error(error.message);
        return res.json(error);
    }
});

// admin user checker middleware
// handler.use(adminMiddleware);

// use for demo file
// handler.use(editorMiddleware);

// delete product route
// handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { id } = req.query;
//     const product = await Product.findById(id);

//     const images = product.skus[0]?.image?.map((item) => ({ Key: item.key }));

//     if (images?.length > 0) {
//       await deleteFiles(images);
//     }
//     const deleteProduct = await Product.deleteOne({ _id: id });
//     return res.status(200).json(deleteProduct);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

export default handler;
