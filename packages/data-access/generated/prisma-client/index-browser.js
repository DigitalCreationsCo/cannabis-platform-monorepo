
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.4.0
 * Query Engine version: f352a33b70356f46311da8b00d83386dd9f145d6
 */
Prisma.prismaVersion = {
  client: "4.4.0",
  engine: "f352a33b70356f46311da8b00d83386dd9f145d6"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.AccountScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state',
  oauth_token_secret: 'oauth_token_secret',
  oauth_token: 'oauth_token',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.AddressScalarFieldEnum = makeEnum({
  id: 'id',
  street1: 'street1',
  street2: 'street2',
  city: 'city',
  state: 'state',
  zipcode: 'zipcode',
  country: 'country',
  countryCode: 'countryCode',
  coordinateId: 'coordinateId',
  userId: 'userId',
  organizationId: 'organizationId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CategoryListScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  slug: 'slug',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CategoryScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  slug: 'slug',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CoordinatesScalarFieldEnum = makeEnum({
  id: 'id',
  latitude: 'latitude',
  longitude: 'longitude',
  radius: 'radius',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.DriverScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.ImageOrganizationScalarFieldEnum = makeEnum({
  id: 'id',
  location: 'location',
  organizationId: 'organizationId',
  blurhash: 'blurhash',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.ImageProductScalarFieldEnum = makeEnum({
  id: 'id',
  location: 'location',
  productId: 'productId',
  blurhash: 'blurhash',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.ImageUserScalarFieldEnum = makeEnum({
  id: 'id',
  location: 'location',
  userId: 'userId',
  blurhash: 'blurhash',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.ImageVendorScalarFieldEnum = makeEnum({
  id: 'id',
  location: 'location',
  blurhash: 'blurhash',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.MembershipScalarFieldEnum = makeEnum({
  id: 'id',
  role: 'role',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.OrderScalarFieldEnum = makeEnum({
  id: 'id',
  total: 'total',
  status: 'status',
  customerId: 'customerId',
  driverId: 'driverId',
  organizationId: 'organizationId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.OrganizationMembershipScalarFieldEnum = makeEnum({
  organizationId: 'organizationId',
  membershipId: 'membershipId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.OrganizationScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  dialCode: 'dialCode',
  phone: 'phone',
  vendorId: 'vendorId',
  subdomainId: 'subdomainId',
  termsAccepted: 'termsAccepted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.PaymentScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.ProductScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  description: 'description',
  features: 'features',
  unit: 'unit',
  size: 'size',
  basePrice: 'basePrice',
  currency: 'currency',
  discount: 'discount',
  quantity: 'quantity',
  stock: 'stock',
  organizationId: 'organizationId',
  rating: 'rating',
  tags: 'tags',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.ReviewScalarFieldEnum = makeEnum({
  id: 'id',
  rating: 'rating',
  comment: 'comment',
  productId: 'productId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.ServiceListScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  slug: 'slug',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.ServiceScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  subtitle: 'subtitle',
  slug: 'slug',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.SessionScalarFieldEnum = makeEnum({
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.SiteSettingScalarFieldEnum = makeEnum({
  id: 'id',
  organizationId: 'organizationId',
  description: 'description',
  title: 'title',
  bannerText: 'bannerText',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.SubDomainScalarFieldEnum = makeEnum({
  subdomain: 'subdomain',
  isValid: 'isValid',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  username: 'username',
  email: 'email',
  emailVerified: 'emailVerified',
  hashedPassword: 'hashedPassword',
  dialCode: 'dialCode',
  phone: 'phone',
  termsAccepted: 'termsAccepted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.VendorScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  publicName: 'publicName',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});
exports.Currency = makeEnum({
  USD: 'USD'
});

exports.MembershipRole = makeEnum({
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
  OWNER: 'OWNER'
});

exports.OrderStatus = makeEnum({
  Pending: 'Pending',
  Processing: 'Processing',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled'
});

exports.Unit = makeEnum({
  g: 'g'
});

exports.Prisma.ModelName = makeEnum({
  Account: 'Account',
  Session: 'Session',
  User: 'User',
  Driver: 'Driver',
  Vendor: 'Vendor',
  Address: 'Address',
  ImageOrganization: 'ImageOrganization',
  ImageProduct: 'ImageProduct',
  ImageUser: 'ImageUser',
  ImageVendor: 'ImageVendor',
  Coordinates: 'Coordinates',
  Membership: 'Membership',
  Order: 'Order',
  Payment: 'Payment',
  Organization: 'Organization',
  organizationMembership: 'organizationMembership',
  Product: 'Product',
  Category: 'Category',
  CategoryList: 'CategoryList',
  ServiceList: 'ServiceList',
  Service: 'Service',
  Review: 'Review',
  SiteSetting: 'SiteSetting',
  SubDomain: 'SubDomain'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
