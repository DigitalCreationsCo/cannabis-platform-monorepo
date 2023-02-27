import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { signIn } from 'supertokens-auth-react/recipe/emailpassword';

const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);

handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        // const formData: userLoginData = req.body;
        // console.log('NEXT: form data: ', formData);
        // // const { session, user } = await getSession();
        // // if (session && user) return res.json(session);
        // const { data } = await axios.post(urlBuilder.main.signin(), formData, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        console.log('sign in');
        const response = await signIn({
            formFields: [
                {
                    id: 'email',
                    value: req.body.email
                },
                {
                    id: 'password',
                    value: req.body.password
                }
            ]
        });
        console.log('sign in 2d');
        if (response.status === 'WRONG_CREDENTIALS_ERROR') {
            throw new Error('Email is incorrect.');
        }
        return res.status(res.statusCode).json('Successful');
    } catch (error) {
        // throw new error to handle any error discrepancy between frontend and next api
        console.error(error.message);
        throw new Error(error.response.data);
    }
});

export default handler;

type userLoginData = {
    email: string;
    password: string;
};
