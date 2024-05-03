// import {
// 	type Driver,
// 	type DriverSession,
// 	type Prisma,
// 	type Route,
// } from '@prisma/client';
// import { type CoordinatesCreateType } from '../address.types';
// import { type UserWithDetails } from '../user/user.data';

// export type DriverCreateType = Prisma.UserUncheckedCreateWithoutDriverInput & {
// 	driver: Prisma.DriverUncheckedCreateInput;
// 	address: (Prisma.AddressCreateInput & {
// 		coordinates: Prisma.CoordinatesCreateInput;
// 	})[];
// 	profilePicture: Prisma.ImageUserUncheckedCreateInput;
// 	memberships: Prisma.MembershipUpsertArgs['create'][];
// };

// export type DriverWithDetails = Driver & {
// 	user: UserWithDetails;
// };

// export type UserWithDriverDetails = UserWithDetails & {
// 	driver: Driver;
// 	driverSession: DriverSessionWithJoinedData;
// };

// export type DriverWithSessionJoin = Omit<Driver, 'createdAt' | 'updatedAt'> & {
// 	user: Omit<UserWithDetails, 'createdAt' | 'updatedAt'>;
// 	driverSession: Omit<DriverSessionWithJoinedData, 'createdAt' | 'updatedAt'>;
// };

// export type DriverSessionWithJoinedData = DriverSession & {
// 	id: string;
// 	email?: string;
// 	phone?: string;
// 	firstName?: string;
// 	lastName?: string;
// 	isOnline?: boolean;
// 	isActiveDelivery?: boolean;
// 	currentCoordinates?: CoordinatesCreateType;
// 	currentRoute: RouteWithCoordinates;
// 	routeId?: string;
// 	route?: Route;
// };

// // export type RouteWithCoordinates = (Route & Coordinates)[];
// export type RouteWithCoordinates = CoordinatesCreateType[];

export {};
