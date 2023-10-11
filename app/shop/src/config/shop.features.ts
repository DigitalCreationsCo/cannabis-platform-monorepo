type FeatureType = 'categories';
type Config = Record<FeatureType, { enabled: boolean }>;
export type FeatureConfigInterface = Readonly<Config>;

const config: Config = Object.freeze({
	categories: {
		enabled: false,
	},
});

const loadFeatureConfig: (arg: Config) => FeatureConfigInterface = (
	config: Config,
) => Object.freeze(config);
const FeatureConfig: FeatureConfigInterface = loadFeatureConfig(config);
export { FeatureConfig, loadFeatureConfig };
