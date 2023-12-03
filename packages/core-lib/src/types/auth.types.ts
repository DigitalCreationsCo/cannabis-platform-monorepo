/* eslint-disable @typescript-eslint/naming-convention */
import {
	type DriverWithSessionJoin,
	type UserWithDetails,
} from '@cd/data-access/src';
import { type User } from 'supertokens-node/lib/build/types';

export type ApiContext = {
	action: 'SIGN_OUT' | 'REFRESH_SESSION';
	requestInit: RequestInit;
	url: string;
	// appUser: AppUser
};

export type AppUser = 'DRIVER' | 'CUSTOMER' | 'ADMIN';

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

export type STUser = {
	token: string;
	user: UserWithDetails | DriverWithSessionJoin;
};
export type ConsumerCodeResponse = {
	status: 'OK';
	createdNewRecipeUser: boolean;
	user: User;
	_user: STUser;
};
