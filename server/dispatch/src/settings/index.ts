import os from 'os';

class Settings {

    workerPath: string;
    numCPUs: number;

    constructor() {
        this.workerPath = "src/worker.js";
        this.numCPUs = os.cpus().length;
    }
}

const settings = new Settings();
export default settings;
