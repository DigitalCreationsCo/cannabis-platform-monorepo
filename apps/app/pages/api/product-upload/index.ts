import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import axios from 'axios';
import { urlBuilder } from 'utils';
import nc from 'next-connect';
import { authMiddleware } from 'middleware';

const handler = nc();

// logged in user checker middleware
handler.use(authMiddleware);

// caching instance
const cache = new NodeCache({ stdTTL: 20 });

// extract this function out, use supertokens
const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = { user: { username: 'kbarnes', firstName: 'Katie', lastName: 'Barnes', organizationId: '2' } };
    let { user } = session;
    return user;
};

// create new product
// handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const files = req.files;
//         const images = files.map((file) => ({ key: file.key, location: file.location }));
//         const { name, category, description, stock, price, discount, tags, unit } = req.body;

//         const productData = {
//           item: name,
//           tags: JSON.parse(tags),
//           description: description,
//           categories: JSON.parse(category),
//           features: ["Fresh", "Without Formaline"],
//           skus: [
//             {
//               unit,
//               color: [],
//               sku: name,
//               quantity: stock,
//               image: images,
//               price: { base: price, currency: "USD", discount: discount || 0 },
//             },
//           ],
//         };

//         const product = new Product(productData);
//         const createdProduct = await product.save();
//         return res.status(201).json(createdProduct);
//     } catch (error) {
//         console.error(error.message);
//         return res.json(error);
//     }
// });

export default handler;
