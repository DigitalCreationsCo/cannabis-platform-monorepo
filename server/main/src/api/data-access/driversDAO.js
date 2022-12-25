import { ObjectId } from "mongodb";

let driversColl;
let driverSessionsColl;
let pendingOrdersColl;
export default class DriversDAO {
  static async injectDB(conn) {
    if (driversColl && driverSessionsColl) {
      return;
    }
    try {
      driversColl = await conn.db(process.env.DB_NS).collection("drivers");
      driverSessionsColl = await conn
        .db(process.env.DB_NS)
        .collection("driverSessions");
      pendingOrdersColl = await conn
        .db(process.env.DB_NS)
        .collection("pendingOrders");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  /*====================
  Drivers Data Access Methods
  
  getDriver
    
  In Progress   * = more important
  --------
  getUserByEmail(email)   
  getUserSession(email)   
  addUser(user)           
  loginUser(user, token)  
  logoutUser(email)       
  deleteUser(email)   
  updatePreferences(email, preferences)
  checkAdmin(email)
  makeAdmin(email)
  ====================*/

  // /**
  //  * Finds a user in the `users` collection
  //  * @param {string} email - The email of the desired user
  //  * @returns {Object | null} Returns either a single user or nothing
  //  */

  static async updateOnlineStatus(driverId, onlineStatus) {
    // The issue currently is that this
    // request is returning successfully no
    // matter what and I'm not sure that it's
    // actually doing what it supposed to do
    // so I need to figure out is this finding
    // the right document in the database
    // -- is this update in the field correctly
    // and I need to have a conditional check
    // where if if the body it doesn't contain
    // the right data meaning the driver ID
    // and the and the update status if that's
    // not in the body this needs to error out
    // if the Mongol process does not Work
    // correctly it needs to air out.
    // So it needs proper air handling and his
    // proper success handling as well

    try {
      let query = { driverId: ObjectId(driverId) };
      let update = { $set: { "metadata.isOnline": onlineStatus } };
      // let upsert = { upsert: true };
      let statusResult = await driverSessionsColl.updateOne(query, update);
      console.log(
        "update Online Status: " + statusResult.modifiedCount + " record"
      );
      // if (statusResult.modifiedCount === 0) {
      //   throw new Error(`Did not update the record: ${driverId}`);
      // }
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while updating driver status, ${e}`);
      return { error: e };
    }
  }

  static async updateCurrentLocation(driverId, location) {
    try {
      let query = { driverId: ObjectId(driverId) };
      let update = { $set: { location: location } };
      let statusResult = await driverSessionsColl.updateOne(query, update, {
        w: "majority",
      });
      console.log("statusResult: ", statusResult);
      console.log("updated " + statusResult.modifiedCount + " record");
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while updating driver location, ${e}`);
      return { error: e };
    }
  }
  static async updateOrdersDriverPath(driverPathPacketList) {
    try {
      console.log("updateOrdersDriverPath dao");
      const orderList = driverPathPacketList;
      // add the bulk operation, test in postman
      let updateBulkOp = [];
      let orderId;
      for (orderId in orderList) {
        let pathValues = orderList[orderId];
        let updateOp = {
          updateMany: {
            filter: { orderId },
            update: { $push: { driverPath: { $each: pathValues } } },
          },
        };
        updateBulkOp.push(updateOp);
      }
      let updateResult = await pendingOrdersColl.bulkWrite(updateBulkOp);
      console.log("pushed to " + updateResult.nmodified + " order documents ");
      for (orderId in orderList) {
        console.log("updated order:" + orderId + " >> ", orderList[orderId]);
      }
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while updating order: driver path, ${e}`);
      return { error: e };
    }
  }

  static async getDriverRecordById(driverId) {
    try {
      let projection = {
        projection: {
          _id: 0,
          email: 0,
          address: 0,
          city: 0,
          state: 0,
          zipcode: 0,
          preferences: 0,
          orderHistory: 0,
        },
      };
      const driver = await driversColl.findOne(
        { driverId: ObjectId(driverId) },
        projection
      );
      console.log("driver record returned: ", driver);
      return driver;
    } catch (e) {
      console.error(`Error occurred while retrieving user record, ${e}`);
      return null;
    }
  }

  static async getDriverSessionById(driverId) {
    try {
      let projection = {
        projection: {
          _id: 0,
          email: 0,
          address: 0,
          city: 0,
          state: 0,
          zipcode: 0,
          preferences: 0,
          orderHistory: 0,
        },
      };
      const driver = await driverSessionsColl.findOne(
        { driverId: ObjectId(driverId) },
        projection
      );
      console.log("driver session returned: ", driver);
      return driver;
    } catch (e) {
      console.error(`Error occurred while retrieving user session, ${e}`);
      return null;
    }
  }

  // static async getUserByEmail(email) {
  //   let projection = {
  //     projection: {
  //       _id: false,
  //     },
  //   };
  //   return await users.findOne({ email }, projection);
  // }

  // static async getUserById(customerId) {
  //   try {
  //     let projection = {
  //       projection: {
  //         _id: false,
  //       },
  //     };
  //     return await users.findOne(
  //       { customerId: ObjectId(customerId) },
  //       projection
  //     );
  //   } catch (e) {
  //     console.error(`Error occurred while retrieving user session, ${e}`);
  //     return null;
  //   }
  // }

  // /**
  //  * Gets a user from the `sessions` collection
  //  * @param {string} email - The email of the user to search for in `sessions`
  //  * @returns {Object | null} Returns a user session Object, an "error" Object
  //  * if something went wrong, or null if user was not found.
  //  */
  // static async getUserSession(email) {
  //   try {
  //     let projection = {
  //       projection: {
  //         _id: false,
  //       },
  //     };
  //     return sessions.findOne({ email }, projection);
  //   } catch (e) {
  //     console.error(`Error occurred while retrieving user session, ${e}`);
  //     return null;
  //   }
  // }

  // /**
  //  * Adds a user to the `users` collection
  //  * @param {UserInfo} userInfo - The information of the user to add
  //  * @returns {DAOResponse} Returns either a "success" or an "error" Object
  //  */
  // static async addUser(user) {
  //   try {
  //     await users.insertOne(user, { w: "majority" });
  //     return { success: true };
  //   } catch (e) {
  //     return {
  //       error:
  //         "This " +
  //         Object.keys(e.keyValue) +
  //         " " +
  //         Object.values(e.keyValue) +
  //         " already exists.",
  //     };
  //   }
  // }

  // /**
  //  * Adds a user to the `sessions` collection
  //  * @param {string} email - The email of the user to login
  //  * @param {string} jwt - A JSON web token representing the user's claims
  //  * @returns {DAOResponse} Returns either a "success" or an "error" Object
  //  */
  // static async loginUser(user, token) {
  //   try {
  //     let { email } = user;
  //     let query = { email };
  //     let update = { $set: { ...user, token } };
  //     let upsert = { upsert: true };
  //     await sessions.updateOne(query, update, upsert);
  //     return { success: true };
  //   } catch (e) {
  //     console.log("login error");
  //     console.error(`Error occurred while logging in user, ${e}`);
  //     return { error: e };
  //   }
  // }

  // /**
  //  * Removes a user from the `sessons` collection
  //  * @param {string} email - The email of the user to logout
  //  * @returns {DAOResponse} Returns either a "success" or an "error" Object
  //  */
  // static async logoutUser(email) {
  //   try {
  //     await sessions.deleteOne({ email });
  //     return { success: true };
  //   } catch (e) {
  //     console.error(`Error occurred while logging out user, ${e}`);
  //     return { error: e };
  //   }
  // }

  // /**
  //  * Removes a user from the `sessions` and `users` collections
  //  * @param {string} email - The email of the user to delete
  //  * @returns {DAOResponse} Returns either a "success" or an "error" Object
  //  */
  // static async deleteUser(email) {
  //   try {
  //     await users.deleteOne({ email });
  //     await sessions.deleteOne({ email });
  //     if (
  //       !(await this.getUserByEmail(email)) &&
  //       !(await this.getUserSession(email))
  //     ) {
  //       return { success: true };
  //     } else {
  //       console.error(`Deletion unsuccessful`);
  //       return { error: `Deletion unsuccessful` };
  //     }
  //   } catch (e) {
  //     console.error(`Error occurred while deleting user, ${e}`);
  //     return { error: e };
  //   }
  // }

  // /**
  //  * Given a user's email and an object of new preferences, update that user's
  //  * data to include those preferences.
  //  * @param {string} email - The email of the user to update.
  //  * @param {Object} preferences - The preferences to include in the user's data.
  //  * @returns {DAOResponse}
  //  */
  // static async updatePreferences(email, preferences) {
  //   try {
  //     preferences = preferences || {};
  //     const updateResponse = await users.updateOne(
  //       { email: email },
  //       { $set: { preferences: preferences } },
  //       { upsert: true }
  //     );
  //     if (updateResponse.matchedCount === 0) {
  //       return { error: "No user found with that email" };
  //     }
  //     return updateResponse;
  //   } catch (e) {
  //     console.error(
  //       `An error occurred while updating this user's preferences, ${e}`
  //     );
  //     return { error: e };
  //   }
  // }

  // static async checkAdmin(email) {
  //   try {
  //     const { isAdmin } = await this.getUserByEmail(email);
  //     return isAdmin || false;
  //   } catch (e) {
  //     return { error: e };
  //   }
  // }

  // static async makeAdmin(email) {
  //   try {
  //     const updateResponse = users.updateOne(
  //       { email },
  //       { $set: { isAdmin: true } }
  //     );
  //     return updateResponse;
  //   } catch (e) {
  //     return { error: e };
  //   }
  // }
}
