import { Alert, Loading } from '@/components/shared';
import { LoadingDots } from '@cd/ui-lib';

interface WithLoadingAndErrorProps {
  isLoading: boolean;
  error: any;
  children: React.ReactNode;
}

const WithLoadingAndError = (props: WithLoadingAndErrorProps) => {
  const { isLoading, error, children } = props;

  if (isLoading) {
    return <LoadingDots />;
  }

  if (error) {
    return <Alert status="error">{error.message}</Alert>;
  }

  return <>{children}</>;
};

export default WithLoadingAndError;
