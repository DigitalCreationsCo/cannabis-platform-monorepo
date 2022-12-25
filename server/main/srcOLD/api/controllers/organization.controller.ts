import bcrypt from "bcryptjs";
import { Organization, Product, Order } from "../models";
import { OrganizationDA, ShopDA } from "../data-access";

/*=================================================
VendorController Methods

hashpassword(password) tested 8/24/21 OK
register  tested 8/24/21 OK
login     tested 8/24/21 OK
logout    tested 8/24/21 OK
delete    tested 8/24/21 OK
apiGetVendor  tested 8/24/21 OK
apiAddProduct tested 8/24/21 OK

IN PROGRESS   * = more important
-----------
apiUpdateProduct*
apiDeleteProduct*
updatePreferences
searchProductsByVendor

getVendorSalesMetrics* = { qty sold }
getProductSalesMetrics*

=================================================*/

const hashPassword = async (password) => await bcrypt.hash(password, 10);

export default class OrganizationController {
  static async register(req, res) {
    try {
      const vendorFromBody = req.body;
      let errors = {};
      if (vendorFromBody) {
        if (vendorFromBody.password.length < 11) {
          errors.password = "Your password must be at least 11 characters.";
        }
        if (vendorFromBody.vendorName.length < 4) {
          errors.name = "Your vendor name must be at least 4 characters.";
        }
        if (vendorFromBody.publicName.length < 4) {
          errors.publicName = "Your public name must be at least 4 characters.";
        }
        if (vendorFromBody.email.length < 13) {
          errors.email = "Your email address must be at least 13 characters.";
        }
        if (vendorFromBody.address.length < 6) {
          errors.address =
            "Please provide your street address of at least 6 characters.";
        }
        if (!vendorFromBody.city) {
          errors.city = "Please provide your city.";
        }
        if (!vendorFromBody.state) {
          errors.state = "Please provide your state.";
        }
        if (vendorFromBody.zipcode.length < 5) {
          errors.zipcode = "Your zipcode must be valid.";
        }
        if (vendorFromBody.phone.length < 10) {
          errors.phone =
            "Please provide a valid phone number with the area code.";
        }
      }
      if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
      }
      const vendor = new Vendor({
        ...vendorFromBody,
        password: await hashPassword(vendorFromBody.password),
      });
      const addVendor = await OrganizationDA.addVendor(vendor);
      if (!addVendor.success) {
        errors.email = addVendor.error;
      }
      const vendorFromDb = await OrganizationDA.getVendorByEmail(vendor.email);
      if (!vendorFromDb) {
        errors.general = "Internal error, please try again later";
      }
      if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
      }
      res.json({
        auth_token: vendor.encoded(),
        info: vendor.toJson(),
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || typeof email !== "string") {
        res.status(400).json({ error: "Bad email format, expected string." });
        return;
      }
      if (!password || typeof password !== "string") {
        res
          .status(400)
          .json({ error: "Bad password format, expected string." });
        return;
      }
      let vendorData = await OrganizationDA.getVendorByEmail(email);
      if (!vendorData) {
        res.status(401).json({ error: "Make sure your email is correct." });
        return;
      }
      const vendor = new Vendor(vendorData);

      if (!(await vendor.comparePassword(password))) {
        res.status(401).json({ error: "Make sure your password is correct." });
        return;
      }
      const loginResponse = await OrganizationDA.loginVendor(
        vendor,
        vendor.encoded()
      );
      var { error } = loginResponse;
      if (error) {
        res.status(500).json({ error: error });
        return;
      }
      res.json({
        auth_token: vendor.encoded(),
        info: vendor.toJson(),
      });
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }

