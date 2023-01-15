import { NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';
// import slugify from "slugify";
// import connectDB from "__server__/db";
// import adminMiddleware from "__server__/middleware/adminMiddleware";
// import editorMiddleware from "__server__/middleware/editorMiddleware";
// import errorMiddleware from "__server__/middleware/errorMiddleware";
// import Category from "__server__/model/Category";
// import slugifyOption from "__server__/utils/slugifyOption";
import axios from 'axios';
import { authMiddleware, ExtendRequest } from 'middleware';
import { urlBuilder } from '../../../src/utils';

// api route handler
const handler = nc();

// logged in user & admin user checker middleware
handler.use(authMiddleware);

// caching instance
const cache = new NodeCache({ stdTTL: 30 });

// extract this function out, use supertokens
const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = { user: { username: 'kbarnes', firstName: 'Katie', lastName: 'Barnes', organizationId: '2' } };
    const { user } = session;
    return user;
};

// get all categories route
handler.get(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const user = getUserInfo({ req });
        const { organizationId } = user;
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
