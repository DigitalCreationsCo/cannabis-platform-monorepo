import tailwindConfig from '@cd/shared-config/tailwind.config.cjs'; // Fix the path
import resolveConfig from 'tailwindcss/resolveConfig';

const fullConfig = resolveConfig(tailwindConfig);

export const getBreakpointValue = (value: string): number =>
    +fullConfig.theme.screens[value].slice(0, fullConfig.theme.screens[value].indexOf('px'));

export const useBreakpoint = (): string => {
    let currentBreakpoint = '';
    let biggestBreakpointValue = 0;
    for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
        const breakpointValue = getBreakpointValue(breakpoint);
        if (breakpointValue > biggestBreakpointValue && window.innerWidth >= breakpointValue) {
            biggestBreakpointValue = breakpointValue;
            currentBreakpoint = breakpoint;
        }
    }
    return currentBreakpoint;
};

export const useThemeValue = (): string => {
    let themeValue: string;
    return themeValue;
};
