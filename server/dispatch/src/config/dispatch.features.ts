type FeatureType = 'sms' | 'socket';
type Config = Record<FeatureType, { enabled: boolean }>;
export type FeatureConfigInterface = Readonly<Config>;

const config: Config = Object.freeze({
	sms: {
		enabled: true,
	},
	socket: {
		enabled: false,
	},
});

const loadFeatureConfig: (arg: Config) => FeatureConfigInterface = (
	config: Config,
) => Object.freeze(config);
const FeatureConfig: FeatureConfigInterface = loadFeatureConfig(config);
export { FeatureConfig, loadFeatureConfig };
