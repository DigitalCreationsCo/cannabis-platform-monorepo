/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AuthenticatedDeliveryServiceProvider from './auth/AuthenticatedDeliveryServiceProvider';
import { fleetApi, googleApi, mapsApi } from './fleet.api';
import StateService from './StateService';
import BaseService from './utils/BaseServiceClass';
import { TaskUtils } from './utils/TaskUtils';

class TaskService extends BaseService {
	stateService: typeof StateService;
	authenticatedDeliveryServiceProvider: typeof AuthenticatedDeliveryServiceProvider;

	constructor(
		stateService: typeof StateService,
		authenticatedDeliveryServiceProvider: typeof AuthenticatedDeliveryServiceProvider,
	) {
		super();
		this.stateService = stateService;
		this.authenticatedDeliveryServiceProvider =
			authenticatedDeliveryServiceProvider;
	}

	async getTaskList(vehicle: mapsApi.fleetengine.delivery.v1.IDeliveryVehicle) {
		const tasks: mapsApi.fleetengine.delivery.v1.ITask[] = [];
		for (const vjs of vehicle.remainingVehicleJourneySegments!) {
			if (!vjs.stop) continue;

			for (const taskInfo of vjs.stop.tasks!) {
				if (!taskInfo.taskId) {
					continue;
				}
				const task = StateService.getTaskById(taskInfo.taskId);
				if (!task) {
					continue;
				}
				tasks.push(task);
			}
		}
		return tasks;
	}

	async getTask(taskId: string) {
		const taskRequest = new fleetApi.GetTaskRequest({
			name: TaskUtils.getTaskNameFromId(taskId),
		});
		const authenticatedDeliveryService =
			await this.authenticatedDeliveryServiceProvider.getAuthenticatedDeliveryService();
		const responseTask = (await authenticatedDeliveryService.getTask(
			taskRequest,
		)) as mapsApi.fleetengine.delivery.v1.ITask;
		StateService.addTask(responseTask);
		return responseTask;
	}

	async updateTask(
		task: mapsApi.fleetengine.delivery.v1.ITask,
		taskOutcomeName: any,
	) {
		let outcome: mapsApi.fleetengine.delivery.v1.Task.TaskOutcome;
		switch (taskOutcomeName) {
			case 'TASK_OUTCOME_UNSPECIFIED':
				outcome =
					mapsApi.fleetengine.delivery.v1.Task.TaskOutcome
						.TASK_OUTCOME_UNSPECIFIED;
				break;
			case 'SUCCEEDED':
				outcome = mapsApi.fleetengine.delivery.v1.Task.TaskOutcome.SUCCEEDED;
				break;
			case 'FAILED':
				outcome = mapsApi.fleetengine.delivery.v1.Task.TaskOutcome.FAILED;
				break;
			default:
				console.info(`Task outcome ${taskOutcomeName} is invalid.`);
				throw new Error('Task outcome is invalid.');
		}

		const updateReq = new fleetApi.UpdateTaskRequest({
			task: {
				...task,
				taskOutcome: outcome,
				taskOutcomeTime: new googleApi.protobuf.Timestamp(),
			},
			updateMask: {
				paths: ['task_outcome', 'task_outcome_time'],
			},
		});

		const authenticatedDeliveryService =
			await this.authenticatedDeliveryServiceProvider.getAuthenticatedDeliveryService();
		const responseTask = (await authenticatedDeliveryService.updateTask(
			updateReq,
		)) as mapsApi.fleetengine.delivery.v1.ITask;

		StateService.addTask(responseTask);

		if (
			outcome !==
			mapsApi.fleetengine.delivery.v1.Task.TaskOutcome.TASK_OUTCOME_UNSPECIFIED
		)
			StateService.removeFleetConfigTask(StateService.getId(task.name!));

		return responseTask;
	}
}

export default TaskService.getInstance(
	StateService,
	AuthenticatedDeliveryServiceProvider,
);
