/* eslint-disable @typescript-eslint/naming-convention */
import { BackendUtils } from './BackendUtils';

export class TaskUtils {
	static BACKEND_NAME = BackendUtils.backendProperties.providerId();
	static TASK_NAME_FORMAT = `${TaskUtils.BACKEND_NAME}/tasks`;

	static getTaskNameFromId(taskId: string) {
		return `${this.TASK_NAME_FORMAT}/${taskId}`;
	}

	public static getRawTaskId(taskId: string) {
		// Assume task ID has _<timestamp> appended. Remove this and return the rest.
		const lastUnderscoreIndex = taskId.lastIndexOf('_');

		// There should be at least one character before the last underscore. Otherwise it's an error.
		if (lastUnderscoreIndex < 1) {
			return null;
		}
		return taskId.substring(0, lastUnderscoreIndex);
	}
}
