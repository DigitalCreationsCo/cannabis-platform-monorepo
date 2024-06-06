import { dispensaries } from '@cd/data-access';
import { type Meta, type StoryObj } from '@storybook/react';
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

const items = dispensaries.map((d, index) => (
	<DispensaryCard key={`dispensary-card-${index}`} data={d} />
));

export const DispensaryCarousel = () => (
	<div className="w-full">
		<Carousel
			className="w-screen"
			title={'Dispensaries Near You'}
			items={items}
		/>
	</div>
);
