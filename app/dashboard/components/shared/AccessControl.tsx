import { type Action, type Resource, useCanAccess } from '@gras/core';

interface AccessControlProps {
	children: React.ReactNode;
	resource: Resource;
	actions: Action[];
}

export const AccessControl = ({
	children,
	resource,
	actions,
}: AccessControlProps) => {
	const { canAccess } = useCanAccess();

	if (!canAccess(resource, actions)) {
		return null;
	}

	return <>{children}</>;
};
