/* eslint-disable @typescript-eslint/naming-convention */

export interface User {
	id: string;
	name: string;
	username: string;
	image: string | null;
	phone: string;
	dialCode: string;
	email: string;
	password: string;
	role: string;
	id_verified: boolean;
	emailVerified: Date | null;
	is_legal_age: boolean;
	isSignUpComplete: boolean;
	invalid_login_attempts: number;
	lockedAt: Date;
	termsAccepted: boolean;
	billingId: string;
	billingProvider: string;
	createdAt: Date;
	updatedAt: Date;
}

// export type UserWithDetails = User &
// 	Omit<User, 'createdAt' | 'updatedAt'> & {
// 		address: AddressWithCoordinates[];
// 		profilePicture: ImageUser | null;
// 		memberships?: Membership[] | null;
// 		orders?: OrderWithShopDetails[];
// 		preferences?: null;
// 	};

// export type UserCreateType = Prisma.UserCreateInput & {
// 	address: any;
// 	profilePicture: Prisma.ImageUserCreateWithoutUserInput;
// 	memberships: Prisma.MembershipUpsertArgs['create'][];
// };

// export type UserWithProfilePicture = User & {
// 	profilePicture: Prisma.ImageUserCreateWithoutUserInput;
// };

// export type UserWithProfilePictureBlob = {
// 	id: string;
// 	username: string;
// 	profilePicture: ImageUser;
// };

// export type UserLoginData = {
// 	email: string;
// 	password: string;
// };

// export type CreateUserParams = {
// 	role: string;
// 	dispensaryId: string;
// };
