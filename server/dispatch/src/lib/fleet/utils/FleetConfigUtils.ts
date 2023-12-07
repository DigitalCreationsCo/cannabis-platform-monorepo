import { fleetApi, googleApi } from '../fleet.api';
import {
	TaskType,
	type Waypoint,
	type Task,
	type Manifest,
} from '../fleet.types';

/* eslint-disable @typescript-eslint/naming-convention */
export class FleetConfigUtils {
	private static PROVIDER_ID = '';
	static PARENT = '';

	static timestamp = 0;

	public static setTimestamp(ts: number): void {
		FleetConfigUtils.timestamp = ts;
	}

	public static getTimestampedId(id: string): string {
		return (
			id +
			(FleetConfigUtils.timestamp > 0 ? `_${FleetConfigUtils.timestamp}` : '')
		);
	}

	static createTask(t: Task) {
		return new fleetApi.CreateTaskRequest({
			parent: FleetConfigUtils.PARENT,
			taskId: t.id,
			task: new fleetApi.Task({
				name: FleetConfigUtils.getTaskName(t.id),
				type: FleetConfigUtils.getTaskType(t.task_type),
				state: fleetApi.Task.State.OPEN,
				taskOutcome: fleetApi.Task.TaskOutcome.TASK_OUTCOME_UNSPECIFIED,
				plannedLocation: FleetConfigUtils.createLocationInfo(
					t.planned_waypoint,
				),
				taskDuration: FleetConfigUtils.createDuration(t.duration_seconds),
			}),
		});
	}

	public static getTaskName(taskId: string): string {
		return `${FleetConfigUtils.PARENT}/tasks/${taskId}`;
	}

	private static getTaskType(type: TaskType) {
		switch (type) {
			case TaskType.PICKUP:
				return fleetApi.Task.Type[type];
			case TaskType.DELIVERY:
				return fleetApi.Task.Type.PICKUP;
			default:
				return fleetApi.Task.Type.TYPE_UNSPECIFIED;
		}
	}

	static createVehicleJourneySegments(m: Manifest) {
		const vehicleJourneySegments = [];
		const tasksMap: Map<string, Task> = new Map();

		for (const task of m.tasks) {
			tasksMap.set(task.id, task);
		}

		for (const stop of m.stops) {
			const vehicleStop = new fleetApi.VehicleStop({
				plannedLocation: FleetConfigUtils.createLocationInfo(
					stop.planned_waypoint,
				),
				state: fleetApi.VehicleStop.State.NEW,
			});

			for (const taskId of stop.tasks) {
				if (tasksMap.has(taskId)) {
					vehicleStop.tasks.push(
						new fleetApi.VehicleStop.TaskInfo({
							taskId: taskId,
							taskDuration: FleetConfigUtils.createDuration(
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								tasksMap.get(taskId)!.duration_seconds,
							),
						}),
					);
				} else {
					throw new Error(
						`Task ID ${taskId} cannot be found in the list of tasks.`,
					);
				}
			}
			vehicleJourneySegments.push(
				new fleetApi.VehicleJourneySegment({
					stop: vehicleStop,
				}),
			);
		}

		return vehicleJourneySegments;
	}

	public static getDeliveryVehicleName(deliveryVehicleId: string): string {
		return `${FleetConfigUtils.PARENT}/deliveryVehicles/${deliveryVehicleId}`;
	}

	private static createLocationInfo(w: Waypoint) {
		return fleetApi.LocationInfo.create({
			point: {
				latitude: w.latitude,
				longitude: w.longitude,
			},
		});
	}

	private static createDuration(d: number) {
		return new googleApi.protobuf.Duration({
			seconds: d,
		});
	}
}
