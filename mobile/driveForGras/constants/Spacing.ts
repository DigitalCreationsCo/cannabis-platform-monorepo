/* eslint-disable @typescript-eslint/naming-convention */
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const spacing = {
	0: 0,
	1: 4,
	2: 8,
	3: 12,
	4: 16,
	5: 20,
	6: 24,
	7: 28,
	8: 32,

	radius: 10,

	sm: 50,
	lg: 80,

	width,
	height,
};

export const fontSize = {
	sm: 18,
	lg: 30,
};

export const fontWeight = {
	0: '100',
	1: '200',
	2: '300',
};
