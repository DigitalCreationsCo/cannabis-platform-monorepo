import { ObjectId } from "mongodb";

let users;
let sessions;
export default class UsersDAO {
  static async injectDB(conn) {
    if (users && sessions) {
      return;
    }
    try {
      users = await conn.db(process.env.DB_NS).collection("users");
      sessions = await conn.db(process.env.DB_NS).collection("userSessions");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }
  /*====================
  Users Data Access Object Methods
  
  getUserByEmail(email)   tested 8/24/21 OK
  getUserById(customerId) tested 8/24/21 OK
  getUserSession(email)   tested 8/24/21 OK
  addUser(user)           tested 8/24/21 OK
  loginUser(user, token)  tested 8/24/21 OK
  logoutUser(email)       tested 8/24/21 OK
  deleteUser(email)       tested 8/24/21 OK
  getUserForOrder(customerId)tested 8/24/21 OK
  
  In Progress   * = more important
  -----------
  updatePreferences(email, preferences)
  checkAdmin(email)
  makeAdmin(email)
  ====================*/

  /**
   * Finds a user in the `users` collection
   * @param {string} email - The email of the desired user
   * @returns {Object | null} Returns either a single user or nothing
   */
  static async getUserByEmail(email) {
    let projection = {
      projection: {
        _id: false,
      },
    };
    return await users.findOne({ email }, projection);
  }

  static async getUserById(customerId) {
    try {
      let projection = {
        projection: {
          _id: false,
        },
      };
      return await users.findOne(
        { customerId: ObjectId(customerId) },
        projection
      );
    } catch (e) {
      console.error(`Error occurred while retrieving user session, ${e}`);
      return null;
    }
  }

  /**
   * Gets a user from the `sessions` collection
   * @param {string} email - The email of the user to search for in `sessions`
   * @returns {Object | null} Returns a user session Object, an "error" Object
   * if something went wrong, or null if user was not found.
   */
  static async getUserSession(email) {
    try {
      let projection = {
        projection: {
          _id: false,
        },
      };
      return sessions.findOne({ email }, projection);
    } catch (e) {
      console.error(`Error occurred while retrieving user session, ${e}`);
      return null;
    }
  }

  /**
   * Adds a user to the `users` collection
   * @param {UserInfo} userInfo - The information of the user to add
   * @returns {DAOResponse} Returns either a "success" or an "error" Object
   */
  static async addUser(user) {
    try {
      await users.insertOne(user, { w: "majority" });
      return { success: true };
    } catch (e) {
      return {
        error:
          "This " +
          Object.keys(e.keyValue) +
          " " +
          Object.values(e.keyValue) +
          " already exists.",
      };
    }
  }

  /**
   * Adds a user to the `sessions` collection
   * @param {string} email - The email of the user to login
   * @param {string} jwt - A JSON web token representing the user's claims
   * @returns {DAOResponse} Returns either a "success" or an "error" Object
   */
  static async loginUser(user, token) {
    try {
      let { email } = user;
      let query = { email };
      let update = { $set: { ...user, token } };
      let upsert = { upsert: true };
      await sessions.updateOne(query, update, upsert);
      return { success: true };
    } catch (e) {
      console.log("login error");
      console.error(`Error occurred while logging in user, ${e}`);
      return { error: e };
    }
  }

  /**
   * Removes a user from the `sessons` collection
   * @param {string} email - The email of the user to logout
   * @returns {DAOResponse} Returns either a "success" or an "error" Object
   */
  static async logoutUser(email) {
    try {
      await sessions.deleteOne({ email });
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while logging out user, ${e}`);
      return { error: e };
    }
  }

  /**
   * Removes a user from the `sessions` and `users` collections
   * @param {string} email - The email of the user to delete
   * @returns {DAOResponse} Returns either a "success" or an "error" Object
   */
  static async deleteUser(email) {
    try {
      await users.deleteOne({ email });
      await sessions.deleteOne({ email });
      if (
        !(await this.getUserByEmail(email)) &&
        !(await this.getUserSession(email))
      ) {
        return { success: true };
      } else {
        console.error(`Deletion unsuccessful`);
        return { error: `Deletion unsuccessful` };
      }
    } catch (e) {
      console.error(`Error occurred while deleting user, ${e}`);
      return { error: e };
    }
  }

  /**
   * Given a user's email and an object of new preferences, update that user's
   * data to include those preferences.
   * @param {string} email - The email of the user to update.
   * @param {Object} preferences - The preferences to include in the user's data.
   * @returns {DAOResponse}
   */
  static async updatePreferences(email, preferences) {
    try {
      preferences = preferences || {};
      const updateResponse = await users.updateOne(
        { email: email },
        { $set: { preferences: preferences } },
        { upsert: true }
      );
      if (updateResponse.matchedCount === 0) {
        return { error: "No user found with that email" };
      }
      return updateResponse;
    } catch (e) {
      console.error(
        `An error occurred while updating this user's preferences, ${e}`
      );
      return { error: e };
    }
  }

  static async checkAdmin(email) {
    try {
      const { isAdmin } = await this.getUserByEmail(email);
      return isAdmin || false;
    } catch (e) {
      return { error: e };
    }
  }

  static async makeAdmin(email) {
    try {
      const updateResponse = users.updateOne(
        { email },
        { $set: { isAdmin: true } }
      );
      return updateResponse;
    } catch (e) {
      return { error: e };
    }
  }

  static async getUserForOrder(customerId) {
    try {
      let query = { customerId: ObjectId(customerId) };
      let projection = {
        projection: {
          _id: false,
          password: false,
          address: false,
          city: false,
          state: false,
          zipcode: false,
          cart: false,
          orderHistory: false,
          preferences: false,
        },
      };
      return await users.findOne(query, projection);
    } catch (e) {
      console.error(`Error occurred while retrieving user session, ${e}`);
      return null;
    }
  }
}
