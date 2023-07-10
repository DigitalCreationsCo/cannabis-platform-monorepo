-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `oauth_token_secret` VARCHAR(191) NULL,
    `oauth_token` VARCHAR(191) NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,

    UNIQUE INDEX `Account_id_key`(`id`),
    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionHandle` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_id_key`(`id`),
    UNIQUE INDEX `Session_sessionHandle_key`(`sessionHandle`),
    INDEX `Session_userId_idx`(`userId`),
    INDEX `Session_sessionHandle_idx`(`sessionHandle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `isLegalAge` BOOLEAN NULL,
    `isSignUpComplete` BOOLEAN NOT NULL DEFAULT false,
    `termsAccepted` BOOLEAN NOT NULL DEFAULT false,
    `idVerified` BOOLEAN NOT NULL DEFAULT false,
    `scannedDOB` DATETIME(3) NULL,
    `idFrontImage` VARCHAR(191) NULL,
    `idBackImage` VARCHAR(191) NULL,
    `dialCode` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    INDEX `User_id_idx`(`id`),
    INDEX `User_email_idx`(`email`),
    INDEX `User_phone_idx`(`phone`),
    UNIQUE INDEX `User_id_email_key`(`id`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Driver` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Driver_id_key`(`id`),
    UNIQUE INDEX `Driver_email_key`(`email`),
    UNIQUE INDEX `Driver_id_email_key`(`id`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DriverSession` (
    `id` VARCHAR(191) NOT NULL,
    `isOnline` BOOLEAN NOT NULL DEFAULT false,
    `isActiveDelivery` BOOLEAN NOT NULL DEFAULT false,
    `routeId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DriverSession_id_key`(`id`),
    UNIQUE INDEX `DriverSession_routeId_key`(`routeId`),
    INDEX `DriverSession_id_idx`(`id`),
    INDEX `DriverSession_routeId_idx`(`routeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Route` (
    `driverId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Route_orderId_key`(`orderId`),
    INDEX `Route_driverId_idx`(`driverId`),
    INDEX `Route_orderId_idx`(`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `publicName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Vendor_id_key`(`id`),
    UNIQUE INDEX `Vendor_name_key`(`name`),
    UNIQUE INDEX `Vendor_publicName_key`(`publicName`),
    INDEX `Vendor_id_idx`(`id`),
    INDEX `Vendor_name_idx`(`name`),
    INDEX `Vendor_publicName_idx`(`publicName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `street1` VARCHAR(191) NOT NULL,
    `street2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zipcode` INTEGER NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `countryCode` VARCHAR(191) NULL,
    `coordinateId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Address_id_key`(`id`),
    INDEX `Address_id_idx`(`id`),
    INDEX `Address_coordinateId_idx`(`coordinateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageOrganization` (
    `id` VARCHAR(191) NOT NULL,
    `location` LONGTEXT NOT NULL,
    `organizationId` VARCHAR(191) NOT NULL,
    `blurhash` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ImageOrganization_id_key`(`id`),
    INDEX `ImageOrganization_organizationId_idx`(`organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageProduct` (
    `id` VARCHAR(191) NOT NULL,
    `location` LONGTEXT NOT NULL,
    `variantId` VARCHAR(191) NOT NULL,
    `blurhash` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ImageProduct_id_key`(`id`),
    INDEX `ImageProduct_variantId_idx`(`variantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageUser` (
    `id` VARCHAR(191) NOT NULL,
    `location` LONGTEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `blurhash` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ImageUser_id_key`(`id`),
    UNIQUE INDEX `ImageUser_userId_key`(`userId`),
    INDEX `ImageUser_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageVendor` (
    `id` VARCHAR(191) NOT NULL,
    `location` LONGTEXT NOT NULL,
    `blurhash` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ImageVendor_id_key`(`id`),
    INDEX `ImageVendor_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageArticle` (
    `id` VARCHAR(191) NOT NULL,
    `location` LONGTEXT NOT NULL,
    `articleId` VARCHAR(191) NOT NULL,
    `blurhash` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ImageArticle_id_key`(`id`),
    UNIQUE INDEX `ImageArticle_articleId_key`(`articleId`),
    INDEX `ImageArticle_articleId_idx`(`articleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coordinates` (
    `id` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `radius` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Coordinates_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Membership` (
    `id` VARCHAR(191) NOT NULL,
    `role` ENUM('1', '2', '3') NOT NULL,
    `organizationId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Membership_id_key`(`id`),
    INDEX `Membership_userId_idx`(`userId`),
    UNIQUE INDEX `Membership_id_organizationId_key`(`id`, `organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `taxFactor` DOUBLE NOT NULL,
    `taxAmount` INTEGER NOT NULL,
    `orderStatus` ENUM('Pending', 'Processing', 'OnDelivery', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
    `purchaseId` VARCHAR(191) NULL,
    `addressId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `organizationId` VARCHAR(191) NOT NULL,
    `driverId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDriverAssigned` BOOLEAN NOT NULL DEFAULT false,
    `driverAssignedAt` DATETIME(3) NULL,
    `isProductPickedUp` BOOLEAN NOT NULL DEFAULT false,
    `productPickedUpAt` DATETIME(3) NULL,
    `isDeliveredOrder` BOOLEAN NOT NULL DEFAULT false,
    `deliveredAt` DATETIME(3) NULL,
    `isCustomerReceivedOrder` BOOLEAN NOT NULL DEFAULT false,
    `customerReceivedOrderAt` DATETIME(3) NULL,
    `isCompleted` BOOLEAN NOT NULL DEFAULT false,
    `completedAt` DATETIME(3) NULL,
    `routeId` VARCHAR(191) NULL,

    UNIQUE INDEX `Order_id_key`(`id`),
    UNIQUE INDEX `Order_purchaseId_key`(`purchaseId`),
    UNIQUE INDEX `Order_routeId_key`(`routeId`),
    INDEX `Order_purchaseId_idx`(`purchaseId`),
    INDEX `Order_addressId_idx`(`addressId`),
    INDEX `Order_customerId_idx`(`customerId`),
    INDEX `Order_driverId_idx`(`driverId`),
    INDEX `Order_organizationId_idx`(`organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchase` (
    `id` VARCHAR(191) NOT NULL,
    `paymentStatus` ENUM('Pending', 'Paid', 'Failed') NOT NULL DEFAULT 'Pending',
    `gateway` VARCHAR(191) NOT NULL DEFAULT 'stripe',
    `type` VARCHAR(191) NOT NULL DEFAULT 'card',
    `amount` DOUBLE NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Purchase_id_key`(`id`),
    INDEX `Purchase_orderId_idx`(`orderId`),
    INDEX `Purchase_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organization` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `stripeAccountId` VARCHAR(191) NULL,
    `stripeOnboardingComplete` BOOLEAN NOT NULL DEFAULT false,
    `addressId` VARCHAR(191) NOT NULL,
    `dialCode` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `vendorId` VARCHAR(191) NOT NULL,
    `scheduleId` VARCHAR(191) NOT NULL,
    `termsAccepted` BOOLEAN NOT NULL DEFAULT false,
    `subdomainId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Organization_id_key`(`id`),
    UNIQUE INDEX `Organization_stripeAccountId_key`(`stripeAccountId`),
    UNIQUE INDEX `Organization_addressId_key`(`addressId`),
    UNIQUE INDEX `Organization_scheduleId_key`(`scheduleId`),
    INDEX `Organization_id_idx`(`id`),
    INDEX `Organization_vendorId_idx`(`vendorId`),
    INDEX `Organization_subdomainId_idx`(`subdomainId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `id` VARCHAR(191) NOT NULL,
    `days` INTEGER NOT NULL,
    `openAt` INTEGER NULL,
    `closeAt` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Schedule_id_key`(`id`),
    INDEX `Schedule_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `features` VARCHAR(191) NULL,
    `organizationId` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `tags` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Product_id_key`(`id`),
    INDEX `Product_id_idx`(`id`),
    INDEX `Product_organizationId_idx`(`organizationId`),
    UNIQUE INDEX `Product_id_rating_key`(`id`, `rating`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductVariant` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sku` DOUBLE NULL,
    `organizationId` VARCHAR(191) NOT NULL,
    `organizationName` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `unit` ENUM('g') NOT NULL DEFAULT 'g',
    `size` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `basePrice` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL,
    `isDiscount` BOOLEAN NOT NULL,
    `salePrice` INTEGER NOT NULL,
    `currency` ENUM('USD') NOT NULL,
    `stock` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductVariant_id_key`(`id`),
    INDEX `ProductVariant_id_idx`(`id`),
    INDEX `ProductVariant_productId_idx`(`productId`),
    INDEX `ProductVariant_productId_rating_idx`(`productId`, `rating`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Category_id_key`(`id`),
    INDEX `Category_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCategories` (
    `categoryListId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    INDEX `ProductCategories_categoryListId_idx`(`categoryListId`),
    INDEX `ProductCategories_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`categoryListId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryList` (
    `id` VARCHAR(191) NOT NULL,
    `organizationId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CategoryList_id_key`(`id`),
    UNIQUE INDEX `CategoryList_organizationId_key`(`organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceList` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ServiceList_id_key`(`id`),
    UNIQUE INDEX `ServiceList_slug_key`(`slug`),
    INDEX `ServiceList_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Service_id_key`(`id`),
    UNIQUE INDEX `Service_slug_key`(`slug`),
    INDEX `Service_title_idx`(`title`),
    INDEX `Service_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` TEXT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Review_id_key`(`id`),
    UNIQUE INDEX `Review_productId_key`(`productId`),
    INDEX `Review_userId_idx`(`userId`),
    INDEX `Review_productId_idx`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSetting` (
    `id` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `title` VARCHAR(191) NOT NULL,
    `bannerText` TEXT NULL,
    `organizationId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SiteSetting_id_key`(`id`),
    UNIQUE INDEX `SiteSetting_organizationId_key`(`organizationId`),
    INDEX `SiteSetting_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubDomain` (
    `id` VARCHAR(191) NOT NULL,
    `isValid` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SubDomain_id_key`(`id`),
    INDEX `SubDomain_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `href` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Article_id_key`(`id`),
    INDEX `Article_id_idx`(`id`),
    INDEX `Article_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AddressToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AddressToUser_AB_unique`(`A`, `B`),
    INDEX `_AddressToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MembershipToOrganization` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MembershipToOrganization_AB_unique`(`A`, `B`),
    INDEX `_MembershipToOrganization_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderToProductVariant` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_OrderToProductVariant_AB_unique`(`A`, `B`),
    INDEX `_OrderToProductVariant_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToProduct` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CategoryToProduct_AB_unique`(`A`, `B`),
    INDEX `_CategoryToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ServiceToServiceList` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ServiceToServiceList_AB_unique`(`A`, `B`),
    INDEX `_ServiceToServiceList_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

