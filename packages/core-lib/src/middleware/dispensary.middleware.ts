import { type UserDispensaryStaffWithDispensaryDetails } from '@cd/data-access/src';
import { type AnyAction, type MiddlewareAPI } from '@reduxjs/toolkit';
import { TextContent } from '../constants';
import { dispensaryActions } from '../reducer';
import { type UserFromDBAuthResponse, type AppState } from '../types';
import { hasMembershipRoleAccess, isEmpty } from '../utils';

const dispensaryMiddleware =
	(store: MiddlewareAPI) => (next: any) => async (action: AnyAction) => {
		try {
			next(action);

			const userState = store.getState().user as AppState['user'];
			const dispensaryState = store.getState()
				.dispensary as AppState['dispensary'];

			if (action.type === 'user/signinUserSync') {
				const payload = action.payload as UserFromDBAuthResponse;
				const user = payload.user as UserDispensaryStaffWithDispensaryDetails;

				console.info('dispensary middleware user/signInUserSync user', user);
				console.info(
					'hasmembership role MEMBER ',
					hasMembershipRoleAccess(user, 'MEMBER'),
				);
				console.info(
					'has membership.organizations ',
					!isEmpty(user.memberships?.[0].organizations),
				);
				if (
					hasMembershipRoleAccess(user, 'MEMBER') &&
					!isEmpty(user.memberships?.[0].organizations)
				) {
					const organization = user.memberships?.[0].organizations;
					console.info(
						'dispensary middleware organization',
						user.memberships[0],
					);
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
		} catch (error) {
			console.info('Dispensary Middleware: Caught an exception: ');
			console.info(error);
			throw new Error(error.message);
		}
	};

export default dispensaryMiddleware;
