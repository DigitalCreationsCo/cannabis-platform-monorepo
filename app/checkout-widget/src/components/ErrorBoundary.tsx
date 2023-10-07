/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Component } from 'react';

export default class ErrorBoundary extends Component {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		console.info('Error: something went wrong.');
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="p-2">
					<h1 className="text-center">We messed up, An error occurred.</h1>
					<p className="text-center">Please try again.</p>
				</div>
			);
		}

		return this.props.children;
	}
}
