Account
CREATE TABLE `Account` (
	`id` int NOT NULL AUTO_INCREMENT,
	`type` varchar(191) NOT NULL,
	`provider` varchar(191) NOT NULL,
	`providerAccountId` varchar(191) NOT NULL,
	`refresh_token` varchar(191),
	`refresh_token_expires_in` int,
	`access_token` varchar(191),
	`expires_at` int,
	`token_type` varchar(191),
	`scope` varchar(191),
	`id_token` varchar(191),
	`session_state` varchar(191),
	`oauth_token_secret` varchar(191),
	`oauth_token` varchar(191),
	`userId` int NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Account_userId_key` (`userId`),
	UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`, `providerAccountId`),
	KEY `Account_userId_idx` (`userId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
Address
CREATE TABLE `Address` (
	`id` int NOT NULL AUTO_INCREMENT,
	`dialCode` int NOT NULL,
	`number` int NOT NULL,
	`street1` varchar(191) NOT NULL,
	`street2` varchar(191),
	`city` varchar(191) NOT NULL,
	`state` varchar(191) NOT NULL,
	`zipcode` int NOT NULL,
	`country` varchar(191) NOT NULL,
	`countryCode` varchar(191) NOT NULL,
	`userId` int NOT NULL,
	`organizationId` int NOT NULL,
	`sourceType` varchar(191) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Address_userId_key` (`userId`),
	UNIQUE KEY `Address_organizationId_key` (`organizationId`),
	KEY `Address_userId_organizationId_idx` (`userId`, `organizationId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
ImageOrganization
CREATE TABLE `ImageOrganization` (
	`location` varchar(191) NOT NULL,
	`organizationId` int NOT NULL,
	UNIQUE KEY `ImageOrganization_organizationId_key` (`organizationId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
ImageProduct
CREATE TABLE `ImageProduct` (
	`location` varchar(191) NOT NULL,
	`productId` int NOT NULL,
	UNIQUE KEY `ImageProduct_productId_key` (`productId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
ImageUser
CREATE TABLE `ImageUser` (
	`location` varchar(191) NOT NULL,
	`userId` int NOT NULL,
	UNIQUE KEY `ImageUser_userId_key` (`userId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
ImageVendor
CREATE TABLE `ImageVendor` (
	`location` varchar(191) NOT NULL,
	`vendorId` int NOT NULL,
	UNIQUE KEY `ImageVendor_vendorId_key` (`vendorId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
Location
CREATE TABLE `Location` (
	`id` int NOT NULL AUTO_INCREMENT,
	`userId` int NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Location_userId_key` (`userId`),
	KEY `Location_userId_idx` (`userId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
LocationOrg
CREATE TABLE `LocationOrg` (
	`id` int NOT NULL AUTO_INCREMENT,
	`organizationId` int NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `LocationOrg_organizationId_key` (`organizationId`),
	KEY `LocationOrg_organizationId_idx` (`organizationId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
Membership
CREATE TABLE `Membership` (
	`id` int NOT NULL AUTO_INCREMENT,
	`role` enum('OWNER', 'ADMIN', 'MEMBER') NOT NULL,
	`organizationId` int NOT NULL,
	`userId` int NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Membership_organizationId_key` (`organizationId`),
	UNIQUE KEY `Membership_userId_key` (`userId`),
	UNIQUE KEY `Membership_userId_organizationId_key` (`userId`, `organizationId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
Order
CREATE TABLE `Order` (
	`id` int NOT NULL AUTO_INCREMENT,
	`total` int NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
Organization
CREATE TABLE `Organization` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`dialCode` int NOT NULL,
	`homePhone` int NOT NULL,
	`mobilePhone` int NOT NULL,
	`workPhone` int NOT NULL,
	`imageBlurhash` longtext,
	`vendorId` int NOT NULL,
	`vendorName` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Organization_name_key` (`name`),
	UNIQUE KEY `Organization_vendorId_key` (`vendorId`),
	UNIQUE KEY `Organization_vendorName_key` (`vendorName`),
	UNIQUE KEY `Organization_id_name_key` (`id`, `name`),
	KEY `Organization_vendorId_vendorName_idx` (`vendorId`, `vendorName`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
Product
CREATE TABLE `Product` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`features` varchar(191) NOT NULL,
	`categories` varchar(191) NOT NULL,
	`unit` enum('g') NOT NULL,
	`size` int NOT NULL,
	`basePrice` int NOT NULL,
	`currency` enum('USD') NOT NULL,
	`discount` int NOT NULL,
	`quantity` int NOT NULL,
	`imageBlurhash` longtext,
	`tags` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
Review
CREATE TABLE `Review` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` text NOT NULL,
	`rating` int NOT NULL,
	`comment` text,
	`productId` int NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Review_productId_key` (`productId`),
	KEY `Review_productId_idx` (`productId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
Session
CREATE TABLE `Session` (
	`id` int NOT NULL AUTO_INCREMENT,
	`sessionToken` varchar(191) NOT NULL,
	`expires` datetime(3) NOT NULL,
	`userId` int NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
	UNIQUE KEY `Session_userId_key` (`userId`),
	KEY `Session_userId_idx` (`userId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
Site
CREATE TABLE `Site` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(191),
	`description` text,
	`subdomain` varchar(191),
	`customDomain` varchar(191),
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	`organizationId` int NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Site_organizationId_key` (`organizationId`),
	UNIQUE KEY `Site_subdomain_key` (`subdomain`),
	UNIQUE KEY `Site_customDomain_key` (`customDomain`),
	KEY `Site_organizationId_idx` (`organizationId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
User
CREATE TABLE `User` (
	`id` int NOT NULL AUTO_INCREMENT,
	`firstName` varchar(255),
	`lastName` varchar(255),
	`userName` varchar(191) NOT NULL,
	`email` varchar(255) NOT NULL,
	`emailVerified` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`hashedPassword` varchar(191) NOT NULL,
	`dialCode` int NOT NULL,
	`homePhone` int NOT NULL,
	`mobilePhone` int NOT NULL,
	`workPhone` int NOT NULL,
	`termsAccepted` tinyint(1) NOT NULL DEFAULT '0',
	`imageBlurhash` longtext,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `User_userName_key` (`userName`),
	UNIQUE KEY `User_email_key` (`email`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
Vendor
CREATE TABLE `Vendor` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`publicName` varchar(255),
	`imageBlurhash` longtext,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Vendor_id_name_key` (`id`, `name`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
VerificationToken
CREATE TABLE `VerificationToken` (
	`identifier` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`expires` datetime(3) NOT NULL,
	UNIQUE KEY `VerificationToken_token_key` (`token`),
	UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`, `token`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;