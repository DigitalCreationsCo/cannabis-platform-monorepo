import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { urlBuilder } from '../../../src/utils';

const handler = nc();

const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = { user: { username: 'kbarnes', firstName: 'Katie', lastName: 'Barnes', organizationId: '2' } };
    const { user } = session;
    return user;
};

// get settings by slug
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user = getUserInfo({ req });
        const { organizationId } = user;
        req.organizationId = organizationId;

        const { slug } = req.body;
        const { data } = await axios.post(urlBuilder.main.getSiteSettings(organizationId));
        return res.status(res.statusCode).json(data);
    } catch (error) {
        console.error(error.message);
        return res.json(error);
    }
});

// handler.use(adminMiddleware);
// use for demo file
// handler.use(editorMiddleware);

// update settings by slug
// handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const { name, values } = req.body;
//         const slug = slugify(name, slugifyOption);

//         const settings = await Settings.findOneAndUpdate(
//             { slug: req.query.slug },
//             { $set: { name, values, slug } },
//             { new: true }
//         );
//         return res.status(200).json(settings);
//     } catch (error) {
//         throw new Error(error.message);
//     }
// });

export default handler;
