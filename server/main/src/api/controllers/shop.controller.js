import User from "../models/User";
import Order from "../models/Order";
import ShopDAO from "../../data-access/shopDAO";
import UsersDAO from "../../data-access/usersDAO";
import VendorsDAO from "../../data-access/vendorsDAO";
import Stripe from "stripe";
import stipeNode from "stripe";

/*=================================================
ShopController Methods

getProductById
getProductsByVendor
getProductsByCategory

IN PROGRESS   * = more important
-----------
getCart
addToCart
updateCart
checkout
transaction

=================================================*/
export class CartProduct {
  constructor({
    _id = new ObjectId(""),
    vendorId,
    vendorName,
    productName,
    productId,
    description,
    quantityInCart = 1,
    price,
    productCategory,
    imageUrl,
  }) {
    (this._id = _id),
      (this.vendorId = vendorId),
      (this.vendorName = vendorName),
      (this.productName = productName),
      (this.productId = productId),
      (this.description = description),
      (this.quantityInCart = quantityInCart),
      (this.price = price),
      (this.productCategory = productCategory),
      (this.imageUrl = imageUrl);
  }
  toJson() {
    return {
      _id: this._id,
      vendorId: this.vendorId,
      vendorName: this.vendorName,
      productName: this.productName,
      productId: this.productId,
      description: this.description,
      quantityInCart: this.quantityInCart,
      price: this.price,
      productCategory: this.productCategory,
      imageUrl: this.imageUrl,
    };
  }
}

