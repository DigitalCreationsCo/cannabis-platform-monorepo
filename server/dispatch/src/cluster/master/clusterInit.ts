import cluster from 'node:cluster';
import { ClusterMessage, RoomAction } from 'types';
import settings from '../../settings';

const workers: any[] = [];

class ClusterInit {
	constructor() {
		cluster.setupPrimary({
			execArgv: ['-e', '".ts"', 'babel-watch'],
			exec: 'src/cluster/worker/index.ts',
		});

		for (var i = 0; i < settings.numCPUs; i++) {
			workers[i] = cluster.fork();

			workers[i].on('message', function (_msg: ClusterMessage) {
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

// const balancer = recluster(path.join(__dirname, "../worker/index.ts"));
// balancer.run();
export default ClusterInit;
