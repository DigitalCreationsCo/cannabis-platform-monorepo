// src/index.ts
export * from "@prisma/client";

// src/db/prisma.ts
import { PrismaClient } from "@prisma/client";
var prisma = global.prisma || new PrismaClient();
function dateToString(doc) {
  if (doc != null || doc != void 0) {
    Object.keys(doc).forEach((key) => {
      if (typeof doc[key] === "object" && doc[key] !== null) {
        dateToString(doc[key]);
      }
      if (key == "createdAt" || key == "updatedAt" || key == "deliveredAt" || key == "emailVerified") {
        doc[key] = JSON.parse(JSON.stringify(doc[key]));
      }
    });
  }
  return doc;
}
prisma.$use(async (params, next) => {
  const before = Date.now();
  let results = await next(params);
  if (Array.isArray(results)) {
    results.length > 0 && results.forEach((doc) => dateToString(doc));
  }
  results = dateToString(results);
  const after = Date.now();
  console.log(`Total Query ${params.model}.${params.action} took ${after - before}ms`);
  return results;
});
var _a;
if (((_a = process == null ? void 0 : process.env) == null ? void 0 : _a["NODE_ENV"]) === "development")
  global.prisma = prisma;
var prisma_default = prisma;

// src/address.ts
async function createAddress(address) {
  try {
    const createAddress2 = await prisma_default.address.create({
      data: address
    });
    return createAddress2;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function findAddressById(id) {
  try {
    const address = await prisma_default.address.findUnique({
      where: {
        id
      }
    });
    return address;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function deleteAddressById(id) {
  try {
    const deleteAddress = await prisma_default.address.delete({
      where: {
        id
      }
    });
    return `Address ${deleteAddress == null ? void 0 : deleteAddress.id} is removed.`;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function removeAddressByIdAndUserId({ addressId, userId }) {
  try {
    const removeAddress = await prisma_default.address.update({
      where: {
        id: addressId
      },
      data: {
        user: { disconnect: true }
      }
    });
    return `Address ${removeAddress == null ? void 0 : removeAddress.id} is removed.`;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

// src/category.ts
async function findCategoryListByOrg(organizationId) {
  try {
    const categoryList = await prisma_default.categoryList.findUnique({
      where: { organizationId },
      include: { categories: true }
    }) || [];
    return categoryList;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

// src/order.ts
async function createOrder(order) {
  try {
    const createOrder2 = await prisma_default.order.upsert({
      where: {
        id: order.id
      },
      update: {
        ...order,
        purchase: {
          connect: {
            id: order.purchaseId
          }
        },
        destinationAddress: {
          connect: {
            id: order.addressId
          }
        },
        customer: {
          connect: {
            id: order.customerId
          }
        },
        organization: {
          connect: {
            id: order.organizationId
          }
        }
      },
      create: {
        ...order,
        purchase: {
          connect: {
            id: order.purchaseId
          }
        }
      }
    });
    return createOrder2;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
async function createPurchase(purchase) {
  try {
    const createPurchase2 = await prisma_default.purchase.upsert({
      where: {
        id: purchase.id
      },
      update: { ...purchase, order: { connect: { id: purchase.orderId } } },
      create: {
        ...purchase,
        order: {
          connect: {
            id: purchase.orderId
          }
        },
        customer: {
          connect: {
            id: purchase.customerId
          }
        }
      }
    });
    return createPurchase2;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
async function findOrdersByOrg(organizationId) {
  try {
    const order = await prisma_default.order.findMany(
      {
        where: { organizationId },
        orderBy: [
          { updatedAt: "desc" }
        ]
      }
    ) || [];
    return order;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
async function findOrderWithDetails(id) {
  try {
    const order = await prisma_default.order.findUnique(
      {
        where: { id },
        include: {
          customer: true,
          driver: true,
          destinationAddress: true,
          items: { include: { productVariant: { include: { images: true } } } }
        }
      }
    );
    return order;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function updateOrderWithOrderItems(order) {
  try {
    const updateOrderItemsOp = !!order.items && order.items.map((item) => {
      let { ...rest } = item;
      let orderId = order.id;
      let variantId = item.variantId;
      const update = prisma_default.orderItem.upsert({
        where: { variantId },
        create: { ...rest, quantity: Number(item.quantity) },
        update: { ...rest, quantity: Number(item.quantity) }
      });
      return update;
    });
    const connectOrderItems = !!order.items && order.items.map(
      (item) => ({
        variantId: item.variantId,
        orderId: order.id
      })
    ) || [];
    delete order["items"];
    let id = order.id;
    const updateOrderOp = prisma_default.order.update({
      where: { id },
      data: {
        ...order,
        items: {
          connect: connectOrderItems
        }
      }
    });
    await prisma_default.$transaction([...updateOrderItemsOp]);
    const updateOrder = await prisma_default.$transaction([updateOrderOp]);
    return updateOrder[0];
    return updateOrder[0];
  } catch (error) {
    console.error("error: ", error);
    throw new Error(error);
  }
}
async function deleteOrder() {
}
async function updateVariantQuantity(variantId, quantity, operation) {
  try {
    let updateVariant;
    if (operation === "-") {
      updateVariant = await prisma_default.productVariant.update({
        where: {
          id: variantId
        },
        data: {
          stock: {
            decrement: quantity
          }
        }
      });
    } else if (operation === "+") {
      updateVariant = await prisma_default.productVariant.update({
        where: {
          id: variantId
        },
        data: {
          stock: {
            increment: quantity
          }
        }
      });
    }
    return updateVariant;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

// src/organization.ts
async function createOrganization(organization) {
  try {
    organization.subdomainId = organization.name.toLowerCase();
    const { vendorId, address, subdomainId, ...data } = organization;
    const { coordinates, userId, ...addressData } = address;
    const { latitude, longitude } = coordinates;
    console.log("coordinates here", coordinates);
    const createOrganization2 = await prisma_default.organization.create({
      data: {
        ...data,
        address: {
          create: {
            ...addressData,
            coordinates: {
              create: {
                latitude: Number(latitude),
                longitude: Number(longitude)
              }
            }
          }
        },
        subdomain: {
          connectOrCreate: {
            where: { id: organization.subdomainId },
            create: { id: subdomainId, isValid: true }
          }
        },
        vendor: {
          connectOrCreate: {
            where: { id: vendorId },
            create: { id: vendorId, name: organization.name, publicName: organization.name }
          }
        }
        // add default site settings
      }
    });
    return createOrganization2;
  } catch (error) {
    console.error("ERROR: ", error.message);
    if (error.code === "P2002") {
      throw new Error("error creating organization, unique key exists");
    } else
      throw new Error("error creating organization");
  }
}
async function findOrganizationById(organizationId) {
  try {
    const organization = await prisma_default.organization.findUnique({ where: { id: organizationId } }) || {};
    return organization;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function findUsersByOrganization(organizationId) {
  try {
    const users = await prisma_default.user.findMany({
      orderBy: {
        id: "desc"
      },
      where: {
        memberships: {
          some: {
            organizationId
          }
        }
      },
      include: {
        memberships: {
          orderBy: {
            role: "asc"
          }
        },
        imageUser: true
      }
    }) || [];
    return users;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function findOrganizationBySubdomain(subdomainId) {
  try {
    const organization = await prisma_default.subDomain.findUnique({ where: { id: subdomainId }, include: { organization: { include: { address: true, images: true, products: true, siteSetting: true, categoryList: true } } } }) || {};
    return organization;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function findLocalOrganizationsById(organizationIds) {
  try {
    const localOrganizations = await prisma_default.organization.findMany({ where: { id: { in: organizationIds } }, include: { address: true, images: true, products: true, siteSetting: true, categoryList: true } }) || [];
    return localOrganizations;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function updateOrganizationRecord(id, data) {
  try {
    const update = await prisma_default.organization.update({ where: { id }, data: { ...data } });
    return update;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function updateStripeAccountDispensary(id, stripeAccountId, accountParams = {}) {
  try {
    const update = await prisma_default.organization.update({ where: { id }, data: { stripeAccountId, ...accountParams } });
    return update;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

// src/product.ts
async function createProduct() {
}
async function findProductsByOrg(organizationIdList, page, limit) {
  try {
    const products = await prisma_default.product.findMany(
      {
        skip: (page > 0 ? page - 1 : 0) * limit,
        take: limit,
        where: { organizationId: { in: organizationIdList } },
        orderBy: [
          { rating: "desc" }
          // { sales: 'desc' }
        ],
        include: {
          variants: true,
          categories: true
        }
      }
    ) || [];
    return products;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
async function findProductWithDetails(id) {
  try {
    const product = await prisma_default.product.findUnique(
      {
        where: { id },
        include: {
          categories: true,
          organization: true,
          reviews: {
            include: { user: { include: { imageUser: true } } }
          },
          variants: {
            include: { images: true }
          }
        }
      }
    );
    return product;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function findProductsByText(search, organizationId) {
  try {
    const products = await prisma_default.product.findMany({
      where: {
        organizationId,
        OR: [
          {
            name: {
              contains: search
            }
          },
          {
            description: {
              contains: search
            }
          },
          {
            features: {
              contains: search
            }
          },
          {
            tags: {
              contains: search
            }
          }
        ]
      },
      orderBy: [
        { rating: "desc" }
      ],
      include: {
        variants: {
          include: { images: true }
        }
      }
    }) || [];
    return products;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
async function deleteProduct() {
}

// src/session.ts
async function findSessionByHandle(sessionHandle) {
  try {
    const data = await prisma_default.session.findUnique({
      where: {
        sessionHandle
      },
      include: {
        user: true
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function createSession(sessionHandle, sessionPayload, expires) {
  try {
    console.log("create session args: ", sessionHandle, sessionPayload, expires);
    const session = await prisma_default.session.create({
      data: {
        sessionHandle,
        email: sessionPayload.email,
        username: sessionPayload.username,
        expires: /* @__PURE__ */ new Date(),
        user: {
          connect: { id: sessionPayload.userId }
        }
      }
    });
    return session;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function updateExpireSession(sessionHandle, expires) {
  try {
    const data = await prisma_default.session.update({
      where: {
        sessionHandle
      },
      data: {
        expires: new Date(expires)
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function deleteSessionByHandle(sessionHandle) {
  try {
    const data = await prisma_default.session.delete({
      where: {
        sessionHandle
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

// src/user.ts
import { Prisma } from "@prisma/client";
async function createUser(userData) {
  try {
    const user = await prisma_default.user.create({
      data: {
        email: userData.email,
        emailVerified: false,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        passwordHash: userData.passwordHash,
        termsAccepted: true,
        dialCode: userData.dialCode,
        phone: userData.phone,
        address: userData.address ? {
          create: {
            ...userData.address
          }
        } : void 0,
        imageUser: userData.imageUser ? {
          create: {
            ...userData.imageUser
          }
        } : void 0,
        memberships: userData.memberships ? {
          create: userData.memberships
        } : void 0
      },
      include: { address: true, imageUser: true, memberships: true }
    });
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("This user exists already. Please choose a different username or email.");
      }
    }
    throw new Error(error);
  }
}
async function findUserWithDetailsByEmail(email) {
  try {
    const user = await prisma_default.user.findUnique({
      where: {
        email
      },
      include: {
        address: true,
        memberships: {
          orderBy: {
            role: "asc"
          }
        },
        imageUser: true
      }
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function findUserWithDetailsById(id) {
  try {
    const user = await prisma_default.user.findUnique({
      where: {
        id
      },
      include: {
        address: true,
        memberships: {
          orderBy: {
            role: "asc"
          }
        },
        imageUser: true
      }
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
async function updateUserPasswordToken(email, timeLimitedToken) {
  try {
    const user = await prisma_default.user.update({
      where: { email },
      data: { passwordResetToken: timeLimitedToken },
      select: { email: true, id: true }
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
export {
  createAddress,
  createOrder,
  createOrganization,
  createProduct,
  createPurchase,
  createSession,
  createUser,
  prisma_default as default,
  deleteAddressById,
  deleteOrder,
  deleteProduct,
  deleteSessionByHandle,
  findAddressById,
  findCategoryListByOrg,
  findLocalOrganizationsById,
  findOrderWithDetails,
  findOrdersByOrg,
  findOrganizationById,
  findOrganizationBySubdomain,
  findProductWithDetails,
  findProductsByOrg,
  findProductsByText,
  findSessionByHandle,
  findUserWithDetailsByEmail,
  findUserWithDetailsById,
  findUsersByOrganization,
  removeAddressByIdAndUserId,
  updateExpireSession,
  updateOrderWithOrderItems,
  updateOrganizationRecord,
  updateStripeAccountDispensary,
  updateUserPasswordToken,
  updateVariantQuantity
};
