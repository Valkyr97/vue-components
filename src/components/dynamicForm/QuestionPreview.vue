<script setup lang="ts">
import { FormKitIcon } from "@formkit/vue";
import { QuestionType } from "@/types/IForms.ts";
import { InputType } from "@/enums/InputType.ts";

defineProps<{
  placeholder?: string;
}>();

//State
const question = defineModel<QuestionType>("question");

//@ts-ignore
const [questionType, questionData] = Object.entries(question.value)[0] as [
  InputType,
  any
];

const deleteOption = (i: number) => {
  questionData.questionChoices = questionData.questionChoices.filter(
    (_: any, index: number) => index !== i
  );
};

const midWidthInputs = [
  InputType.TEXT,
  InputType.DATE,
  InputType.TIME,
  InputType.FILE,
  InputType.EMAIL,
];
</script>

<template>
  <div v-if="questionType === InputType.SELECT">
    <template v-if="questionData.type !== 'select'">
      <div
        v-for="(_, i) in questionData.questionChoices"
        class="flex w-3/4 pb-2 place-content-between"
      >
        <div class="flex gap-x-2 items-center w-full">
          <div
            :class="{ '!rounded-full': questionData.type === 'radio' }"
            class="border-2 border-gray-400 h-4 w-4 rounded bg-gray-200"
          />
          <FormKit
            type="text"
            v-model="questionData.questionChoices[i]"
            placeholder="Opción a escoger"
            input-class="$remove:py-2 $remove:px-3 autofill:bg-transparent w-full"
            inner-class="$reset focus-within:border-gray-400 border-b border-transparent transition w-full"
            outer-class="$reset w-full"
          />
        </div>
        <FormKitIcon
          icon="close"
          class="flex w-4 cursor-pointer"
          @click="deleteOption(i)"
        />
      </div>
      <div
        @click="questionData.questionChoices.push('')"
        class="flex gap-x-2 items-center cursor-pointer text-gray-400 hover:text-black transition w-fit"
      >
        <FormKitIcon icon="add" class="flex w-4" />
        <span>Agregar una opción</span>
      </div>
    </template>
    <template v-else>
      <FormKit
        type="select"
        :options="[
          { label: 'Seleccione una opción', attrs: { disabled: true } },
          ...questionData.questionChoices,
        ]"
        :ignore="true"
        inner-class="$remove:ring-1 $remove:focus-within:ring-2 border-b-2 border-gray-400 $remove:rounded"
        select-icon-class="text-2xl !flex-grow"
      />
    </template>
  </div>
  <div v-else>
    <FormKit
      :type="questionType"
      :placeholder="placeholder"
      disabled
      :inner-class="{
        $reset: questionType !== InputType.FILE,
        '$remove:ring-1': questionType === InputType.FILE,
        'border-b-2 border-gray-300': true,
        'border-dashed': questionType === InputType.TEXT,
        'max-w-md': midWidthInputs.includes(questionType),
        '!max-w-full':
          questionType === InputType.TEXT && questionData.paragraph,
        '!w-48': questionType === InputType.NUMBER,
      }"
      :no-files-icon="
        questionType === 'file' && questionData.type === 'image'
          ? 'fileImage'
          : 'fileDoc'
      "
    />
  </div>
</template>

<style scoped></style>
