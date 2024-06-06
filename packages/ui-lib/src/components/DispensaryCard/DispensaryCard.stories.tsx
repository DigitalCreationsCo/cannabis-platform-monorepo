import { type Dispensary, dispensaries } from '@cd/data-access';
import { type Meta, type StoryObj } from '@storybook/react';
import DispensaryCard, { type DispensaryCardProps } from './DispensaryCard';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
type Story = StoryObj<typeof meta>;
const meta = {
	title: 'DispensaryCard',
	component: DispensaryCard,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		// bg: { control: 'color' },
	},
} satisfies Meta<typeof DispensaryCard>;

export default meta;

// const Template: Story = (args) => <DispensaryCard {...args} />;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// export const MultipleDispensaryCards: Story[] = dispensaries.map(
// 	(disp, index) => ({
// 		args: { data: disp, loading: false },
// 	}),
// );

export const DispensaryCards = () => (
	<div className="flex flex-row">
		{dispensaries
			.map((dispensary, index) => {
				return <DispensaryCard key={`dispensary-${index}`} data={dispensary} />;
			})
			.concat(<DispensaryCard data={{} as any} loading={true} />)}
	</div>
);
