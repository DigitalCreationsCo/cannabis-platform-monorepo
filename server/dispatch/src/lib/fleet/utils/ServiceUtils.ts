import fs from 'fs';
import { type ServerResponse } from 'http';
// import { type fleetApi } from '../fleet.api';

export class ServiceUtils {
	static setStandardResponseHeaders(response: ServerResponse) {
		response.setHeader('content-type', 'application/json');
		response.setDefaultEncoding('utf-8');
	}

	static setErrorResponse(
		response: ServerResponse,
		message: string,
		code: number,
	) {
		response.statusCode = code;
		response.write(JSON.stringify({ error: message }));
		response.end();
	}

	static async writeProtoJson(file: File, message: string) {
		fs.writeFile(file.name, message, (err) => {
			if (err) {
				console.log('writeProtoJson ', err);
			} else {
				console.log('writeProtoJson successful');
			}
		});
	}

	// static readTaskJsonProto(file: File, task: typeof fleetApi.Task) {}

	// static readDeliveryVehicleJsonProto(
	// 	file: File,
	// 	deliveryVehicle: typeof fleetApi.DeliveryVehicle,
	// ) {}
}
