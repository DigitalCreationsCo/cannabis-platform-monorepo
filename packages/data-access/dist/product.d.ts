import { Category, ImageProduct, ImageUser, Organization, Prisma, Product, ProductVariant, Review, User } from "@prisma/client";
export declare function createProduct(): Promise<void>;
export declare function findProductsByOrg(organizationId: string): Promise<(Product & {
    variants: (ProductVariant & {
        images: ImageProduct[];
    })[];
})[]>;
export declare function findProductWithDetails(id: string): Promise<(Product & {
    organization: Organization;
    categories: Category[];
    variants: (ProductVariant & {
        images: ImageProduct[];
    })[];
    reviews: (Review & {
        user: User & {
            imageUser: ImageUser[];
        };
    })[];
}) | null>;
export declare function findProductsByText(search: string, organizationId: string): Promise<(Product & {
    variants: (ProductVariant & {
        images: ImageProduct[];
    })[];
})[]>;
export declare function deleteProduct(): Promise<void>;
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
export type ProductUpdate = Prisma.ProductUpdateArgs["data"];
