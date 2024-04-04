/* eslint-disable @typescript-eslint/naming-convention */
import {
	type UserDispensaryStaffWithDispensaryDetails,
	type DriverWithSessionJoin,
	type UserWithDetails,
} from '@cd/data-access/src';
import { type User } from 'supertokens-node/lib/build/types';

export type ApiContext = {
	action: 'SIGN_OUT' | 'REFRESH_SESSION';
	requestInit: RequestInit;
	url: string;
	appUser: AppUser;
};

export type AppUser =
	| 'DRIVER_USER'
	| 'CUSTOMER_USER'
	| 'ADMIN_USER'
	| 'DISPENSARY_USER';

export type PasswordlessSignInRequestPayload = {
	userContext: any;
	appUser: AppUser;
	userInputCode: string;
	preAuthSessionId: string;
	deviceId: string;
};

export type PasswordlessResponseWithUserDetails = {
	status: 'OK';
	createdNewUser: boolean;
	user: UserWithDetails;
	fetchResponse: Response;
};

export type PasswordlessResponseWithDriverDetails = {
	status: 'OK';
	createdNewUser: boolean;
	user: DriverWithSessionJoin;
	fetchResponse: Response;
};

export type ConsumeCodeResponse<
	T =
		| UserWithDetails
		| DriverWithSessionJoin
		| UserDispensaryStaffWithDispensaryDetails,
> = {
	status: 'OK';
	createdNewRecipeUser: boolean;
	user: User;
	userFromDb: UserFromDBAuthResponse<T>;
};

export type UserFromDBAuthResponse<
	T =
		| UserWithDetails
		| DriverWithSessionJoin
		| UserDispensaryStaffWithDispensaryDetails,
> = {
	token: string;
	user: T;
};
