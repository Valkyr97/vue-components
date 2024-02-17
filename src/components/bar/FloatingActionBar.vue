<script setup lang="ts">
import { ref } from "vue";
import { Queue } from "@/datastructures/Queue";
import { onClickOutside } from "@vueuse/core";
// import type { IDraggableItem } from "../../data/dynamicFormsData.ts";
// import type { QuestionType } from "../../types/IForms.ts";

export type Item<T> = {
  icon: string;
  label: string;
  type: T;
};

const props = defineProps<{
  items?: Item<any>[];
  isSetupActive: boolean;
}>();

// State
const emits = defineEmits<{
  <T>(e: "itemClicked", item: any): void;
  (e: "setupClicked"): void;
  (e: "copyClicked"): void;
  (e: "submitClicked"): void;
}>();

const showAddOptions = ref(false);
const onClickOutsideTarget = ref();
const ignoreTarget = ref();

const lastUsedOptions = ref(new Queue<any>([], { maxNumberOfItems: 4 }));

// Actions
const handleClick = <T>(item: Item<T>) => {
  emits("itemClicked", item.type);
  showAddOptions.value = false;

  if (props.isSetupActive) return;
  if (!lastUsedOptions.value.has(item, true)) {
    lastUsedOptions.value.enqueue(item);
  }
};

const handleSetupClick = () => {
  emits("setupClicked");
};

onClickOutside(onClickOutsideTarget, () => (showAddOptions.value = false), {
  ignore: [ignoreTarget],
});
</script>

