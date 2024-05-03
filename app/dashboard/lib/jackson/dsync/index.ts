import env from '@/lib/env';
import { JacksonEmbedded } from './embed';
import { JacksonHosted } from './hosted';

export const dsyncManager = () => {
	if (env.jackson.selfHosted) {
		return new JacksonHosted();
	} else {
		return new JacksonEmbedded();
	}
};
