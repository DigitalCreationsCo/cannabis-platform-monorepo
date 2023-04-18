import prisma from "@cd/data-access"

let collections = {
  drivers: 'driver',
  driverSessions: 'driverSession',
}

let drivers, driverSessions

/* =================================
Driver Data Access - data class for driver, driverSession table

members:

================================= */

export default class DriverDA {
  // static async injectDB(conn) {
  //   try {
  //     if (drivers && driverSessions) {
  //     return;
  //   }
  //     drivers = await conn[collections.drivers]
  //     driverSessions = await conn[collections.driverSessions]
  //   } catch (error) {
  //     console.error(`Unable to establish database handles in DriverDA: ${error}`);
  //   }
  // }
}
