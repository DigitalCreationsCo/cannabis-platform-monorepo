import dotenv from 'dotenv';
import { default as oai } from 'openai';

dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });

class OpenAI {
	constructor() {
		try {
			this.openai = new oai({
				timeout: 30 * 1000,
			});
		} catch (error) {
			console.log('OpenAI failed to initilize: ', error.message);
		}
	}
}

const openai = new OpenAI();
export { openai };
