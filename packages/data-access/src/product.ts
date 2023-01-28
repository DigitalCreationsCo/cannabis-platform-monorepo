import { Category, ImageProduct, ImageUser, Organization, Prisma, Product, ProductVariant, Review, User } from "@prisma/client";
import prisma from "./db/prisma";

export async function createProduct() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
 }

export async function findProductsByOrg(organizationId: string) {
  try {
    const products = await prisma.product.findMany(
      {
        where: { organizationId },
        orderBy: [
          { rating: 'desc' },
        ],
        include: {
          variants: {
            include: {
              images: true
            }
          }
        }
      }) || [];
      return products;
    } catch (error: any) {
        console.error(error.message)
        throw new Error(error.message)
    }
}

export async function findProductWithDetails(id: string) {
    try {
        const product = await prisma.product.findUnique(
            {
                where: { id },
                include: {
                    categories: true,
                    organization: true,
                    reviews: {
                      include: { user: { include: { imageUser: true }} }
                    },
                    variants: {
                      include: { images: true }
                    },
                }
            }
        )
        return product
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function findProductsByText(search: string, organizationId: string) {
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
      ],
      include: {
        variants: {
          include: { images: true }
        },
      }
    }) || [];
      return products;
    } catch (error: any) {
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

// export type ProductWithDetails = Prisma.PromiseReturnType<typeof findProductWithDetails>
export type ProductWithDetails = Product & {
  organization: Organization;
  variants?: ProductVariantWithDetails[];
  categories: Category[];
  reviews?: Review & {
    user?: User & {
      imageUser?: ImageUser;
    };
  };
};

export type ProductVariantWithDetails = ProductVariant & {
  images?: ImageProduct[];
};
export type ReviewWithDetails = Review & {
  user?: User & {
    imageUser?: ImageUser;
  };
};
export type ProductUpdate = Prisma.ProductUpdateArgs[ "data" ]
  