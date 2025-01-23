import { type Meta, type StoryObj } from '@storybook/react';
import LoginModal from './LoginModal';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: 'LoginModal',
	component: LoginModal,
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
} satisfies Meta<typeof LoginModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginModalOpen: Story = {
	args: {
		modalVisible: true,
		dispatchCloseModal: () => 0,
	},
};
export const LoginModalClosed: Story = {
	args: {
		modalVisible: false,
		dispatchCloseModal: () => 0,
	},
};
