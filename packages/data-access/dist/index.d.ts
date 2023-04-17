import { PrismaClient, Product, Category, ProductVariant, Organization, Review, User, ImageUser, ImageProduct, Prisma, Order, Driver, Address, OrderItem, OrderStatus, CategoryList, ImageOrganization, Coordinates, Schedule, Membership } from '@prisma/client';
export * from '@prisma/client';
import * as _prisma_client from '.prisma/client';

declare function createAddress(address: any): Promise<_prisma_client.Address>;
declare function findAddressById(id: string): Promise<_prisma_client.Address | null>;
declare function deleteAddressById(id: string): Promise<string>;
declare function removeAddressByIdAndUserId({ addressId, userId }: {
    addressId: string;
    userId: string;
}): Promise<string>;
type AddressCreateType = {
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    countryCode: string | null;
    coordinateId?: string;
    userId: string | undefined;
    organizationId: string | undefined;
};
type AddressUserCreateType = {
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    countryCode: string | null;
    coordinateId: string;
    userId: string | undefined;
};

declare function findCategoryListByOrg(organizationId: string): Promise<(_prisma_client.CategoryList & {
    categories: _prisma_client.Category[];
}) | never[]>;

declare global {
    var prisma: PrismaClient | undefined;
}
declare const prisma: PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client.Prisma.RejectOnNotFound | _prisma_client.Prisma.RejectPerOperation | undefined>;

declare function createProduct(): Promise<void>;
declare function findProductsByOrg(organizationIdList: string[], page: number, limit: number): Promise<(Product & {
    categories: Category[];
    variants: ProductVariant[];
})[]>;
declare function findProductWithDetails(id: string): Promise<(Product & {
    organization: Organization;
    categories: Category[];
    reviews: (Review & {
        user: User & {
            imageUser: ImageUser | null;
        };
    })[];
    variants: (ProductVariant & {
        images: ImageProduct[];
    })[];
}) | null>;
declare function findProductsByText(search: string, organizationId: string): Promise<(Product & {
    variants: (ProductVariant & {
        images: ImageProduct[];
    })[];
})[]>;
declare function deleteProduct(): Promise<void>;
type ProductWithDetails = Product & {
    organization: Organization;
    variants: ProductVariantWithDetails[];
    categories: Category[];
    reviews?: Review & {
        user?: User & {
            imageUser?: ImageUser;
        };
    };
};
type ProductVariantWithDetails = ProductVariant & {
    images?: ImageProduct[];
};
type ReviewWithDetails = Review & {
    user?: User & {
        imageUser?: ImageUser;
    };
};
type ProductUpdate = Prisma.ProductUpdateArgs["data"];

declare function createOrder(order: any): Promise<OrderWithDetails>;
declare function createPurchase(purchase: any): Promise<_prisma_client.Purchase>;
declare function findOrdersByOrg(organizationId: string): Promise<Order[]>;
declare function findOrderWithDetails(id: string): Promise<OrderWithDetails | null>;
declare function updateOrderWithOrderItems(order: any): Promise<Order>;
declare function deleteOrder(): Promise<void>;
declare function updateVariantQuantity(variantId: string, quantity: number, operation: '+' | '-'): Promise<_prisma_client.ProductVariant | undefined>;
type OrderWithDetails = Order & {
    driver: Driver | null;
    items?: OrderItemWithDetails[];
    customer: User;
    destinationAddress: Address;
    updatedAt?: any;
};
type OrderItemWithDetails = OrderItem & {
    productVariant: ProductVariantWithDetails;
};
type OrderUpdate = Prisma.OrderUpdateArgs["data"];
type OrderCreate = {
    id?: string;
    subtotal: number;
    total: number;
    taxFactor: number;
    tax: number;
    orderStatus?: OrderStatus;
    purchaseId?: string | null;
    addressId: string;
    customerId: string;
    organizationId: string;
    driverId?: string | null;
    isDelivered?: boolean;
    deliveredAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemWithDetails[];
};
type PurchaseCreate = Prisma.PurchaseCreateArgs["data"];

