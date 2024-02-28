import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { InputType } from "@/enums/InputType";
import QuestionExample from "@/components/example/QuestionExample.vue";

const meta = {
  title: "Form Builder/Question Preview",
  component: QuestionExample,
  parameters: {
    controls: {},
  },
  render: (args: any) => {
    const type = ref({[InputType.SELECT]: {type: 'radio', questionChoices: []}});
    return {
      components: { QuestionExample },
      setup() {
        return { args, type };
      },
      template: `
      <QuestionExample v-bind='args' v-model:question='type' />
      `,
    };
  },
} satisfies Meta<typeof QuestionExample>;

export default meta;
type Story = StoryObj<typeof QuestionExample>;

export const Default: Story = {};
