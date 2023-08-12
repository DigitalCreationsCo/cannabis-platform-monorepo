import {
	type DriverWithDetails,
	type UserWithDetails,
} from '@cd/data-access/src';

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
	user: DriverWithDetails;
	fetchResponse: Response;
};
