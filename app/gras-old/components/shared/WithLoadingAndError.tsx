import { LoadingDots } from '@gras/ui';
import { Alert } from '@/components/shared';

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
