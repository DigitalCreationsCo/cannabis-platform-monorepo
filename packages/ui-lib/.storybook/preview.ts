import type { Preview } from '@storybook/react';
import '../src/styles/tailwind.css';
import * as NextImage from 'next/image';

const OriginalNextImage = NextImage.default;

// OriginalNextImage.propTypes = {
// 	unoptimized: null,
//   };

OriginalNextImage.defaultProps = {
	unoptimized: true,
};

const preview: Preview = {
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
