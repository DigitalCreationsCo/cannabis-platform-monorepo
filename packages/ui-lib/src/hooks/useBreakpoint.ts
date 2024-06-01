// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.cjs'; // Fix the path

const fullConfig = resolveConfig(tailwindConfig);

export const getBreakpointValue = (value: string): number => {
	// console.info('value', value)
	// console.info(fullConfig?.theme?.screens?.[value]?.slice(0, fullConfig.theme.screens[value].indexOf('px')));
	return +fullConfig?.theme?.screens?.[value]?.slice(
		0,
		fullConfig.theme.screens[value].indexOf('px'),
	);
};

export const useBreakpoint = (): {
	currentBreakpoint: number;
	biggestBreakpointValue: number;
} => {
	let currentBreakpoint = '';
	let biggestBreakpointValue = 0;
	if (typeof window !== 'undefined') {
		for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
			const breakpointValue = getBreakpointValue(breakpoint);
			if (
				breakpointValue > biggestBreakpointValue &&
				window.innerWidth >= breakpointValue
			) {
				biggestBreakpointValue = breakpointValue;
				currentBreakpoint = breakpointValue;
			}
		}
	}
	return { currentBreakpoint, biggestBreakpointValue };
};

// export const useThemeValue = (): string => {
//     let themeValue: string;
//     return themeValue;
// };
