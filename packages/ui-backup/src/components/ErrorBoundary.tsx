"use client"
import { Component, type PropsWithChildren } from 'react';
import ErrorMessage from './ErrorMessage';
interface ErrorBoundaryProps extends PropsWithChildren {
	fallback: React.ReactNode;
}

class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	{ hasError: boolean; error: any }
> {
	fallback: any;
	constructor(props: any) {
		super(props);
		this.state = { hasError: false, error: undefined };
		this.fallback;
	}

	static defaultProps = {
		fallback: (
			<>
				<ErrorMessage />
				{/* <button
					type="button"
					onClick={() => this.setState({ hasError: false })}
					>
					Try again?
				</button> */}
			</>
		),
	};

	static getDerivedStateFromError(error: any) {
		// Update state so the next render will show the fallback UI
		return { hasError: true, error };
	}

	override componentDidCatch(error: any, errorInfo: any) {
		// You can use your own error logging service here
		console.log({ error, errorInfo });
	}

	override render() {
		// Check if the error is thrown
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return this.props.fallback;
		}
		// Return children components in case of no error
		return this.props.children;
	}
}

export default ErrorBoundary;