declare function createOrganization(organization: OrganizationCreateType): Promise<_prisma_client.Organization>;
declare function findOrganizationById(organizationId: string): Promise<{}>;
declare function findUsersByOrganization(organizationId: string): Promise<(_prisma_client.User & {
    imageUser: _prisma_client.ImageUser | null;
    memberships: _prisma_client.Membership[];
})[]>;
declare function findOrganizationBySubdomain(subdomainId: string): Promise<{}>;
declare function findLocalOrganizationsById(organizationIds: string[]): Promise<(_prisma_client.Organization & {
    address: Address | null;
    categoryList: CategoryList | null;
    siteSetting: _prisma_client.SiteSetting | null;
    images: ImageOrganization[];
    products: _prisma_client.Product[];
})[]>;
declare function updateOrganizationRecord(id: string, data: Prisma.OrganizationUpdateArgs['data']): Promise<_prisma_client.Organization>;
declare function updateStripeAccountDispensary(id: string, stripeAccountId: string, accountParams?: {}): Promise<_prisma_client.Organization>;
type OrganizationCreateType = {
    id: string | undefined;
    name: string;
    address: Address & {
        coordinates: Coordinates;
    };
    dialCode: string;
    phone: string;
    email: string;
    emailVerified?: boolean;
    vendorId: string;
    termsAccepted?: boolean;
    coordinates?: Coordinates;
    subdomainId: string;
};
type OrganizationWithShopDetails = {
    id: string;
    name: string;
    address: Address & {
        coordinates: Coordinates;
    };
    dialCode: string;
    phone: string;
    email: string;
    emailVerified?: boolean;
    vendorId: string;
    termsAccepted?: boolean;
    subdomainId: string;
    images: ImageOrganization[];
    categoryList: CategoryList[];
    schedule: Schedule;
};
type OrganizationStripeDetail = {
    id: string;
    stripeAccountId: string;
};
type ServeUserProximity = {
    userLocation: Coordinates;
    proximityRadius: number;
};

declare function findSessionByHandle(sessionHandle: string): Promise<(_prisma_client.Session & {
    user: _prisma_client.User;
}) | null>;
declare function createSession(sessionHandle: string, sessionPayload: SessionPayload, expires: number): Promise<_prisma_client.Session>;
declare function updateExpireSession(sessionHandle: string, expires: number): Promise<_prisma_client.Session>;
declare function deleteSessionByHandle(sessionHandle: string): Promise<_prisma_client.Session>;
type SessionPayload = {
    username: string;
    userId: string;
    email: string;
};

declare function createUser(userData: any): Promise<User & {
    address: _prisma_client.Address[];
    imageUser: ImageUser | null;
    memberships: Membership[];
}>;
declare function findUserWithDetailsByEmail(email: string): Promise<(User & {
    address: _prisma_client.Address[];
    imageUser: ImageUser | null;
    memberships: Membership[];
}) | null>;
declare function findUserWithDetailsById(id: string): Promise<(User & {
    address: _prisma_client.Address[];
    imageUser: ImageUser | null;
    memberships: Membership[];
}) | null>;
declare function updateUserPasswordToken(email: string, timeLimitedToken: string): Promise<{
    id: string;
    email: string;
}>;
type UserWithDetails = Omit<User, "createdAt" | "updatedAt"> & {
    address: {
        id?: string;
        street1: string;
        street2: string | null;
        city: string;
        state: string;
        zipcode: string;
        country: string;
        countryCode: string | null;
        userId?: string | null;
        organizationId?: string | null;
        createdAt?: Date;
        updatedAt?: Date;
    }[];
    imageUser?: ImageUser[];
    memberships?: Membership[];
    orders?: OrderWithDetails[];
    preferences?: null;
};
type UserCreateType = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    re_password: string;
    phone: string;
    dialCode: string;
    termsAccepted: boolean;
    imageUser: Prisma.ImageUserCreateArgs["data"] | null;
    address: Prisma.AddressCreateArgs["data"];
};
type UserLoginData = {
    email: string;
    password: string;
};

export { AddressCreateType, AddressUserCreateType, OrderCreate, OrderItemWithDetails, OrderUpdate, OrderWithDetails, OrganizationCreateType, OrganizationStripeDetail, OrganizationWithShopDetails, ProductUpdate, ProductVariantWithDetails, ProductWithDetails, PurchaseCreate, ReviewWithDetails, ServeUserProximity, SessionPayload, UserCreateType, UserLoginData, UserWithDetails, createAddress, createOrder, createOrganization, createProduct, createPurchase, createSession, createUser, prisma as default, deleteAddressById, deleteOrder, deleteProduct, deleteSessionByHandle, findAddressById, findCategoryListByOrg, findLocalOrganizationsById, findOrderWithDetails, findOrdersByOrg, findOrganizationById, findOrganizationBySubdomain, findProductWithDetails, findProductsByOrg, findProductsByText, findSessionByHandle, findUserWithDetailsByEmail, findUserWithDetailsById, findUsersByOrganization, removeAddressByIdAndUserId, updateExpireSession, updateOrderWithOrderItems, updateOrganizationRecord, updateStripeAccountDispensary, updateUserPasswordToken, updateVariantQuantity };
