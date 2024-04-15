/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-small-switch */
import { type UserDispensaryStaffWithDispensaryDetails } from '@cd/data-access/src';
import { type AnyAction, type MiddlewareAPI } from '@reduxjs/toolkit';
import { TextContent } from '../constants';
import { dispensaryActions } from '../reducer';
import { type UserFromDBAuthResponse, type AppState } from '../types';
import { hasMembershipRoleAccess, isEmpty } from '../utils';

const dispensaryMiddleware =
	(store: MiddlewareAPI) => (next: any) => async (action: AnyAction) => {
		try {
			// handle async signin user
			if (action.type === 'user/signinUserSync') {
				const payload = action.payload as UserFromDBAuthResponse;
				const user = payload.user as UserDispensaryStaffWithDispensaryDetails;
				if (
					hasMembershipRoleAccess(user, 'MEMBER') &&
					!isEmpty(user.memberships?.[0].organizations)
				) {
					const organization = user.memberships?.[0].organizations;
					await store.dispatch(dispensaryActions.setDispensary(organization));
				} else if (
					hasMembershipRoleAccess(user, 'MEMBER') &&
					user.memberships?.[0].organizationId
				) {
					await store.dispatch(
						dispensaryActions.getDispensaryById(
							user.memberships?.[0].organizationId,
						) as unknown as AnyAction,
					);
				} else {
					throw new Error(TextContent.error.DISPENSARY_NOT_FOUND);
				}
			}

			// handle post-action effects
			next(action);

			const userState = store.getState().user as AppState['user'];
			console.info('dispensary middleware userState', userState);

			const dispensaryState = store.getState()
				.dispensary as AppState['dispensary'];

			// allow for easy linking
			if (typeof window !== 'undefined' && userState.isSignedIn) {
				if (window.location.pathname === '/' && userState.isSignedIn) {
					window.location.href = TextContent.href.dashboard_f(
						dispensaryState.dispensary?.id,
					);
				}

				switch (window.location.pathname) {
					case '/daily-deals':
						window.location.href = TextContent.href.daily_deals_weed_text_f(
							dispensaryState.dispensary?.id,
						);
						break;
					default:
						break;
				}
			}
		} catch (error) {
			console.info('Dispensary Middleware: Caught an exception: ');
			console.info(error);
			throw new Error(error.message);
		}
	};

export default dispensaryMiddleware;
