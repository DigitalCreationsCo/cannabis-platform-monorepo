/* eslint-disable sonarjs/no-duplicate-string */
import { isEqual } from 'lodash';
import { type Dispatch, type MiddlewareAPI } from 'redux';

/**
 * Logs the differences between two states
 * This function recursively compares two objects and logs the differences between them.
 *
 * @param prevState - The previous state
 * @param nextState - The next state
 */
function logStateDifferences(prevState: any, nextState: any) {
	const differences: { [key: string]: any } = {};

	// Recursively compare objects for differences
	const compareObjects = (prev: any, next: any, path: string) => {
		Object.keys(next).forEach((key) => {
			const currentPath = path ? `${path}.${key}` : key;

			// Check if the key exists in the previous state
			if (!(key in prev)) {
				differences[currentPath] = {
					a_prev: undefined,
					b_next: next[key],
				};
			}
			// Check if the values are different
			else if (!isEqual(prev[key], next[key])) {
				// If the values are objects, recursively compare them
				if (typeof prev[key] === 'object' && typeof next[key] === 'object') {
					compareObjects(prev[key], next[key], currentPath);
				} else {
					differences[currentPath] = {
						a_prev: prev[key],
						b_next: next[key],
					};
				}
			}
		});
	};

	compareObjects(prevState, nextState, '');

	if (Object.keys(differences).length > 0) {
		console.table(differences);
	} else {
		console.log('%cNo State Differences', 'color: cyan');
	}
}

/**
 * Logs the state before and after the dispatch
 * Use this middleware to log the state before and after the dispatch until we get an actually
 * working Redux Devtools for React-native with Hermes as the JS engine.
 *
 * It groups the logs by the action type and logs the state before and after the dispatch.
 * If the states are identical, it logs that they are identical.
 *
 * @param api - The redux middleware API
 */
const stateChangeLogger: any =
	(api: MiddlewareAPI) => (next: Dispatch<any>) => (action: any) => {
		const previousState = api.getState();
		const result = next(action);
		const afterState = api.getState();

		console.groupCollapsed(
			`%cAction Dispatched: ${action.type}`,
			'color: yellow'
		);
		console.log('%cState Before Dispatch:', 'color: orange', previousState);
		console.log('%cAction:', 'color: yellow', action);
		console.log('%cState After Dispatch:', 'color: orange', afterState);

		if (isEqual(previousState, afterState)) {
			console.log('%cStates are identical', 'color: cyan');
		} else {
			console.groupCollapsed('%cState Differences:', 'color: cyan');
			logStateDifferences(previousState, afterState);
			console.groupEnd();
		}

		console.groupEnd();
		return result; // Return the result of the action dispatch
	};

export default stateChangeLogger;
