import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export default class Vendor {
  constructor({
    vendorId = new ObjectId(),
    email,
    vendorName,
    publicName,
    password,
    location = {
      type: "Point",
      coordinates: [],
    },
    address = {
      street: null,
      city: null,
      state: null,
      country: null,
      countryCode: null,
      zipcode: null,
    },
    phone = {
      home: {
        dialCode: null,
        number: null,
      },
      mobile: {
        dialCode: null,
        number: null,
      },
      work: {
        dialCode: null,
        number: null,
      },
    },
    vendorLogo,
    rating,
    tag,
    products,
    orderHistory = [],
    preferences = {},
  } = {}) {
    this.vendorId = vendorId;
    this.vendorName = vendorName;
    this.publicName = publicName;
    this.email = email;
    this.password = password;
    this.location = location;
    this.address = address;
    this.phone = phone;
    this.vendorLogo = vendorLogo;
    this.rating = rating;
    this.tag = tag;
    this.products = products;
    this.orderHistory = orderHistory;
    this.preferences = preferences;
  }
  toJson() {
    return {
      vendorId: this.vendorId,
      vendorName: this.vendorName,
      publicName: this.publicName,
      email: this.email,
      password: this.password,
      location: this.location,
      address: this.address,
      phone: this.phone,
      vendorLogo: this.vendorLogo,
      rating: this.rating,
      tag: this.tag,
      products: this.products,
      orderHistory: this.orderHistory,
      preferences: this.preferences,
    };
  }
  async comparePassword(plainText) {
    try {
      return await bcrypt.compare(plainText, this.password);
    } catch (e) {
      return e;
    }
  }
  encoded() {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
        ...this.toJson(),
      },
      process.env.VENDOR_SECRET_KEY
    );
  }
  static async decoded(vendorJwt) {
    return jwt.verify(
      vendorJwt,
      process.env.SECRET_KEY,
      (error, decoded) => {
        if (error) {
          return { error };
        }
        return new Vendor(decoded);
      }
    );
  }
}
