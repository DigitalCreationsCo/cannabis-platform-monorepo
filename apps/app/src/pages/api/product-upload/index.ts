import { authMiddleware, healthCheckMiddleware } from 'middleware';
import nc from 'next-connect';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 20 });
const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);

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
