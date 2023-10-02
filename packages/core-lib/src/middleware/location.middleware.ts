/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type UserWithDetails } from '@cd/data-access/src';
import { type AnyAction, type MiddlewareAPI } from '@reduxjs/toolkit';
import { locationActions } from '../reducer';

const locationMiddleware =
	(store: MiddlewareAPI) => (next) => (action: AnyAction) => {
		try {
			next(action);
			if (action.type === 'user/signinUserSync') {
				const user = action.payload as UserWithDetails;
				if (!isEmpty(user?.address)) {
					store.dispatch(locationActions.setAllLocations(user.address));
					store.dispatch(locationActions.setHomeAddress(user.address[0]));
					store.dispatch(locationActions.setCurrentAddress(user.address[0]));
				}
			}
		} catch (error) {
			console.info('Location Middleware: Caught an exception: ');
			console.info(error);
			throw error;
		}
	};

export default locationMiddleware;
