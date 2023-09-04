import * as os from 'os';
class Settings {
	workerPath: string;
	numCPUs: number;

	constructor() {
		this.workerPath = 'src/cluster/worker/index.ts';
		this.numCPUs = os.cpus().length;
	}
}

const settings = new Settings();

export default settings;
