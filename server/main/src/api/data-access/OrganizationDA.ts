import prisma from "@cd/data-access"

let collections = {
  orgs: 'organization'
}

let orgs

/* =================================
Organization Data Access - data class for organization table

members:

================================= */

export default class OrganizationDA {
  // static async injectDB(conn) {
  //   try {
  //     if ( orgs ) {
  //       return;
  //     }
  //     orgs = await conn[collections.orgs]
  //   } catch (error) {
  //     console.error(`Unable to establish database handles in DriverDA: ${error}`);
  //   }
  // }
}
