import type { Meta, StoryObj } from "@storybook/vue3";
import QuestionPreview from "@/components/dynamicForm/QuestionPreview.vue";
import { getInputType } from "@/helpers/formHelpers";
import { ref } from "vue";

const meta = {
  title: "Form Builder/Question Preview",
  component: QuestionPreview,
  argTypes: {
    type: {
      options: [
        "radio",
        "select",
        "checkbox",
        "text",
        "paragraph",
        "password",
        "email",
        "url",
      ],
      control: {
        type: "select",
      },
    },
  },
  parameters: {
    controls: {},
  },
  render: (args: any) => {
    const { type } = args;

    const questionType = ref(getInputType(type));

    return {
      components: { QuestionPreview },
      setup() {
        return { questionType, args };
      },
      template: `<QuestionPreview v-bind='args' v-model:question='questionType'  />`,
    };
  },
} satisfies Meta<typeof QuestionPreview>;

export default meta;
type Story = StoryObj<typeof QuestionPreview>;

export const Default: Story = {};