  static async logout(req, res) {
    try {
      const vendorJwt = req.get("Authorization").slice("Bearer ".length);
      const vendorObj = await Vendor.decoded(vendorJwt);
      var { error } = vendorObj;
      if (error) {
        res.status(401).json({ error });
        return;
      }
      const logoutResult = await OrganizationDA.logoutVendor(vendorObj.email);
      var { error } = logoutResult;
      if (error) {
        res.status(500).json({ error });
        return;
      }
      res.json(logoutResult);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async delete(req, res) {
    try {
      let { password } = req.body;
      if (!password || typeof password !== "string") {
        res
          .status(400)
          .json({ error: "Bad password format, expected string." });
        return;
      }
      const vendorJwt = req.get("Authorization").slice("Bearer ".length);
      const vendorClaim = await Vendor.decoded(vendorJwt);
      var { error } = vendorClaim;
      if (error) {
        res.status(401).json({ error });
        return;
      }
      const vendor = new Vendor(
        await OrganizationDA.getVendorByEmail(vendorClaim.email)
      );
      if (!(await vendor.comparePassword(password))) {
        res.status(401).json({ error: "Make sure your password is correct." });
        return;
      }
      const deleteResult = await OrganizationDA.deleteVendor(vendor.email);
      var { error } = deleteResult;
      if (error) {
        res.status(500).json({ error });
        return;
      }
      res.json(deleteResult);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async apiGetVendor(req, res) {
    try {
      const vendorId = req.params.id || {};
      let vendor = await OrganizationDA.getVendorById(vendorId);
      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found." });
      }
      res.json(vendor);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async productUpload(req, res) {
    try {
      const { vendorId } = req.params || {};
      const {id,
        name,
        categories,
        description,
        stock,
        price,
        discount,
        tags,
        features,
        unit,
        deleteImages,
      } = req.body;
      // let errors = {};
      // if (productFromBody) {
      //   if (
      //     !productFromBody.productName ||
      //     productFromBody.productName.length < 5
      //   ) {
      //     errors.name = "This product needs a name with at least 5 characters.";
      //   }
      //   if (
      //     !productFromBody.description ||
      //     productFromBody.description.length < 8
      //   ) {
      //     errors.description =
      //       "This product needs a description of at least 8 characters.";
      //   }
      //   if (!productFromBody.quantityInStock) {
      //     errors.quantity =
      //       "This product needs a number as a quantity in stock.";
      //   }
      //   if (!productFromBody.productCategory) {
      //     errors.productCategory = "This product needs a product category.";
      //   }
      //   if (!productFromBody.price) {
      //     errors.price = "This product needs a price.";
      //   }
      // }
      // if (Object.keys(errors).length > 0) {
      //   res.status(400).json(errors);
      //   return;
      // }
      // const vendorJwt = req.get("Authorization").slice("Bearer ".length);
      const token = token.jti;
      const vendor = await Vendor.decoded(token);
      var { error } = vendor;
      if (error) {
        res.status(401)
        throw new Error("Unauthorized access from auth server!")
      }
      if (vendorId !== vendorClaim.vendorId) {
        res.status(401)
        throw new Error("Unauthorized access from auth server!")
      }
      const product = await ShopDA.getProductById(id);
      let images = [...product.image];
    // push new upload images
    if (req.files && req.files.length > 0) {
      req.files.forEach(({ key, location }) => images.push({ key, location }));
    }

    if (product) {
      const deleteExistingImage = JSON.parse(deleteImages);

      if (deleteExistingImage && deleteExistingImage.length > 0) {
        await deleteFiles(deleteExistingImage);

        images = images.filter((item) => {
          const find = deleteExistingImage.find((img) => img.Key === item.key);
          return find ? false : true;
        });
      }

      const productData = {
        item: name || product.item,
        tags: tags ? JSON.parse(tags) : product.tags,
        description: description || product.description,
        features: features ? JSON.parse(features) : product.features,
        categories: categories ? JSON.parse(categories) : product.categories,
            unit: unit || product.unit,
            color: product.color,
            quantity: +stock >= 0 ? +stock : product.quantity,
            image: images,
            price: {
              currency: "USD",
              base: +price || product.price.base,
              discount: +discount || product.price.discount,
            },
          }

      const updateProduct = await ShopDA.getProductByIdAndUpdate(
        id, productData
      );
      return res.status(201).json(updateProduct);
    }
      var { error } = product;
      if (error) {
        res.status(401).json({ error });
        
      }
      res.json(addProduct);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // static async apiAddProduct(req, res) {
  //   try {
  //     const vendorId = req.params.id || {};
  //     const productFromBody = req.body;
  //     let errors = {};
  //     if (productFromBody) {
  //       if (
  //         !productFromBody.productName ||
  //         productFromBody.productName.length < 5
  //       ) {
  //         errors.name = "This product needs a name with at least 5 characters.";
  //       }
  //       if (
  //         !productFromBody.description ||
  //         productFromBody.description.length < 8
  //       ) {
  //         errors.description =
  //           "This product needs a description of at least 8 characters.";
  //       }
  //       if (!productFromBody.quantityInStock) {
  //         errors.quantity =
  //           "This product needs a number as a quantity in stock.";
  //       }
  //       if (!productFromBody.productCategory) {
  //         errors.productCategory = "This product needs a product category.";
  //       }
  //       if (!productFromBody.price) {
  //         errors.price = "This product needs a price.";
  //       }
  //     }
  //     if (Object.keys(errors).length > 0) {
  //       res.status(400).json(errors);
  //       return;
  //     }
  //     const vendorJwt = req.get("Authorization").slice("Bearer ".length);
  //     const vendorClaim = await Vendor.decoded(vendorJwt);
  //     var { error } = vendorClaim;
  //     if (error) {
  //       return res.status(401).json({ error });
  //     }
  //     if (vendorId !== vendorClaim.vendorId) {
  //       return res.status(401).json({ error: "Bad vendor claim or bad path" });
  //     }
  //     const vendor = new Vendor(
  //       await OrganizationDA.getVendorByEmail(vendorClaim.email)
  //     );
  //     const product = new Product({
  //       ...productFromBody,
  //       vendorName: vendor.vendorName,
  //       vendorId: vendor.vendorId,
  //     });
  //     console.log(product);
  //     const addProduct = await OrganizationDA.addProduct(product);
  //     var { error } = addProduct;
  //     if (error) {
  //       res.status(401).json({ error });
  //       return;
  //     }
  //     res.json(addProduct);
  //   } catch (e) {
  //     console.log(`api, ${e}`);
  //     res.status(500).json({ error: e });
  //   }
  // }

  // This method is incomplete
  static async apiUpdateProduct(req, res) {
    try {
      const idfromReq = req.params.id || {};
      const productFromBody = req.body;
      const vendorJwt = req.get("Authorization").slice("Bearer ".length);
      //decode auth token to get vendor object
      const vendorClaim = await Vendor.decoded(vendorJwt);
      //pull errors from vendorclaim obj
      var { error } = vendorClaim;
      if (error) {
        res.status(401).json({ error });
        return;
      }
      if (idfromReq !== vendorClaim.vendorId) {
        res.status(401).json({ error: "Bad vendor claim or bad path" });
        return;
      }
      const updateProduct = await OrganizationDA.updateProduct(productFromBody);
      var { error } = updateProduct;
      if (error) {
        res.status(401).json({ error });
        return;
      }
      const product = await OrganizationDA.getProductById(
        productFromBody.productId
      );
      res.json(product);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async getPendingOrders(req, res) {
    // pending orders are vendor delivery orders that have not been completed
    try {
      const vendorId = req.params.id || {};
      // const vendorJwt = req.get("Authorization").slice("Bearer ".length);
      // //decode auth token to get vendor object
      // const vendorClaim = await Vendor.decoded(vendorJwt);
      // //pull errors from vendorclaim obj
      // var { error } = vendorClaim;
      // if (error) {
      //   res.status(401).json({ error });
      //   return;
      // }
      // if (idfromReq !== vendorClaim.vendorId) {
      //   res.status(401).json({ error: "Bad vendor claim or bad path" });
      //   return;
      // }
      let pendingOrders = await OrganizationDA.getPendingOrders(vendorId);
      if (!pendingOrders) {
        return res.status(404).json({ error: "Orders not found." });
      }
      res.json(pendingOrders);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async addOrder(req, res) {
    try {
      // const vendorId = req.params.id;
      // do auth check of vendorId, to match vendorDB and orderObj: { vendorId }
      const orderFromBody = req.body.order;
      // console.log("orderFromBody ", orderFromBody);
      if (!orderFromBody) {
        throw new Error("Order information is not available!");
      }

      const order = new Order(orderFromBody);
      console.log(order);
      const addOrder = await OrganizationDA.addOrder(order);
      let { error } = addOrder;
      if (error) {
        res.status(401).json({ error });
        return;
      }
      res.json(addOrder);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const vendorId = req.params.id;
      // do auth check of vendorId, to match vendorDB and orderObj: { vendorId }
      const order = req.body;
      const deleteOrder = await OrganizationDA.deleteOrder(order);
      let { error } = deleteOrder;
      if (error) {
        res.status(401).json({ error });
        return;
      }
      res.json(deleteOrder);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
