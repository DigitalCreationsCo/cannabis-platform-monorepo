import {Action, Resource,useCanAccess} from '@cd/core-lib';

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
