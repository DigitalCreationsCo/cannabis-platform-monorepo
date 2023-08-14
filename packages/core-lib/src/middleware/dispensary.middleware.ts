import { type UserWithDetails } from '@cd/data-access/src';
import { type AnyAction, type MiddlewareAPI } from '@reduxjs/toolkit';
import { TextContent } from '../constants';
import { dispensaryActions } from '../reducer';
import { hasMembershipRoleAccess } from '../utils';

const dispensaryMiddleware =
	(store: MiddlewareAPI) => (next: any) => (action: AnyAction) => {
		try {
			next(action);
			if (action.type === 'user/signinUserSync') {
				const user = action.payload as UserWithDetails;
				if (hasMembershipRoleAccess(user, 'MEMBER')) {
					const organizationId = user.memberships?.[0].organizationId as string;
					console.log(
						'dispensary middleware: dispatching `getDispensaryById` action',
					);
					store.dispatch(
						dispensaryActions.getDispensaryById(
							organizationId,
						) as unknown as AnyAction,
					);
				} else throw new Error(TextContent.error.DISPENSARY_NOT_FOUND);
			}

			if (
				action.type === 'dispensary/getDispensaryById/fulfilled' &&
				typeof window !== 'undefined'
			) {
				window.location.reload();
			}
		} catch (error) {
			console.info('Dispensary Middleware: Caught an exception: ');
			console.info(error);
			throw new error(error.message);
		}
	};

export default dispensaryMiddleware;
