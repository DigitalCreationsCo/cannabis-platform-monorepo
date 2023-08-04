/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type AnyAction, type MiddlewareAPI } from '@reduxjs/toolkit';
import { type UserWithDetails } from '../../../../data-access/src';
import { locationActions } from '../features';

const locationMiddleware =
	(store: MiddlewareAPI) => (next) => (action: AnyAction) => {
		next(action);
		try {
			if (action.type === 'user/signinUserSync') {
				const user = action.payload as UserWithDetails;
				if (user?.address !== undefined) {
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
