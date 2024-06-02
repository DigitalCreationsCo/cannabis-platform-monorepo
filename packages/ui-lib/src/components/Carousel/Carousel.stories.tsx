import { dispensaries, type Dispensary } from '@cd/data-access';
import type { Meta, StoryObj } from '@storybook/react';
import DispensaryCard from '../DispensaryCard/DispensaryCard';
import Carousel from './Carousel';

type Story = StoryObj<typeof meta>;
const meta = {
	title: 'Carousel',
	component: Carousel,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		// bg: { control: 'color' },
	},
} satisfies Meta<typeof Carousel>;

export default meta;

export const DispensaryCarousel: Story = {
	args: {
		title: 'Dispensaries Near You',
		// Component: () => <>Dispensary Card</>,
		items: dispensaries.map((d, index) => (
			<DispensaryCard key={index} {...d} />
		)),
	},
};

// export const ArticleCarousel: Story = {
// 	args: {},
// };
