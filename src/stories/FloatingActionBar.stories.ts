import type { Meta, StoryObj } from "@storybook/vue3";
import FloatingActionBarVue from "@/components/bar/FloatingActionBar.vue";

const meta = {
  title: "Bars/Floating Action Bar",
  component: FloatingActionBarVue,
  render: (args: any) => ({
    components: { FloatingActionBarVue },
    setup() {
      return { args };
    },
    template: `<FloatingActionBarVue v-bind="args" />`
  }),
} satisfies Meta<typeof FloatingActionBarVue>

export default meta
type Story = StoryObj<typeof FloatingActionBarVue>

export const Default: Story = {}
