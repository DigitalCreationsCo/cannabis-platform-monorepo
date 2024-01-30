export type Partner = {
	name: string;
	title: string;
	imgSrc: string;
};

export const partners: Partner[] = [
	{
		name: 'dutchie',
		title: 'dutchie',
		imgSrc: require('../../../../public/dutchie.png'),
	},
	{
		name: 'metrc',
		title: 'metrc',
		imgSrc: require('../../../../public/metrc.png'),
	},
	{
		name: 'biotrack',
		title: 'BioTrack',
		imgSrc: require('../../../../public/dutchie.png'),
	},
];
