/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type maps } from '@googlemaps/fleetengine-delivery/build/protos/protos';
import type FleetConfig from './fleetConfig';

class StateService {
	// in production, use redis clients for this state
	private fleetConfig: FleetConfig | null = null;
	private tasks: Map<string, maps.fleetengine.delivery.v1.ITask>;
	private deliveryVehicles: Map<
		string,
		maps.fleetengine.delivery.v1.IDeliveryVehicle
	>;
	private clientToDeliveryVehicleMapping: Map<string, string>;

	constructor() {
		this.tasks = new Map();
		this.deliveryVehicles = new Map();
		this.clientToDeliveryVehicleMapping = new Map();
		this.addClientToDeliveryVehicleMap =
			this.addClientToDeliveryVehicleMap.bind(this);
	}

	state() {
		return {
			tasks: this.tasks,
			deliveryVehicles: this.deliveryVehicles,
			clientToDeliveryVehicleMapping: this.clientToDeliveryVehicleMapping,
		};
	}

	// FLEET CONFIG METHODS

	setFleetConfig(fleetConfig: FleetConfig) {
		this.fleetConfig = fleetConfig;
	}

	getManifest(vehicleId: string) {
		console.info('getting manifest for vehicled id ', vehicleId);
		if (this.fleetConfig === null) {
			return null;
		}
		let manifest: FleetConfig['manifests'][number];
		for (manifest of this.fleetConfig.manifests) {
			if (manifest.vehicle.id === vehicleId) {
				return manifest;
			}
		}
		return null;
	}

	// TASK METHODS

	/**
	 * Adds a task into the servlet state. If a task with the ID is already present, it is
	 * overwritten.
	 */
	addTask(task: maps.fleetengine.delivery.v1.ITask) {
		this.tasks.set(this.getId(task.name as string), task);
	}

	/** Retrieves a task by ID. Null if task ID doesn't match any task. */
	getTaskById(taskId: string) {
		return this.tasks.get(taskId);
	}

	getFleetConfigTask(taskId: string) {
		if (this.fleetConfig === null) {
			return null;
		}
		let manifest: FleetConfig['manifests'][number];
		for (manifest of this.fleetConfig.manifests) {
			let task: FleetConfig['manifests'][number]['tasks'][number];
			for (task of manifest.tasks) {
				if (task.id === taskId) {
					return task;
				}
			}
		}
		return null;
	}

	getFleetConfigTaskByTrackingId(trackingId: string) {
		if (this.fleetConfig === null) {
			return null;
		}
		let manifest: FleetConfig['manifests'][number];
		for (manifest of this.fleetConfig.manifests) {
			let task: FleetConfig['manifests'][number]['tasks'][number];
			for (task of manifest.tasks) {
				if (task.tracking_id === trackingId) {
					return task;
				}
			}
		}
		return null;
	}

	removeFleetConfigTask(taskId: string) {
		let manifest: FleetConfig['manifests'][number];
		for (manifest of this.fleetConfig!.manifests) {
			let stop: FleetConfig['manifests'][number]['stops'][number];
			for (stop of manifest.stops) {
				const newTasksList = Array.from(stop.tasks).filter(
					(task) => task !== taskId,
				);
				stop.tasks = newTasksList;
			}
		}
	}

	// VEHICLE METHODS

	/** Adds a delivery vehicle into the state. */
	addDeliveryVehicle(
		deliveryVehicle: maps.fleetengine.delivery.v1.IDeliveryVehicle,
	) {
		this.deliveryVehicles.set(deliveryVehicle.name as string, deliveryVehicle);
	}

	/** Retrieves a delivery vehicle by ID. Null if vehicle ID doesn't match any vehicle. */
	getDeliveryVehicleById(vehicleId: string) {
		return this.deliveryVehicles.get(vehicleId);
	}

	/**
	 * Adds a client into the assignment list. The client is the courier servicing this set of tasks.
	 */
	addClientToDeliveryVehicleMap(
		clientId: string,
		vehicle: maps.fleetengine.delivery.v1.IDeliveryVehicle,
	) {
		const vehicleId = this.getId(vehicle.name as string);
		if (!this.isDeliveryVehicleAssigned(vehicleId)) {
			this.clientToDeliveryVehicleMapping.set(clientId, vehicleId);
			const manifest = this.getManifest(vehicleId);
			if (manifest !== null) {
				manifest.client_id = clientId;
			}
		}
	}

	/** Retrieves the vehicle mapped to a client. */
	getDeliveryVehicleMapByClient(clientIdentifier: string) {
		return this.clientToDeliveryVehicleMapping.get(clientIdentifier);
	}

	/** Returns true if the vehicle is mapped to a client. */
	isDeliveryVehicleAssigned(vehicleId: string) {
		return this.clientToDeliveryVehicleMapping.has(vehicleId);
	}

	/** Retrieves any available (unassigned) vehicle. If all vehicles are assigned, returns null. */
	getAnyAvailableDeliveryVehicle() {
		for (const vehicle of this.deliveryVehicles.values()) {
			if (!this.isDeliveryVehicleAssigned(this.getId(vehicle.name as string))) {
				return vehicle;
			}
		}
		return null;
	}

	clearDeliveryState() {
		this.tasks.clear();
		this.deliveryVehicles.clear();
		this.clientToDeliveryVehicleMapping.clear();
	}

	/**
	 * Returns a (vehicle, task) ID from its name by stripping away the backend ID and other constant
	 * elements.
	 */
	getId(name: string) {
		const nameParts = name.split('/');
		return nameParts[nameParts.length - 1];
	}
}

const stateService = new StateService();
export default stateService;
