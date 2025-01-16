/* eslint-disable @typescript-eslint/naming-convention */
type UserDispensaryStaffWithDispensaryDetails = any;
type DriverWithSessionJoin = any;
type UserWithDetails = any;
import { type User } from 'supertokens-node/lib/build/types';

export interface ApiContext {
	action: 'SIGN_OUT' | 'REFRESH_SESSION';
	requestInit: RequestInit;
	url: string;
	appUser: AppUser;
}

export type AppUser =
	| 'DRIVER_USER'
	| 'CUSTOMER_USER'
	| 'ADMIN_USER'
	| 'DISPENSARY_USER';

export interface PasswordlessSignInRequestPayload {
	userContext: any;
	appUser: AppUser;
	userInputCode: string;
	preAuthSessionId: string;
	deviceId: string;
}

export interface PasswordlessResponseWithUserDetails {
	status: 'OK';
	createdNewUser: boolean;
	user: UserWithDetails;
	fetchResponse: Response;
}

export interface PasswordlessResponseWithDriverDetails {
	status: 'OK';
	createdNewUser: boolean;
	user: DriverWithSessionJoin;
	fetchResponse: Response;
}

export interface ConsumeCodeResponse<
	T =
		| UserWithDetails
		| DriverWithSessionJoin
		| UserDispensaryStaffWithDispensaryDetails,
> {
	status: 'OK';
	createdNewRecipeUser: boolean;
	user: User;
	userFromDb: UserFromDBAuthResponse<T>;
}

export interface UserFromDBAuthResponse<
	T =
		| UserWithDetails
		| DriverWithSessionJoin
		| UserDispensaryStaffWithDispensaryDetails,
> {
	token: string;
	user: T;
}
