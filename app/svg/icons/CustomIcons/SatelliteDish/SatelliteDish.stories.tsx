import { Shrimp } from '@phosphor-icons/react/dist/ssr';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from '@/glaze-components/icon';
import { SatelliteDish } from '.';

const meta = {
  component: SatelliteDish,
  title: 'CustomIcons/SatelliteDish',
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'xxl', 'headline'],
    },
    color: {
      control: { type: 'color' },
    },
    weight: {
      control: { type: 'select' },
      options: ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'],
    },
  },
} satisfies Meta<typeof SatelliteDish>;

export default meta;
type Story = StoryObj<typeof SatelliteDish>;

export const Default: Story = {
  args: {
    size: 'xl',
    color: 'black',
    weight: 'regular',
  },
};

export const Fills: Story = {
  render: () => (
    <div className="flex flex-row gap-4">
      <Icon type={SatelliteDish} size="lg" color="black" weight="thin" />
      <Icon type={SatelliteDish} size="lg" color="black" weight="light" />
      <Icon type={SatelliteDish} size="lg" color="black" weight="regular" />
      <Icon type={SatelliteDish} size="lg" color="black" weight="bold" />
      <Icon type={SatelliteDish} size="lg" color="black" weight="fill" />
      <Icon type={SatelliteDish} size="lg" color="black" weight="duotone" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-row gap-4">
      <Icon type={SatelliteDish} size="lg" color="black" weight="duotone" />
      <Icon type={SatelliteDish} size="lg" color="blue" weight="duotone" />
      <Icon type={SatelliteDish} size="lg" color="red" weight="duotone" />
      <Icon type={SatelliteDish} size="lg" color="green" weight="duotone" />
      <Icon type={SatelliteDish} size="lg" color="purple" weight="duotone" />
      <Icon type={SatelliteDish} size="lg" color="orange" weight="duotone" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-row gap-4">
      <Icon type={SatelliteDish} size="sm" color="black" weight="fill" />
      <Icon type={SatelliteDish} size="md" color="black" weight="fill" />
      <Icon type={SatelliteDish} size="lg" color="black" weight="fill" />
      <Icon type={SatelliteDish} size="xl" color="black" weight="fill" />
      <Icon type={SatelliteDish} size="xxl" color="black" weight="fill" />
      <Icon type={SatelliteDish} size="headline" color="black" weight="fill" />
    </div>
  ),
};

export const IconDirectComparison: Story = {
  render: () => (
    <div className="flex flex-row gap-4">
      <Icon type={SatelliteDish} size="xl" color="black" weight="duotone" />
      <SatelliteDish size="xl" color="black" weight="duotone" />
      <Icon type={Shrimp} size="xl" color="black" weight="duotone" />

      <Icon type={SatelliteDish} size="headline" color="black" weight="duotone" />
      <Icon type={SatelliteDish} size="headline" color="black" weight="duotone" />
      <Icon type={Shrimp} size="headline" color="black" weight="duotone" />
    </div>
  ),
};
