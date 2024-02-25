import type { Meta, StoryObj } from "@storybook/vue3";
import FloatingActionBarVue from "@/components/bar/FloatingActionBar.vue";

const meta = {
  title: "Bars/Floating Action Bar",
  component: FloatingActionBarVue,
  parameters: {
    controls: {
      exclude: ["items", "isSetupActive"],
    },
  },
  render: (args: any) => ({
    components: { FloatingActionBarVue },
    setup() {
      return { args };
    },
    template: `<FloatingActionBarVue v-bind="args" />`,
  }),
} satisfies Meta<typeof FloatingActionBarVue>;

export default meta;
type Story = StoryObj<typeof FloatingActionBarVue>;

export const Default: Story = {};

export const Example: Story = {
  render: (args: any) => ({
    components: { FloatingActionBarVue },
    setup() {
      return { args };
    },
    template: `<FloatingActionBarVue class="absolute bottom-20" v-bind="args" />`,
  }),
  args: {
    items: [
      {
        icon: 'list',
        label: 'Select',
        payload: 'select',
      },
      {
        icon: 'text',
        label: 'Text',
        payload: 'text',
      },
      {
        icon: 'textarea',
        label: 'Paragraph',
        payload: 'paragraph',
      },
      {
        icon: 'password',
        label: 'Password',
        payload: 'password',
      },
    ]
  }
} satisfies Meta<typeof FloatingActionBarVue>;
