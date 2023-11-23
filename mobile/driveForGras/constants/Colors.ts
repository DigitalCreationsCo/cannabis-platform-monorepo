const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const primary = '#14a33d';
const primaryLight = '#17c649';
const secondary = '#13622a';
const secondaryLight = '#4BBE6E';
const inverse = '#fff2da';
const inverseSoft = '#f9f7f2';
const accent = '#a49b8a';
const accentSoft = '#bbb5a9';
const dark = '#3e3a3a';
const darkSoft = '#a8a8a8';
const light = '#ffffff';
const lightSoft = '#c6c0b5';
const error = '#dd1616';
const yellow = '#FFF244';

export default {
	light: {
		text: dark,
		inverseText: dark,
		background: inverse,
		primary: inverseSoft,
		accent: secondaryLight,
		tint: tintColorLight,
		tabIconDefault: '#ccc',
		tabIconSelected: tintColorLight,
		borderColor: primary,
	},
	dark: {
		text: light,
		inverseText: dark,
		background: dark,
		primary: inverse,
		accent: accent,
		tint: tintColorDark,
		tabIconDefault: '#ccc',
		tabIconSelected: tintColorDark,
		borderColor: accent,
	},
};

export const shadow = {
	shadowColor: '#000',
	shadowOffset: {
		width: 0,
		height: 3,
	},
	shadowOpacity: 0.1,
	elevation: 1,
};
