import type { Meta, StoryObj } from '@storybook/react';
import TextField from './TextField';

const meta = {
	title: 'TextField',
	component: TextField,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
	args: {},
};
