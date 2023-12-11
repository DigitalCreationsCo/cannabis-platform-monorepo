import fs from 'fs';
import { type BackendProperties } from './BackendProperties';
import { BackendPropertiesFactory } from './BackendPropertiesFactory';

/* eslint-disable @typescript-eslint/naming-convention */
export class BackendUtils {
	static backendProperties = this.createBackendProperties();

	private static DEFAULT_CONFIG_FILE_PATH = '/config.properties';

	public static createBackendProperties(): BackendProperties {
		try {
			const overrideConfigFile = process.env.LMFS_SAMPLE_APPS_CONFIG_FILE_PATH;

			let configFile: Buffer;
			if (overrideConfigFile !== undefined) {
				console.log(`Using config file: ${overrideConfigFile}`);
				configFile = fs.readFileSync(overrideConfigFile);
			} else {
				configFile = fs.readFileSync(this.DEFAULT_CONFIG_FILE_PATH);
			}
			return BackendPropertiesFactory.createFromBuffer(configFile);
		} catch (error: any) {
			console.error('Failed to create BackendProperties: ', error.message);
			throw new Error(error);
		}
	}
}
