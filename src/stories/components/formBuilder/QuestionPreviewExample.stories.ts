import type { Meta, StoryObj } from "@storybook/vue3";
import QuestionExample from "@/components/example/QuestionExample.vue";
import { InputType } from "@/enums/InputType";

const meta: Meta<typeof QuestionExample> = {
  title: "Form Builder/Question Preview Example",
  component: QuestionExample,
  argTypes: {
    color: {
      control: 'color'
    }
  },
  parameters: {
    controls: {
      exclude: ["questionType"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof QuestionExample>;

export const Radio: Story = {
  parameters: {
    controls: {
      exclude: ["questionType", "placeholder"],
    },
  },
  args: {
    questionType: {
      [InputType.SELECT]: {
        type: "radio",
        questionChoices: ["First Options", "Second Option"],
      },
    },
  },
};

export const Text: Story = {
  args: {
    placeholder: "Short Text Answer",
    questionType: {
      [InputType.TEXT]: {
        paragraph: false,
      },
    },
  },
};
