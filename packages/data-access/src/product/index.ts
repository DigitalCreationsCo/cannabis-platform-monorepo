import { Prisma } from "@prisma/client";
import prisma from "../db/prisma";

export async function createProduct() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
 }

export async function findProductsByOrg(organizationId) {
  try {
    const products = await prisma.product.findMany(
      {
        where: { organizationId },
        orderBy: [
          { rating: 'desc' },
          { stock: 'desc' }
        ],
        include: { images: true }
      }) || [];
      return products;
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message)
    }
}

export async function findProductsByText(search, organizationId) {
  try {
    const products = await prisma.product.findMany({
      where: {
        organizationId,
        OR: [
          {
            name: {
              contains: search
            },
          },
          {
            description: {
              contains: search
            },
          },
          {
            features: {
              contains: search
            },
          },
          {
            tags: {
              contains: search
            }
          }
        ],
      },
      orderBy: [
          { rating: 'desc' },
          { stock: 'desc' }
      ],
      include: { images: true }
      }) || [];
      return products;
    } catch (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
}

export async function deleteProduct() {
    // try {

    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
}
