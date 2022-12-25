import { ObjectId } from "mongodb";

let vendorsColl;
let vendorSessionsColl;
let productsColl;
let orders;

export default class OrganizationDA {
  static async injectDB(conn) {
    if (
      vendorsColl &&
      vendorSessionsColl &&
      productsColl &&
      orders
    ) {
      return;
    }
    try {
      vendorsColl = await conn.db(process.env.DB_NS).collection("vendors");
      vendorSessionsColl = await conn
        .db(process.env.DB_NS)
        .collection("vendor_sessions");
      productsColl = await conn.db(process.env.DB_NS).collection("products");
      orders = await conn
        .db(process.env.DB_NS)
        .collection("pendingOrders");
    } catch (e) {
      console.error(
        `Unable to establish collection handles in vendorDAO: ${e}`
      );
    }
  }

  /*====================
  Vendor Data Access Object Methods

  getVendorByEmail(email)     tested 8/24/21 OK
  getVendorByName(vendorName) tested 8/24/21 OK
  getVendorByPublicName(publicName) tested 8/24/21 OK
  getVendorById(vendorId)     tested 8/24/21 OK
  getVendorSession(email)     tested 8/24/21 OK
  addVendor(vendor)           tested 8/24/21 OK
  loginVendor(vendor, token)  tested 8/24/21 OK
  logoutVendor(email)         tested 8/24/21 OK
  deleteVendor(email)         tested 8/24/21 OK
  addProduct(product)         tested 8/24/21 OK
  getVendorForOrder(vendorId)

  In Progress   * = more important
  -----------
  updateProduct(product)*
  updatePreferences(email, preferences)

  ====================*/
  static async getVendorByEmail(email) {
    return await vendorsColl.findOne({ email });
  }

  static async getVendorByName(vendorName) {
    return await vendorsColl.findOne({ vendorName });
  }

  static async getVendorByPublicName(publicName) {
    return await vendorsColl.findOne({ publicName });
  }

  static async getVendorById(vendorId) {
    return await vendorsColl.findOne({ vendorId: ObjectId(vendorId) });
  }

  static async getVendorSession(email) {
    try {
      return vendorSessionsColl.findOne({ email });
    } catch (e) {
      console.log(`Error occurred while retrieving vendor session, ${e}`);
      return null;
    }
  }

  static async addVendor(vendor) {
    try {
      await vendorsColl.insertOne(vendor, { w: "majority" });
      return { success: true };
    } catch (e) {
      if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
        return { error: "A vendor with the given email already exists." };
      }
      console.error(`Error occurred while adding new vendor, ${e}.`);
      return { error: e };
    }
  }

  static async loginVendor(vendor, token) {
    try {
      const { email, vendorName, publicName } = vendor;
      let query = { email };
      let update = { $set: { email, vendorName, publicName, token } };
      let upsert = { upsert: true };
      await vendorSessionsColl.updateOne(query, update, upsert);
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`);
      return { error: e };
    }
  }

  static async logoutVendor(email) {
    try {
      await vendorSessionsColl.deleteOne({ email });
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while logging out vendor, ${e}`);
      return { error: e };
    }
  }

  static async deleteVendor(email) {
    try {
      await vendorsColl.deleteOne({ email });
      await vendorSessionsColl.deleteOne({ email });
      if (
        !(await this.getVendorByEmail(email)) &&
        !(await this.getVendorSession(email))
      ) {
        return { success: true };
      } else {
        console.error(`Deletion unsuccessful`);
        return { error: `Deletion unsuccessful` };
      }
    } catch (e) {
      console.log(`Error occurred while deleting vendor, ${e}`);
      return { error: e };
    }
  }

  static async addProduct(product) {
    try {
      const addProduct = await productsColl.insertOne(product, {
        w: "majority",
      });
      return addProduct;
    } catch (e) {
      console.error(`Error occurred while adding product, ${e}`);
      return { error: e };
    }
  }

  //This method is incomplete
  static async updateProduct(product) {
    try {
      const {
        productId,
        productName,
        description,
        price,
        quantityInStock,
        productCategory,
        imageUrl,
      } = product;

      let query = { productId: ObjectId(productId) };
      let update = {
        $set: {
          productName,
          description,
          price,
          quantityInStock,
          productCategory,
          imageUrl,
        },
      };
      return await productsColl.updateOne(query, update);
    } catch (e) {
      console.error(`Error occurred while updating product, ${e}`);
      return { error: e };
    }
  }

  static async getVendorForOrder(vendorId) {
    // get vendor, uses projection to exclude some data fields
    try {
      let query = { vendorId: ObjectId(vendorId) };
      let projection = {
        projection: {
          _id: false,
          password: false,
          orderHistory: false,
          preferences: false,
        },
      };
      return await vendorsColl.findOne(query, projection);
    } catch (e) {
      console.error(`Error occurred while retrieving vendor, ${e}`);
      return { error: e };
    }
  }

  static async getPendingOrders(vendorId) {
    try {
      let query = { vendorId: ObjectId(vendorId) };
      return await orders.find(query).toArray();
    } catch (e) {
      console.error(
        `Error occurred while retrieving vendor ${vendorId} pending orders: \n${e}`
      );
      return { error: e };
    }
  }

  static async addOrder(order) {
    try {
      const { orderId } = order;
      let orderDocument = {
        ...order,
        orderId: new ObjectId(orderId),
      };
      console.log("orderDocument: ", orderDocument);
      const result = await orders.insertOne(orderDocument, {
        w: "majority",
      });
      console.log("result: ", result);
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while adding new order, ${e}.`);
      return { error: e };
    }
  }

  static async deleteOrder(order) {
    try {
      let { orderId } = order;
      console.log(orderId);
      await orders.deleteOne({ orderId });
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while adding new order, ${e}.`);
      return { error: e };
    }
  }

  static async watchPendingOrders(vendorId) {
    const pipeline = [{ $match: { "fullDocument.vendorId": vendorId } }];
    // figure out how to update this changestream,
    // and iterate through it, or get the newest events,
    // and send them through websocket. ;P
    // I'm doing a good job.
    return orders.watch();
  }
}
