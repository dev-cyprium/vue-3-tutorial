<template>
  <!-- Main modal -->
  <div
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 flex h-screen max-h-full w-full cursor-auto justify-center overflow-y-auto overflow-x-hidden bg-slate-900/60 p-4 pt-40"
    @click="$emit('close')"
  >
    <div class="relative max-h-full w-full max-w-md">
      <!-- Modal content -->
      <div class="relative rounded-lg bg-white shadow" @click.prevent.stop>
        <div>
          <button
            type="button"
            @click="$emit('close')"
            class="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-rose-200"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900">
            {{ props.title }}
          </h3>
          <slot></slot>
          <AppButton
            classes="w-full mt-6 rounded-2xl"
            :text="props.buttonText"
            @onClick="$emit('onSubmit')"
          >
            <template #icon>
              <EditIcon classes="text-white mr-2 h-4 w-4" />
            </template>
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, onMounted } from 'vue';
import AppButton from '@/components/shared/AppButton.vue';
import EditIcon from '@/components/shared/icons/EditIcon.vue';

const emit = defineEmits(['close', 'onSubmit']);
const props = defineProps({
  title: {
    type: String,
    default: 'Modal title',
  },
  buttonText: {
    type: String,
    default: 'Button text',
  },
});

onMounted(() => {
  document.addEventListener('keydown', closeOnEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape);
});

const closeOnEscape = (e) => {
  if (e.code === 'Escape') {
    emit('close');
  }
};
</script>

<style lang="scss" scoped></style>
