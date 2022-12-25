import bcrypt from "bcryptjs";
import { User } from "../models";
import { UserDA } from "../data-access";

/* =================================
UserController - controller class for user actions

members:
================================= */

const hashPassword = async (password) => await bcrypt.hash(password, 10);

export default class UserController {
  
}
