import { DriverWithDetails, UserWithDetails } from '../../../data-access/src';

export type ApiContext = {
    action: "SIGN_OUT" | "REFRESH_SESSION";
    requestInit: RequestInit;
    url: string;
    // appUser: AppUser
}

export type AppUser = 'DRIVER' | 'CUSTOMER' | 'ADMIN';

export type PasswordlessSignInRequestPayload = {
    userContext: {
      appUser: AppUser
    },
    appUser: AppUser,
    userInputCode: string,
    preAuthSessionId: string,
    deviceId: string,
}

export type PasswordlessResponseWithUserDetails = {
      status: "OK";
      createdNewUser: boolean;
      user: UserWithDetails;
      fetchResponse: Response;
}

export type PasswordlessResponseWithDriverDetails = {
  status: "OK";
  createdNewUser: boolean;
  user: DriverWithDetails;
  fetchResponse: Response;
}

