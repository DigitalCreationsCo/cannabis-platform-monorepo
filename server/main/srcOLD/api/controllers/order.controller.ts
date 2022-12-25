import bcrypt from "bcryptjs";
import { Order } from "../models";
import { OrderDA } from "../data-access";

/* =================================
OrderController - controller class for 

================================= */

const hashPassword = async (password) => await bcrypt.hash(password, 10);

export default class OrderController {

}
