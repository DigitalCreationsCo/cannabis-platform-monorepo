import { Component } from 'react';
class ErrorBoundary extends Component {
	fallback: any;
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
		this.fallback;
	}

	static defaultProps = {
		fallback: (
			<div>
				<h2>Oops, there is an error!</h2>
				{/* <button
					type="button"
					onClick={() => this.setState({ hasError: false })}
				>
					Try again?
				</button> */}
			</div>
		),
	};

	static getDerivedStateFromError(error: any) {
		// Update state so the next render will show the fallback UI
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		// You can use your own error logging service here
		console.log({ error, errorInfo });
	}

	render() {
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
