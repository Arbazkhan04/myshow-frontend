import { FilterBar } from '@/components/app/FilterBar';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  component: FilterBar,
} satisfies Meta<typeof FilterBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};