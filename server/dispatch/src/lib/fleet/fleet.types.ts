import { type CoordinatesCreateType } from '@gras/data-access';

/* eslint-disable @typescript-eslint/naming-convention */
export type Manifest = {
	vehicle: Vehicle;
	tasks: Task[];
	stops: Stop[];

	client_id: string;
	current_stop_state: StopState;
	remaining_stop_id_list: string[];
};

export enum StopState {
	STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
	NEW = 'NEW',
	ENROUTE = 'ENROUTE',
	ARRIVED = 'ARRIVED',
}

export type Vehicle = {
	id: string;
	provider_id: string;
	start_location: Waypoint;
	type:
		| 'DELIVERY_VEHICLE_TYPE_UNSPECIFIED'
		| 'AUTO'
		| 'TWO_WHEELER'
		| 'BICYCLE'
		| 'PEDESTRIAN'
		| null
		| undefined;
};

export enum TaskType {
	PICKUP = 'PICKUP',
	DELIVERY = 'DELIVERY',
	SCHEDULED_STOP = 'SCHEDULED_STOP',
	UNAVAILABLE = 'UNAVAILABLE',
}

export type Task = {
	id: string;
	tracking_id: string;
	planned_waypoint: Waypoint;
	planned_completion_time: number;
	planned_completion_time_range_seconds: number;
	duration_seconds: number;
	task_type: TaskType;
	contact_name: string;
	description: string;
};

export type Stop = {
	stopId: string;
	planned_waypoint: Waypoint;
	tasks: string[];
};

export type Waypoint = {
	description: string;
} & CoordinatesCreateType;
