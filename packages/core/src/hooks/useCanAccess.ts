import type { Action, Resource, Permission } from '../lib/permissions';

import usePermissions from './usePermissions';

const useCanAccess = () => {
	const { permissions, isError, isLoading } = usePermissions();

	const canAccess = (resource: Resource, actions: Action[]) => {
		return (permissions || []).some(
			(permission: Permission) =>
				permission.resource === resource &&
				(permission.actions === '*' ||
					permission.actions.some((action) => actions.includes(action)))
		);
	};

	return {
		isLoading,
		isError,
		canAccess,
	};
};

export default useCanAccess;
