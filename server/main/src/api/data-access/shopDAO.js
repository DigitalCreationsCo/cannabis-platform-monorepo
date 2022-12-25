import { ObjectId } from "mongodb";

let dbName = process.env.DB_NS;
let usersColl;
let productsColl;
export default class ShopDAO {
  static async injectDB(conn) {
    if (usersColl && productsColl) {
      return;
    }
    try {
      usersColl = await conn.db(dbName).collection("users");
      productsColl = await conn.db(dbName).collection("products");
    } catch (e) {
      console.error(`Unable to establish collection handles in ShopDAO: ${e}`);
    }
  }
  /*====================
  Shop Data Access Object Methods
  
  getProductById(productId)     tested 8/24/21 OK
  getProductsByVendor(vendorId) tested 8/24/21 OK
  getProductsByCategory(productCategory)tested 8/24/21 OK
  addToCart(customerId, product)tested 8/24/21 OK

  In Progress   * = more important
  -----------
  getUserCart(customerId)
  updateCart(customerId, product)
  removefromCart(productId)
  purchase(order)
  ====================*/

  static async getProductById(productId) {
    try {
      let product = await productsColl.findOne({
        productId: ObjectId(productId),
      });
      return product;
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { error: e };
    }
  }

  static async getProductByIdAndUpdate(productId, productData) {
    try {
      let product = await productsColl.updateOne({
        productId: ObjectId(productId)},{ $set: productData },
        { new: true, upsert: true }
      );
      return product;
    } catch (error) {
      console.error(`Unable to issue find and update command, ${e}`);
      return { error: e };
    }
  }

  // find products containing a vendorId
  static async getProductsByVendor(vendorId) {
    try {
      return await productsColl
        .find({ vendorId: ObjectId(vendorId) })
        .toArray();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { error: e };
    }
  }

  // find products containing multiple vendorId
  static async getProducts(vendorIdList, pageNumber, limit) {
    pageNumber = Number(pageNumber);
    limit = Number(limit);
    let vendorObjectIdList = vendorIdList.map((v) => ObjectId(v));
    try {
      let result = await productsColl
        .find({ vendorId: { $in: vendorObjectIdList } })
        //.sort({ itemsSold: 1})
        // will sort based on items sold, commenting this out for now, as the field does not exist yet.
        // note: possibly implement an enum here, which can dynamically pass a field for sort :)
        .skip(pageNumber > 0 ? (pageNumber - 1) * limit : 0)
        .limit(limit)
        .toArray();
      return result;
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { error: e };
    }
  }

  static async getProductsByCategory(productCategory) {
    try {
      return await productsColl.find({ productCategory }).toArray();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { error: e };
    }
  }

  static async getUserCart(customerId) {
    try {
      let query = { customerId: ObjectId(customerId) };
      let options = { projection: { _id: false, cart: true } };
      //BUILD A PIPELINE TO SUM UP THE PRICE OF EACH ELEMENT IN THE PRODUCTS ARRAY
      //RETURN THE SUM AS A FIELD NAMED 'TOTAL'
      let cart = await usersColl.findOne(query, options);
      cart = cart.cart;
      return cart;
    } catch (e) {
      console.error(`An error occurred while getting the cart, ${e}`);
      return { error: e };
    }
  }

  static async addToCart(customerId, product) {
    try {
      let query = { customerId: ObjectId(customerId) };
      let update = { $push: { "cart.products": product } };
      await usersColl.updateOne(query, update);
      return { success: true };
    } catch (e) {
      console.error(`An error occurred while adding a product to cart, ${e}`);
      return { error: e };
    }
  }

  //NOT Working
  static async updateCart(customerId, product) {
    /* updateCart needs work. I need to revise the a better method to 
    control the products in the cart. Maaybe a mongo pipeline, or I can go
    a different route, and program it in the frontend. */
    try {
      const { _id, productId } = product;
      if (!productId || !_id) {
        return { error: "Invalid product" };
      }
      let query = { customerId: ObjectId(customerId) };
      let update = { $elemMatch: { "cart.products": product } };

      let updatedCart = await usersColl.updateOne(query, update).toArray();
      console.log(updatedCart);
      return { updatedCart };
    } catch (e) {
      console.error(`An error occurred while adding a product to cart, ${e}`);
      return { error: e };
    }
  }
}
