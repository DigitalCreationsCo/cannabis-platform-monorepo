import { type UserDispensaryStaffWithDispensaryDetails } from '@cd/data-access/src';
import { type AnyAction, type MiddlewareAPI } from '@reduxjs/toolkit';
import { TextContent } from '../constants';
import { dispensaryActions } from '../reducer';
import { type AppState } from '../types';
import { hasMembershipRoleAccess } from '../utils';

const dispensaryMiddleware =
	(store: MiddlewareAPI) => (next: any) => (action: AnyAction) => {
		try {
			next(action);

			const userState = store.getState().user as AppState['user'];
			const dispensaryState = store.getState()
				.dispensary as AppState['dispensary'];

			if (
				typeof window !== 'undefined' &&
				window.location.pathname === '/' &&
				userState.isSignedIn
			) {
				window.location.href = TextContent.href.dashboard_f(
					dispensaryState.dispensary.id,
				);
			}

			if (action.type === 'user/signinUserSync') {
				const user = action.payload as UserDispensaryStaffWithDispensaryDetails;
				if (hasMembershipRoleAccess(user, 'MEMBER')) {
					const organization = user.memberships?.[0].organization;
					store.dispatch(dispensaryActions.setDispensary(organization));
				} else if (user.memberships?.[0].organizationId) {
					store.dispatch(
						dispensaryActions.getDispensaryById(
							user.memberships?.[0].organizationId,
						) as unknown as AnyAction,
					);
				} else {
					throw new Error(TextContent.error.DISPENSARY_NOT_FOUND);
				}
			}
		} catch (error) {
			console.info('Dispensary Middleware: Caught an exception: ');
			console.info(error);
			throw new Error(error.message);
		}
	};

export default dispensaryMiddleware;
