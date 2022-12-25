import bcrypt from "bcryptjs";
import { Organization, Product, Order } from "../models";
import { OrganizationDA } from "../data-access";

/* =================================
OrganizationController - controller class for organization management actions

members:
================================= */

const hashPassword = async (password) => await bcrypt.hash(password, 10);

export default class OrganizationController {
  
}
