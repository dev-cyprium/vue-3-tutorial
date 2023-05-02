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
            class="absolute top-3 right-4 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-rose-200"
            data-modal-hide="authentication-modal"
          >
            <CloseIcon />
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="px-6 py-6">
          <h3 class="mb-4 text-xl font-medium text-gray-900">
            {{ props.title }}
            <hr class="my-4" />
          </h3>
          <slot name="content"></slot>
          <div class="flex w-full gap-2">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, onMounted } from 'vue';
import CloseIcon from '@/components/shared/icons/CloseIcon.vue';

const emit = defineEmits(['close']);
const props = defineProps({
  title: {
    type: String,
    default: 'Modal title',
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
