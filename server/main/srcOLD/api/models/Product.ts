import { ObjectId } from "mongodb"

export default class Product {
  constructor({
    vendorId,
    vendorName,
    productName,
    productId = new ObjectId(),
    description,
    quantityInStock,
    price,
    reviews = [],
    productCategory,
    imageUrl
  }) {
    this.vendorId = vendorId,
    this.vendorName = vendorName,
    this.productName = productName,
    this.productId = productId,
    this.description = description,
    this.quantityInStock = quantityInStock,
    this.price = price,
    this.reviews = reviews,
    this.productCategory = productCategory,
    this.imageUrl = imageUrl
  }
  toJson() {
    return {
      vendorId: this.vendorId,
      vendorName: this.vendorName,
      productName: this.productName,
      productId: this.productId,
      description: this.description,
      quantityInStock: this.quantityInStock,
      price: this.price,
      reviews: this.reviews,
      productCategory: this.productCategory,
      imageUrl: this.imageUrl
    }
  }
}
