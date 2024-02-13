import fs from 'fs';
import path from 'path';
import { type BackendProperties } from './BackendProperties';
import { BackendPropertiesFactory } from './BackendPropertiesFactory';

/* eslint-disable @typescript-eslint/naming-convention */
export class BackendUtils {
	static backendProperties = this.createBackendProperties();

	public static createBackendProperties(): BackendProperties {
		const DEFAULT_CONFIG_FILE_PATH = 'config.properties.json';

		try {
			const overrideConfigFile = process.env.LMFS_SAMPLE_APPS_CONFIG_FILE_PATH;

			let configFile: Buffer;
			if (overrideConfigFile !== undefined) {
				console.log(`Using config file: ${overrideConfigFile}`);
				configFile = fs.readFileSync(overrideConfigFile);
			} else {
				console.info(`\nUsing default config file: `, DEFAULT_CONFIG_FILE_PATH);
				// console.info(
				// 	'file: ',
				// 	fs.readFileSync(path.resolve('./src', DEFAULT_CONFIG_FILE_PATH)),
				// );
				configFile = fs.readFileSync(
					path.resolve('./src', DEFAULT_CONFIG_FILE_PATH),
				);
			}
			return BackendPropertiesFactory.createFromBuffer(configFile);
		} catch (error: any) {
			console.error('\nFailed to create BackendProperties: ', error.message);
			throw new Error(error);
		}
	}
}
