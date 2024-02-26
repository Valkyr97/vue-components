import { ref } from "vue";
import QuestionPreview from "@/components/dynamicForm/QuestionPreview.vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { InputType } from "@/enums/InputType";

const meta = {
  title: "Form Builder/Question Preview",
  component: QuestionPreview,
  parameters: {
    controls: {},
  },
  render: (args: any) => {
    const type = ref({[InputType.SELECT]: {type: 'radio', questionChoices: []}});
    return {
      components: { QuestionPreview },
      setup() {
        return { args, type };
      },
      template: `
      <QuestionPreview v-bind='args' v-model:question='type' />
      `,
    };
  },
} satisfies Meta<typeof QuestionPreview>;

export default meta;
type Story = StoryObj<typeof QuestionPreview>;

export const Default: Story = {};
