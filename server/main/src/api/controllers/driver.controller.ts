import bcrypt from "bcryptjs";
import { Driver, DriverSession } from "../models";
import { DriverDA } from "../data-access";

/* =================================
DriverController - controller class for driver user actions

members:
================================= */

const hashPassword = async (password) => await bcrypt.hash(password, 10);

export default class DriverController {
  
}
