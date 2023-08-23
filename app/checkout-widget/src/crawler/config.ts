import { type WidgetHost } from '../types';

class Config {
	private host: WidgetHost;
	constructor(host: WidgetHost) {
		this.host = host;
	}
	public config: Record<string, any> = {
		cart: {
			localhost: {},
			sunnyside: {},
			manasupplyco: {},
		},
	};
}

export { Config };
