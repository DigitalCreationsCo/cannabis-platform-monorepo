/* eslint-disable @typescript-eslint/naming-convention */
import cluster from 'node:cluster';
import settings from '../../dispatch.settings';
import { type ClusterMessage, type RoomAction } from '../../dispatch.types';

const workers: any[] = [];

class ClusterInit {
	constructor() {
		cluster.setupPrimary({
			execArgv: ['-e', '".ts"', 'babel-watch'],
			exec: 'src/cluster/worker/index.ts',
		});

		for (let i = 0; i < settings.numCPUs; i++) {
			workers[i] = cluster.fork();

			workers[i].on('message', function (_msg: ClusterMessage) {
				// eslint-disable-next-line sonarjs/no-small-switch
				switch (_msg.action) {
					default:
						break;
				}
			});
		}
	}

	static SendToWorker(_workerId: number, _command: RoomAction, _data: any) {
		workers[_workerId].send({
			action: _command,
			data: _data,
		} as ClusterMessage);
	}
}

export default ClusterInit;
