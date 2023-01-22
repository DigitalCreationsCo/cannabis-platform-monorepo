import axios from 'axios';
import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';
import { urlBuilder } from '../../../src/utils';

const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);

const cache = new NodeCache({ stdTTL: 30 });

const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = { user: { username: 'kbarnes', firstName: 'Katie', lastName: 'Barnes', organizationId: '2' } };
    const { user } = session;
    return user;
};

// get all users in organization
handler.get(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        const user = getUserInfo({ req });
        const { organizationId } = user;
        req.organizationId = organizationId;

        if (cache.has('users')) {
            const users = cache.get('users');
            return res.status(200).json(users);
        }
        const { data } = await axios(urlBuilder.main.usersByOrgId(organizationId));
        cache.set('users', data);
        return res.status(res.statusCode).json(data);
    } catch (error) {
        console.error(error.message);
        return res.json(error);
    }
});

// create new user from admin dashboard
// handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const { email, password, last_name, first_name, role, phone } = req.body;
//         const userExists = await User.findOne({ email: email });

//         if (userExists) {
//             res.status(400);
//             throw new Error('User Exists with given email address');
//         }
//         // password hash
//         const hashPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             role,
//             email,
//             phone,
//             last_name,
//             first_name,
//             password: hashPassword,
//             avatar: `https://ui-avatars.com/api/?name=${first_name}+${last_name}`,
//         });

//         const savedUser = await newUser.save();
//         res.status(201).json({
//             _id: savedUser._id,
//             role: savedUser.role,
//             email: savedUser.email,
//             name: `${savedUser.first_name} ${savedUser.last_name}`,
//         });
//     } catch (error) {
//         throw new Error(error.message);
//     }
// });

// admin edit user data
// handler.put(async (req: ExtendRequest, res: NextApiResponse) => {
//     try {
//         const { id, role, email, phone, password, last_name, first_name } = req.body;
//         const user = await User.findById(id);

//         if (user) {
//             // update password hash
//             const hashPasword = password && (await bcrypt.hash(password, 10));
//             const updateUser = await User.updateOne(
//                 { _id: id },
//                 { last_name, first_name, role, email, phone, password: hashPasword || user.password }
//             );

//             return res.status(200).json(updateUser);
//         } else {
//             throw new Error('User not exists with given id');
//         }
//     } catch (error) {
//         throw new Error(error.message);
//     }
// });

export default handler;