export default class ShopController {
  static async getProductById(req, res, next) {
    try {
      const productId = req.params.id || {};
      if (!productId) {
        res.status(400).json("Bad Product Id");
      }
      let product = await ShopDAO.getProductById(productId);
      if (!product) {
        res.status(404).json({ error: "Error retrieving product" });
        return;
      }
      res.json({ product });
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async getProductsByVendor(req, res) {
    try {
      const vendorId = req.params.id || {};
      let products = await ShopDAO.getProductsByVendor(vendorId);
      if (!products) {
        res.status(404).json({ error: "Error retrieving products" });
        return;
      }
      res.json(products);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async getProducts(req, res) {
    try {
      const { vendorIdList } = req.body || [];
      const { page, limit } = req.params;
      let products = await ShopDAO.getProducts(vendorIdList, page, limit);
      if (!products) {
        res.status(404).json({ error: "Error retrieving products" });
        return;
      }
      res.json(products);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  //tested 8/19/2012 OK
  static async getProductsByCategory(req, res, next) {
    try {
      const category = req.params.category;
      if (!category) {
        res.status(404).json({ error: "Category not found" });
        return;
      }
      let productsByCategory = await ShopDAO.getProductsByCategory(category);
      if (!productsByCategory) {
        res.status(404).json({ error: "Error retrieving products" });
        return;
      }
      res.json(productsByCategory);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  //tested 8/22/21 OK
  static async getCart(req, res, next) {
    try {
      const customerId = req.params.id || {};
      const userJwt = req.get("Authorization").slice("Bearer ".length);
      const userObj = await User.decoded(userJwt);
      //userObj is decoded properly
      var { error } = userObj;
      if (error) {
        res.status(400).json({ error });
        return;
      }
      if (customerId !== userObj.customerId) {
        res.status(401).json({ error: "Bad user claim" });
        return;
      }
      const cart = await ShopDAO.getUserCart(customerId);
      var { error } = cart;
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json(cart);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(400).json({ error: e });
    }
  }

  //tested 8/22/21 OK
  static async addToCart(req, res, next) {
    /*
    what happens when a user adds to cart?
    1.the product is retrieved from the db using productId,
    OR THROUGH JSON OBJECT SENT THROUGH THE REQUEST
    2.the product is sent in res.body to user collection in db: user.cart.products
    3.the ui is updated when the database (user.cart.products) is updated, through a websocket.
    */
    try {
      const customerId = req.params.id || {};
      const { productId } = req.body;
      if (!productId) {
        res.status(400).json("Bad Product Id");
        return;
      }
      const userJwt = req.get("Authorization").slice("Bearer ".length);
      const userObj = await User.decoded(userJwt);
      //userObj is decoded properly
      var { error } = userObj;
      if (error) {
        res.status(400).json({ error });
        return;
      }
      if (customerId !== userObj.customerId) {
        res.status(401).json({ error: "Bad user claim" });
        return;
      }
      /* 8/23/21
      think about sending the full product information in the request, and eliminating
      the getProduct db call in the future. This will be less work on the backend to add
      products to the cart. V
      */
      let product = await ShopDAO.getProductById(productId);
      const cartProduct = new CartProduct(product);
      var { error } = product;
      if (error) {
        res
          .status(404)
          .json({ error: "Error retrieving products, check the productId" });
        return;
      }
      const addedToCart = await ShopDAO.addToCart(customerId, cartProduct);
      //work out user identification with passing this product to the correct user cart!
      //write a working DAO method
      var { error } = addedToCart;
      if (error) {
        res.status(401).json({ error });
        return;
      }
      res.json(cartProduct);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  /*  
  The cart object exists in the database, as well as a state object in the frontend.
  When adding a product to cart, the product is saved in the db in user.cart object,
  and the product object is returned to the frontend, where it is stored in the client state.
  this allows the benefits of having a persistant cart store in the db,
  and having a local cart store in the client, where you can do things like update the cart
  without making a db request.
  */

  //updateCart gets the local state from frontend and updates the cart database

  /*
  THINK: how is the products going to be stored in the frontend?
  What is the best way to store the products so that they can be manipulated in the frontend?
  I think I should the products should be an object in the frontend,
  and turned into an array after they are sent in the request (using this method VVV)
  
  ! Keep working on this DAO method for updateCart. Work on the logic.
  I'm doing a good job. :) Keep going!
  */

  static async updateCart(req, res) {
    try {
      const customerId = req.params.id || {};
      //get the updated product from the front end state
      const { product } = req.body;
      if (!product) {
        res.status(400).json("Bad Cart Object");
        return;
      }
      const userJwt = req.get("Authorization").slice("Bearer ".length);
      const userObj = await User.decoded(userJwt);
      var { error } = userObj;
      if (error) {
        res.status(400).json({ error });
        return;
      }
      if (customerId !== userObj.customerId) {
        res.status(401).json({ error: "Bad user claim" });
        return;
      }
      const updatedCart = await ShopDAO.updateCart(customerId, product);
      var { error } = updatedCart;
      if (error) {
        res.status(401).json({ error });
        return;
      }
      res.json(updatedCart);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetVendorForOrder(req, res) {
    try {
      const vendorId = req.params.id || {};
      let vendor = await VendorsDAO.getVendorForOrder(vendorId);
      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found." });
      }
      res.json(vendor);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async checkout(req, res) {
    try {
      const customerId = req.params.id || {};
      const userJwt = req.get("Authorization").slice("Bearer ".length);
      const userObj = await User.decoded(userJwt);
      var { error } = userObj;
      if (error) {
        res.status(400).json({ error });
        return;
      }
      if (customerId !== userObj.customerId) {
        res.status(401).json({ error: "Bad user claim" });
        return;
      }
      const cart = await ShopDAO.getUserCart(customerId);
      const vendorId = cart.products[0].vendorId.toString();
      var { error } = cart;
      if (error) {
        res.status(400).json({ error });
        return;
      }
      //continue to build this method, add driver information
      //add function for summing the total price of the cart products, add it to the cart pipeline

      /*
      lastly, create an sale controller that will act as pipeline
      for user transactions, 
      -taking the created order,
      -submitting the order for payment processing,
      -saving it to the database when the user makes a successful payment
      -dispatching the order to a local delivery driver
      */
      const customer = await UsersDAO.getUserForOrder(customerId);
      const vendor = await VendorsDAO.getVendorForOrder(vendorId);
      const order = new Order({ customer, vendor, ...cart });
      res.json(order);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // static async transaction(req, res) {
  //   const order = req.body
  //   const stripe = stipeNode(process.env.STRIPE_SECRET_KEY)
  //   console.log(stripe)
  //   //send order to stripe payment controller -> payment processor
  //   res.json('working on it')
  // }

  //Build a wrapper for the backend api that will get vendors based on user location.
  //Start by building a location controller, and use the location controller to serve local vendors.
  //I'm doing a great job!
  // Hire a dev on upwork to implement payment processes, and tighten the security for customer and vendor information.
}
