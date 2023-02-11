import axios from 'axios';
import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';
import { getUserInfo, urlBuilder } from '../../../src/utils';

const cache = new NodeCache({ stdTTL: 30 });
const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);

// get all categories route
handler.get(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        const { user } = getUserInfo({ req });
        const { organizationId } = user.memberships[0];
        req.organizationId = organizationId;
        if (cache.has('categories')) {
            console.log('cache found');
            const categories = cache.get('categories');
            return res.status(200).json(categories);
        }
        const { data } = await axios(urlBuilder.main.categoryList(organizationId));
        cache.set('categories', data);
        console.log('setting cache');
        return res.status(res.statusCode).json(data);
    } catch (error) {
        // throw new error to handle any error discrepancy between frontend and next api
        throw new Error(error.response.data);
    }
});

// add a new Category to CategoryList
// handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { name, icon } = req.body;
//     const slug = slugify(name, slugifyOption);

//     const find_slug = await Category.findOne({ slug });
//     if (find_slug) {
//       res.status(400);
//       throw new Error("Category already exists with given name");
//     }

//     const category = new Category({ name, slug, icon });
//     const createdCategory = await category.save();
//     return res.status(201).json(createdCategory);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

export default handler;
