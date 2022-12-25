import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export default class DriverSession {
  constructor({
    driverId = new ObjectId(),
    email,
    firstName,
    lastName,
    userName,
    password,
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
    profilePicture = null,
    metadata = {
      isOnline: false,
      isActiveDelivery: false,
      currentRoute: [],
    },
    location = {
      type: "Point",
      coordinates: [],
    },
  } = {}) {
    this.driverId = driverId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.address = address;
    this.phone = phone;
    this.orderHistory = orderHistory;
    this.preferences = preferences;
    this.profilePicture = profilePicture;
    this.metadata = metadata;
    this.location = location;
    this.currentRoute = currentRoute;
  }
  toJson() {
    return {
      driverId: this.driverId,
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
      profilePicture: this.profilePicture,
      metadata: this.metadata,
      currentRoute: this.currentRoute,
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
  static async decoded(driverJwt) {
    return jwt.verify(driverJwt, process.env.SECRET_KEY, (error, decoded) => {
      if (error) return { error };
      return new DriverSession(decoded);
    });
  }
}
