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

// api route handler
const handler = nc();

// logged in user checker middleware
handler.use(authMiddleware);

// get a single order
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const { data } = await axios(urlBuilder.main.getOrderById(id))
    if (!data) {
      res.status(404).json("Order Not Found")
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    return res.json(error);
  }
});

// admin user checker middleware
// handler.use(adminMiddleware);

// update order
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const { data } = await axios(urlBuilder.main.getOrderById(id))
    // await Order.findByIdAndUpdate(
    //   id,
    //   { $set: req.body },
    //   { new: true, upsert: true }
    // );
    return res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    return res.json(error);
  }
});

// delete order route
handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const deleteOrder = await Order.findByIdAndDelete(id);
    return res.status(200).json(deleteOrder);
  } catch (error) {
    throw new Error(error.message);
  }
});

export default handler;
