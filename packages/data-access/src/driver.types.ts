import {
	type Driver,
	type DriverSession,
	type Prisma,
	type Route,
} from '@prisma/client';
import { type UserWithDetails } from './user';

export type DriverCreateType = Prisma.UserUncheckedCreateWithoutDriverInput & {
	driver: Prisma.DriverUncheckedCreateInput;
	address: (Prisma.AddressCreateInput & {
		coordinates: Prisma.CoordinatesCreateInput;
	})[];
	profilePicture: Prisma.ImageUserUncheckedCreateInput;
	memberships: Prisma.MembershipUpsertArgs['create'][];
};

export type DriverWithDetails = Driver & {
	user: UserWithDetails;
};

export type UserWithDriverDetails = UserWithDetails & {
	driver: Driver;
	driverSession: DriverSessionWithJoinedData;
};

export type DriverWithSessionJoin = Driver & {
	user: UserWithDetails;
	driverSession: DriverSessionWithJoinedData;
};

export type DriverSessionWithJoinedData = DriverSession & {
	id: string;
	email: string;
	phone: string;
	firstName: string;
	lastName: string;
	isOnline: boolean;
	isActiveDelivery: boolean;
	currentCoordinates: [number, number];
	currentRoute: RouteWithCoordinates;
	routeId: string;
	route: Route;
};

export type RouteWithCoordinates = Route & {
	coordinates: [number, number][];
};
