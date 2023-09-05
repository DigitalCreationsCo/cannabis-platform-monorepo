import {
	type Driver,
	type DriverSession,
	type Prisma,
	type Route,
	type User,
} from '@prisma/client';

// used for querying driver record with full user info
export type DriverWithDetails = Driver & {
	user: User;
};

// used for querying driver for current session details and location
export type DriverWithSessionDetails = Driver & {
	user: User;
	driverSession: DriverSessionWithJoinedData;
};

// represents joined driver session data from prisma and mongodb
export type DriverSessionWithJoinedData = DriverSession & {
	currentCoordinates: number[];
	routeId: string;
	route: Route;
};

export type DriverCreateType = Prisma.UserUncheckedCreateWithoutDriverInput & {
	driver: Prisma.DriverUncheckedCreateInput;
	address: (Prisma.AddressCreateInput & {
		coordinates: Prisma.CoordinatesCreateInput;
	})[];
	profilePicture: Prisma.ImageUserUncheckedCreateInput;
	memberships: Prisma.MembershipUpsertArgs['create'][];
};

export type RouteWithCoordinates = Route & {
	coordinates: number[][];
};
