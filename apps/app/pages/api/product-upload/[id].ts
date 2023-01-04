import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import axios from 'axios';
import { urlBuilder } from 'utils';
import nc from 'next-connect';
import { authMiddleware } from 'middleware';
import { ProductUpdatePayload } from "../../products/[id]";
import { ImageProduct } from "@prisma/client";

const handler = nc();

// logged in user checker middleware
handler.use(authMiddleware)
    // .use(adminMiddlware)
    // .use(editorMiddleware);

// extract this function out, use supertokens
const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = { user: { username: 'kbarnes', firstName: 'Katie', lastName: 'Barnes', organizationId: '2' } };
    let { user } = session;
    return user;
};

// next api request extend type
interface ExtendApiRequest extends NextApiRequest {
  // files: Express.MulterS3.File[];
  files: ImageProduct[];
}

// update product route
handler.put(async (req: ExtendApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const { data } = await axios.put(urlBuilder.main.productUpdate(id), { 'name': '1'})
    return res.status(res.statusCode).json(data);
  } catch (error) {
    throw new Error(error.message);
  }
});

// export const config = { api: { bodyParser: false } };
export default handler;
