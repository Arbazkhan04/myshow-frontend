import type { Meta, StoryObj } from '@storybook/react-vite';

import { EpisodesView } from './EpisodesView';

const meta = {
  component: EpisodesView,
} satisfies Meta<typeof EpisodesView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};