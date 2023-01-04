import bcrypt from "bcryptjs";
import { Organization, Product, Order } from "../models";
import { OrganizationDA } from "../data-access";

/* =================================
OrganizationController - controller class for organization management actions

members:
getCategoryList
updateProduct

================================= */

export default class OrganizationController {

    static async getCategoryList(req, res) {
      try {
        const organizationId = req.params.id || ""
        const data = await OrganizationDA.getCategoryList(organizationId)
        if (!data) return res.status(404).json("Categories not found")
        return res.status(200).json(data);
      } catch (error) {
        console.log('API error: ', error)
        res.status(500).json({ error });
      }
    }
  
    static async updateProduct(req, res) {
      try {
          const { id } = req.params
          // const {
          //   name,
          //   description,
          //   features,
          //   categories,
          //   images,
          //   unit,
          //   size,
          //   currency,
          //   basePrice,
          //   discount,
          //   stock,
          //   organizationId,
          //   rating,
          //   reviews,
          //   tags,
          //   deleteImages,
          // } = req.body;
          // console.log('name: ', name)

          // images = JSON.parse(images)
          // categories = JSON.parse(categories)
          // reviews = JSON.parse(reviews)
        
          // if (req.files && req.files.length > 0) {
          //   req.files.forEach(({ ...image }) => images.push(image));
          // }

          // deleteImages = deleteImages && JSON.parse(deleteImages)
          // if (deleteImages && deleteImages.length > 0) {
          //   // await deleteFiles(deleteImages);
          //   let remainingImages = images.filter((image) => {
          //     let deleted = deleteImages?.find((_d) => _d.id === image.id)
          //     return !deleted
          //   });
          // }

          //   // create new productData, use uploaded data, or use product data
          // // const productData = {
          // //   item: name || product.item,
          // //   tags: tags ? JSON.parse(tags) : product.tags,
          // //   description: description || product.description,
          // //   features: features ? JSON.parse(features) : product.features,
          // //   categories: categories ? JSON.parse(categories) : product.categories,
          // //   skus: [
          // //     {
          // //       unit: unit || product.skus[0].unit,
          // //       color: product.skus[0].color,
          // //       sku: product.skus[0].sku,
          // //       quantity: +stock >= 0 ? +stock : product.skus[0].quantity,
          // //       image: images,
          // //       price: {
          // //         currency: "USD",
          // //         base: +price || product.skus[0].price.base,
          // //         discount: +discount || product.skus[0].price.discount,
          // //       },
          // //     },
          // //   ],
          // // };
        
          const data = await OrganizationDA.updateProduct(product)
          if (!data) return res.status(404).json("Categories not found")
          // if (!data) return res.status(400).json("Could not update")
          return res.status(200).json(data);
        } catch (error) {
          console.log('API error: ', error)
          res.status(500).json({ error });
        }
    }
}
