import { Preview } from '@storybook/react';

import '../packages/ui/src/styles/ui.css';

import * as NextImage from 'next/image';
import { withPerformance } from 'storybook-addon-performance';

export const decorators = [withPerformance];
const OriginalNextImage = NextImage.default;

// OriginalNextImage.propTypes = {
// 	unoptimized: null,
//   };

OriginalNextImage.defaultProps = {
	unoptimized: true,
};

const preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
};

export default preview;
