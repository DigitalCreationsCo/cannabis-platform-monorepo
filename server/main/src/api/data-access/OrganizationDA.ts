import { findCategoryListByOrg } from "@cd/data-access";

/* =================================
Organization Data Access - data class for organization table

members:
getCategoryList

================================= */

export default class OrganizationDA {
  
  // find CategoryList by organizationId, default arg is 1 for platform wide CategoryList
  static async getCategoryList(organizationId = '1') {
    try {
      const data = await findCategoryListByOrg(organizationId);
      return data
    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
}
