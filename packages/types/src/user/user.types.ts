/* eslint-disable @typescript-eslint/naming-convention */

export type User = {
	id: string;
	username: string;
	email: string;
	password: string;
	role: string;
	id_verified: boolean;
	is_legal_age: boolean;
	invalid_login_attempts: number;
	lockedAt: Date;
	createdAt: Date;
	updatedAt: Date;
};

export type UserWithDetails = User &
	Omit<User, 'createdAt' | 'updatedAt'> & {
		address: AddressWithCoordinates[];
		profilePicture: ImageUser | null;
		memberships?: Membership[] | null;
		orders?: OrderWithShopDetails[];
		preferences?: null;
	};

export type UserCreateType = Prisma.UserCreateInput & {
	address: any;
	profilePicture: Prisma.ImageUserCreateWithoutUserInput;
	memberships: Prisma.MembershipUpsertArgs['create'][];
};

export type UserWithProfilePicture = User & {
	profilePicture: Prisma.ImageUserCreateWithoutUserInput;
};

export type UserWithProfilePictureBlob = {
	id: string;
	username: string;
	profilePicture: ImageUser;
};

export type UserLoginData = {
	email: string;
	password: string;
};

export type CreateUserParams = {
	role: string;
	dispensaryId: string;
};
