import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
// import connectDB from "__server__/db";
// import adminMiddleware from "__server__/middleware/adminMiddleware";
// import editorMiddleware from "__server__/middleware/editorMiddleware";
// import errorMiddleware from "__server__/middleware/errorMiddleware";
// import Order from "__server__/model/Order";
import { authMiddleware, ExtendRequest } from 'middleware';
import axios from "axios";
import { urlBuilder } from "../../../src/utils";
import { Prisma } from "@prisma/client";

// api route handler
const handler = nc();

// logged in user checker middleware
handler.use(authMiddleware);

// get a single order
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    // this is the preferred pattern for handling server response VV
    // across ALL apps and systems
    const { data } = await axios(urlBuilder.main.orderById(id))
    return res.status(res.statusCode).json(data)
  } catch (error: any) {
    console.error(error.message);
    return res.json(error);
  }
});

// admin user checker middleware
// handler.use(adminMiddleware);

// delete order route
// handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { id } = req.query;
//     const deleteOrder = await Order.findByIdAndDelete(id);
//     return res.status(200).json(deleteOrder);
//   } catch (error) {
//     console.error(error.message);
//     return res.json(error);
//   }
// });

export default handler;
