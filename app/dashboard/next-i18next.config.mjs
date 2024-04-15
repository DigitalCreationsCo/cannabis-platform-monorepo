// eslint-disable-next-line @typescript-eslint/no-var-requires
import path from 'path';

const i18n = {
	defaultLocale: 'en',
	locales: ['en'],
};

const localePath = path.resolve('./locales');

export { i18n, localePath };
