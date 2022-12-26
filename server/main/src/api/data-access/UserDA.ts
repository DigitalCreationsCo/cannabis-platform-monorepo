import prisma from "@cd/data-access"

let collections = {
  users: 'user'
}

let users

/* =================================
User Data Access - data class for user table

members: 

================================= */

export default class UserDA {
  // static async injectDB(conn) {
  //   try {
  //     if ( users ) {
  //       return;
  //     }
  //     users = await conn[collections.users]
  //   } catch (error) {
  //     console.error(`Unable to establish database handles in DriverDA: ${error}`);
  //   }
  // }
}
