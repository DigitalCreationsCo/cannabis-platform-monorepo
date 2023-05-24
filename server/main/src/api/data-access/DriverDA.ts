import { MongoClient } from "mongodb";

/* =================================
Driver Data Access - data class for Driver SQL Table

members:
useMongoDB
getDriverById
================================= */

let 
driverSessions;

const 
dispatch_namespace = process.env.DISPATCH_DB_NS;

export default class DriverDA {
  static async useMongoDB (mongoClient: MongoClient) {
    try {

      if (!driverSessions)
      driverSessions = await mongoClient.db(dispatch_namespace).collection("driverSessions");

      return
    } catch (e: any) {
      console.error(`Unable to establish collection handle in DriverDA: ${e}`);
      throw new Error(`Unable to establish collection handle in DriverDA: ${e.message}`)
    }
  }

  static async getDriverById(id) {
    try {
      const data = await findDriverWithDetailsById(id);
      return data;
    } catch (error:any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}