<template>
  <div class="flex flex-col w-96 gap-y-1 items-baseline">
    <div
      ref="ignoreTarget"
      :class="{ 'scale-y-100 bottom-24': showAddOptions }"
      class="flex flex-col gap-y-2 scale-y-0 origin-bottom overflow-hidden border w-fit fixed bottom-12 transition-all duration-150 px-2 py-1 rounded-xl shadow z-10 bg-white"
    >
      <div
        v-for="item in items"
        @click="handleClick(item)"
        class="flex gap-x-1 items-center cursor-pointer group"
      >
        <div
          class="border bg-neutral-300 rounded-lg hover:opacity-90 h-8 w-8 group-hover:border-blue-500 flex items-center place-content-center"
        >
          <!-- <FormKitIcon
            :icon="item.icon"
            class="flex w-4 h-4 group-hover:text-blue-500"
          /> -->
        </div>
        <span class="pl-1.5 group-hover:text-blue-500">{{ item.label }}</span>
      </div>
    </div>

    <div
      class="flex flex-shrink-0 px-2 py-2.5 w-96 fixed border border-gray-300 rounded-2xl shadow-md shadow-neutral-400 bg-white items-center gap-x-2"
    >
      <button
        @click="showAddOptions = !showAddOptions"
        ref="onClickOutsideTarget"
        :class="{ 'border-blue-500 *:!fill-blue-500': showAddOptions }"
        type="button"
        class="border bg-neutral-300 rounded-xl hover:opacity-90 transition w-10 h-10 fill-neutral-700 flex place-content-center items-center"
      >
        <svg
          class="w-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
        >
          <path
            d="M6 8H1C0.716667 8 0.479167 7.90417 0.2875 7.7125C0.0958333 7.52083 0 7.28333 0 7C0 6.71667 0.0958333 6.47917 0.2875 6.2875C0.479167 6.09583 0.716667 6 1 6H6V1C6 0.716667 6.09583 0.479167 6.2875 0.2875C6.47917 0.0958333 6.71667 0 7 0C7.28333 0 7.52083 0.0958333 7.7125 0.2875C7.90417 0.479167 8 0.716667 8 1V6H13C13.2833 6 13.5208 6.09583 13.7125 6.2875C13.9042 6.47917 14 6.71667 14 7C14 7.28333 13.9042 7.52083 13.7125 7.7125C13.5208 7.90417 13.2833 8 13 8H8V13C8 13.2833 7.90417 13.5208 7.7125 13.7125C7.52083 13.9042 7.28333 14 7 14C6.71667 14 6.47917 13.9042 6.2875 13.7125C6.09583 13.5208 6 13.2833 6 13V8Z"
          />
        </svg>
      </button>
      <!-- <div
        @click="$emit('copyClicked')"
        class="border cursor-pointer bg-neutral-300 rounded-xl hover:opacity-90 transition w-10 h-10 flex items-center place-content-center"
      >
        <FormKitIcon icon="copy" class="flex w-5 fill-gray-900" />
      </div> -->
      <div
        :class="{ 'opacity-40': isSetupActive }"
        class="flex-grow flex place-content-start border-x-2 px-1 transition h-full"
      >
        <template v-for="item in lastUsedOptions.toArray().reverse()">
          <div
            class="flex basis-1/5 items-center place-content-center"
            :class="{ 'pointer-events-none': isSetupActive }"
          >
            <div
              @click="handleClick(item)"
              class="border bg-neutral-300 rounded-xl hover:opacity-90 transition w-9 h-9 flex items-center place-content-center cursor-pointer"
            >
              <!-- <FormKitIcon :icon="item?.icon" class="flex w-5" /> -->
            </div>
          </div>
        </template>
      </div>
      <div
        @click="handleSetupClick"
        :class="{ '!border-blue-600 text-blue-600': isSetupActive }"
        class="border cursor-pointer bg-neutral-300 rounded-xl hover:opacity-90 transition w-10 h-10 flex items-center place-content-center fill-neutral-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="w-4"
        >
          <path
            d="M8.12509 20C7.87509 20 7.65843 19.9167 7.47509 19.75C7.29176 19.5833 7.18343 19.375 7.15009 19.125L6.85009 16.8C6.63343 16.7167 6.42926 16.6167 6.23759 16.5C6.04593 16.3833 5.85843 16.2583 5.67509 16.125L3.50009 17.025C3.26676 17.125 3.03343 17.1375 2.80009 17.0625C2.56676 16.9875 2.38343 16.8417 2.25009 16.625L0.400093 13.4C0.26676 13.1833 0.225093 12.95 0.275093 12.7C0.325093 12.45 0.450093 12.25 0.650093 12.1L2.52509 10.675C2.50843 10.5583 2.50009 10.4458 2.50009 10.3375V9.6625C2.50009 9.55417 2.50843 9.44167 2.52509 9.325L0.650093 7.9C0.450093 7.75 0.325093 7.55 0.275093 7.3C0.225093 7.05 0.26676 6.81667 0.400093 6.6L2.25009 3.375C2.38343 3.15833 2.56676 3.0125 2.80009 2.9375C3.03343 2.8625 3.26676 2.875 3.50009 2.975L5.67509 3.875C5.85843 3.74167 6.05009 3.61667 6.25009 3.5C6.45009 3.38333 6.65009 3.28333 6.85009 3.2L7.15009 0.875C7.18343 0.625 7.29176 0.416667 7.47509 0.25C7.65843 0.0833333 7.87509 0 8.12509 0H11.8751C12.1251 0 12.3418 0.0833333 12.5251 0.25C12.7084 0.416667 12.8168 0.625 12.8501 0.875L13.1501 3.2C13.3668 3.28333 13.5709 3.38333 13.7626 3.5C13.9543 3.61667 14.1418 3.74167 14.3251 3.875L16.5001 2.975C16.7334 2.875 16.9668 2.8625 17.2001 2.9375C17.4334 3.0125 17.6168 3.15833 17.7501 3.375L19.6001 6.6C19.7334 6.81667 19.7751 7.05 19.7251 7.3C19.6751 7.55 19.5501 7.75 19.3501 7.9L17.4751 9.325C17.4918 9.44167 17.5001 9.55417 17.5001 9.6625V10.3375C17.5001 10.4458 17.4834 10.5583 17.4501 10.675L19.3251 12.1C19.5251 12.25 19.6501 12.45 19.7001 12.7C19.7501 12.95 19.7084 13.1833 19.5751 13.4L17.7251 16.6C17.5918 16.8167 17.4043 16.9667 17.1626 17.05C16.9209 17.1333 16.6834 17.125 16.4501 17.025L14.3251 16.125C14.1418 16.2583 13.9501 16.3833 13.7501 16.5C13.5501 16.6167 13.3501 16.7167 13.1501 16.8L12.8501 19.125C12.8168 19.375 12.7084 19.5833 12.5251 19.75C12.3418 19.9167 12.1251 20 11.8751 20H8.12509ZM9.00009 18H10.9751L11.3251 15.35C11.8418 15.2167 12.3209 15.0208 12.7626 14.7625C13.2043 14.5042 13.6084 14.1917 13.9751 13.825L16.4501 14.85L17.4251 13.15L15.2751 11.525C15.3584 11.2917 15.4168 11.0458 15.4501 10.7875C15.4834 10.5292 15.5001 10.2667 15.5001 10C15.5001 9.73333 15.4834 9.47083 15.4501 9.2125C15.4168 8.95417 15.3584 8.70833 15.2751 8.475L17.4251 6.85L16.4501 5.15L13.9751 6.2C13.6084 5.81667 13.2043 5.49583 12.7626 5.2375C12.3209 4.97917 11.8418 4.78333 11.3251 4.65L11.0001 2H9.02509L8.67509 4.65C8.15843 4.78333 7.67926 4.97917 7.23759 5.2375C6.79593 5.49583 6.39176 5.80833 6.02509 6.175L3.55009 5.15L2.57509 6.85L4.72509 8.45C4.64176 8.7 4.58343 8.95 4.55009 9.2C4.51676 9.45 4.50009 9.71667 4.50009 10C4.50009 10.2667 4.51676 10.525 4.55009 10.775C4.58343 11.025 4.64176 11.275 4.72509 11.525L2.57509 13.15L3.55009 14.85L6.02509 13.8C6.39176 14.1833 6.79593 14.5042 7.23759 14.7625C7.67926 15.0208 8.15843 15.2167 8.67509 15.35L9.00009 18ZM10.0501 13.5C11.0168 13.5 11.8418 13.1583 12.5251 12.475C13.2084 11.7917 13.5501 10.9667 13.5501 10C13.5501 9.03333 13.2084 8.20833 12.5251 7.525C11.8418 6.84167 11.0168 6.5 10.0501 6.5C9.06676 6.5 8.23759 6.84167 7.56259 7.525C6.88759 8.20833 6.55009 9.03333 6.55009 10C6.55009 10.9667 6.88759 11.7917 7.56259 12.475C8.23759 13.1583 9.06676 13.5 10.0501 13.5Z"
          />
        </svg>
      </div>
      <!-- <div
        @click="$emit('submitClicked')"
        class="border cursor-pointer bg-neutral-300 rounded-xl hover:opacity-90 transition w-10 h-10 flex items-center place-content-center"
      >
        <FormKitIcon
          icon="submit"
          class="flex w-5 text-transparent stroke-black"
        />
      </div> -->
    </div>
  </div>
</template>

<style scoped></style>
