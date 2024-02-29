import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { ComponentProps } from "vue-component-type-helpers";
import { getInputType } from "@/helpers/formHelpers";
import QuestionPreview from "@/components/dynamicForm/QuestionPreview.vue";

type QuestionPreviewPropsAndCustomArgs = ComponentProps<
  typeof QuestionPreview
> & {
  type?: string;
};

const meta: Meta<QuestionPreviewPropsAndCustomArgs> = {
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
};

export default meta;
type Story = StoryObj<QuestionPreviewPropsAndCustomArgs>;

export const Default: Story = {};
