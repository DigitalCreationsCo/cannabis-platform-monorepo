import bcrypt from "bcryptjs";
import { Organization, Product, Order } from "../models";
import { OrganizationDA } from "../data-access";

/* =================================
OrganizationController - controller class for organization management actions

members:
getCategoryList

================================= */

export default class OrganizationController {

    static async getCategoryList(req, res) {
    try {
      const organizationId = req.params.id || ""
      const data = await OrganizationDA.getCategoryList(organizationId)
      if (!data) return res.status(404).json("Categories not found")
      return res.status(200).json(data);
    } catch (error) {
      console.log('API error: ', error)
      res.status(500).json({ error });
    }
  }
}
