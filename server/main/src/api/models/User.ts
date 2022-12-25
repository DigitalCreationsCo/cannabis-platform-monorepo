import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export default class User {
  constructor({
    customerId = new ObjectId(),
    email,
    firstName,
    lastName,
    userName,
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
    orderHistory = [],
    preferences = {},
    recentlyViewedVendors = [],
    recentlyViewedProducts = [],
    friendList = [],
  } = {}) {
    this.customerId = customerId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.location = location;
    this.address = address;
    this.phone = phone;
    this.orderHistory = orderHistory;
    this.preferences = preferences;
    this.recentlyViewedVendors = recentlyViewedVendors;
    this.recentlyViewedProducts = recentlyViewedProducts;
    this.friendList = friendList;
  }
  toJson() {
    return {
      customerId: this.customerId,
      email: this.email,
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      location: this.location,
      address: this.address,
      phone: this.phone,
      orderHistory: this.orderHistory,
      preferences: this.preferences,
      recentlyViewedVendors: this.recentlyViewedVendors,
      recentlyViewedProducts: this.recentlyViewedProducts,
      friendList: this.friendList,
    };
  }
  async comparePassword(plainText) {
    try {
      return bcrypt.compare(plainText, this.password);
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
      process.env.SECRET_KEY
    );
  }
  static async decoded(userJwt) {
    return jwt.verify(userJwt, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return { error };
      }
      return new User(decoded);
    });
  }
}
