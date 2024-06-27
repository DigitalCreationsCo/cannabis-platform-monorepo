export interface Partner {
	name: string;
	title: string;
	imgSrc: string;
}

export const partners: Partner[] = [
	{
		name: 'dutchie',
		title: 'dutchie',
		imgSrc: require('../../../public/dutchie.png'),
	},
	{
		name: 'metrc',
		title: 'metrc',
		imgSrc: require('../../../public/metrc.png'),
	},
	{
		name: 'biotrack',
		title: 'BioTrack',
		imgSrc: require('../../../public/biotrack.png'),
	},
];

export const recognizedBy: Partner[] = [
	{
		name: 'new york office of cannabis management',
		title: 'New York Office of Cannabis Management',
		imgSrc: require('../../../public/nyocm.png'),
	},
	{
		name: 'national hemp association',
		title: 'National Hemp Association',
		imgSrc: require('../../../public/nha.png'),
	},
	{
		name: 'cannabis association of new york',
		title: 'Cannabis Association of New York',
		imgSrc: require('../../../public/cany.png'),
	},
];
