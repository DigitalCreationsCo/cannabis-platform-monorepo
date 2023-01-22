import axios from 'axios';
import { authMiddleware, healthCheckMiddleware } from 'middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { urlBuilder } from 'utils';
// import uploadMiddleware, { deleteFile } from '__server__/middleware/uploadMiddleware';

// interface ExtendApiRequest extends NextApiRequest {
//     // file: Express.MulterS3.File;
//     // user: ObjectId;
// }

const handler = nc();

handler.use(authMiddleware).use(healthCheckMiddleware);

// get single user route
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;
        const { data } = await axios(urlBuilder.main.getUserDetails(id));
        return res.status(res.statusCode).json(data);
    } catch (error) {
        console.error(error.message);
        return res.json(error);
    }
});

// delete user route
// handler
//     .use(adminMiddleware)
//     .use(editorMiddleware) // use for demo file
//     .delete(async (req: NextApiRequest, res: NextApiResponse) => {
//         try {
//             const { id } = req.query;
//             const deletedUser = await User.findByIdAndDelete(id);
//             if (deletedUser) {
//                 return res.status(200).json({ message: 'User deleted successfully' });
//             } else {
//                 throw new Error('User Not Found!');
//             }
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     });

// handler.use(uploadMiddleware.single('file'));

// update user route
// handler.put(async (req: ExtendApiRequest, res: NextApiResponse) => {
//     try {
//         const { id } = req.query;

//         const user = await User.findById(id);

//         if (req.file && user.avatarKey) {
//             await deleteFile(user.avatarKey);
//         }

//         if (user) {
//             const first_name = req.body.first_name || user.first_name;
//             const last_name = req.body.last_name || user.last_name;
//             const avatar = req.file?.location || user.avatar;
//             const avatarKey = req.file?.key || user.avatarKey;
//             // const password = hashPasword || user.password;
//             const role = req.body.role || user.role;
//             const dateOfBirth = JSON.parse(req.body.dateOfBirth) || user.dateOfBirth;
//             const phone = req.body.phone || user.phone;

//             const updateUser = await User.findByIdAndUpdate(
//                 id,
//                 { $set: { first_name, last_name, avatar, role, dateOfBirth, phone, avatarKey } },
//                 { new: true, upsert: true }
//             ).select(['-__v', '-password', '-createdAt', '-updatedAt']);

//             return res.status(200).json(updateUser);
//         } else {
//             throw new Error('User not exists with given id');
//         }
//     } catch (error) {
//         throw new Error(error.message);
//     }
// });

export const config = { api: { bodyParser: false } };
export default handler;
