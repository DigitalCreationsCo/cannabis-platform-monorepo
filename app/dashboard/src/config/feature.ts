type FeatureType = 'orders' | 'products' | 'users';
type Config = Record<FeatureType, { enabled: boolean }>;
export type FeatureConfigInterface = Readonly<Config>;

const config = Object.freeze({
	orders: {
		enabled: true,
	},
	products: {
		enabled: false,
	},
	users: {
		enabled: true,
	},
});

const loadFeatureConfig: (arg: Config) => FeatureConfigInterface = (
	config: Config,
) => Object.freeze(config);
const FeatureConfig: FeatureConfigInterface = loadFeatureConfig(config);
export { FeatureConfig, loadFeatureConfig };
