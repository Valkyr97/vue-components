<script setup lang="ts">
import InputItemLayout from '@/layout/InputItemLayout.vue';
import QuestionPreview from '../dynamicForm/QuestionPreview.vue';
import { ref } from 'vue';
import { QuestionType } from '@/types/IForms';

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    questionType: QuestionType;
    selected?: boolean;
    color: string;
  }>(),
  { selected: false }
);

//State
const question = ref<QuestionType>(props.questionType);

const title = ref('');
const description = ref('');
</script>
<template>
  <InputItemLayout :selected="selected" :main-color="color">
    <div class="flex flex-col w-full px-6 gap-y-1">
      <FormKit
        type="text"
        v-model="title"
        class=""
        outer-class="$remove:mb-4 $remove:max-w-[20em]"
        inner-class="border-b-2 border-gray-400 focus-within:border-b-blue-500
                         $remove:rounded $remove:ring-1 $remove:ring-gray-400 $remove:max-w-md w-full $remove:focus-within:ring-2 $remove:focus-within:ring-blue-500"
        input-class="$remove:py-3 py-1"
        placeholder="Introduzca el encabezado"
      />
      <FormKit
        type="textarea"
        v-model="description"
        auto-height
        placeholder="Descripción (opcional)"
        outer-class="$remove:mb-4 $remove:max-w-[20em]"
        inner-class="border-b-2 border-gray-400 focus-within:border-b-blue-500 $remove:rounded $remove:ring-1 $remove:ring-gray-400 $remove:max-w-md w-full $remove:focus-within:ring-2 $remove:focus-within:ring-blue-500"
        input-class="$remove:py-3 py-1"
      />
      <QuestionPreview v-bind="props" v-model:question="question" />
    </div>
  </InputItemLayout>
</template>
