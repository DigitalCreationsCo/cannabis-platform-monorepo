function createDate() {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  return today.toISOString();
}

import { Order } from '@cd/data-access'

export default class OrderInfo extends Order {
  constructor({
    orderId = new ObjectId(),
    customer = {
      customerId,
      firstName,
      lastName,
      userName,
      location,
      mobileNumber,
      dialCode,
    },
    vendor = {
      vendorName,
      publicName,
      vendorId,
      location,
      street,
      city,
      state,
      zipcode,
      phone,
      dialCode,
    },
    driver = {
      //   driverId,
      //   firstName,
      //   lastName,
      //   mobileNumber,
      //   dialCode,
      //   currentLocation,
    },
    products = [],
    total,
    createdOn = createDate(),
    driverPath = [],
  }) {
  super()
    this.orderId = orderId;
    this.customer = customer;
    this.vendor = vendor;
    this.driver = driver;
    this.products = products;
    this.total = total;
    this.createdOn = createdOn;
    this.driverPath = driverPath;
  }
  toJson() {
    return {
      orderId: this.orderId,
      customer: this.customer,
      vendor: this.vendor,
      driver: this.driver,
      products: this.products,
      total: this.total,
      createdOn: this.createdOn,
      driverPath: this.driverPath,
    };
  }
}
