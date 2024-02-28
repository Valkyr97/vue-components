<script setup lang="ts">
import {FormKitIcon} from '@formkit/vue'

withDefaults(defineProps<{
  holdClass: string
  iconColor?: string
}>(), {})

</script>

<template>
  <div
      class="h-7 flex bg-white w-full place-content-center items-center relative"
  >
    <div
        :class="holdClass"
        class="flex flex-col transition duration-75 cursor-move"
    >
      <FormKitIcon
          icon="reorder"
          class="rotate-90 flex h-5 w-2 text-gray-700 custom-colour"
      />
      <FormKitIcon
          icon="reorder"
          class="rotate-90 flex h-5 w-2 -mt-3.5 text-gray-700 custom-colour"
      />
    </div>
  </div>
</template>

<style scoped>
.custom-colour {
  color: v-bind(iconColor) !important;
}
</style>
