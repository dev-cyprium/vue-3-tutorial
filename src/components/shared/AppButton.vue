<template>
  <button
    type="button"
    :class="`btn-base
      my-3 mr-2
      px-5 py-3
      text-sm font-medium
      ${additionalClasses}
      ${props.classes}
    `"
    @click="$emit('onClick')"
  >
    <slot name="icon"></slot>
    {{ props.text }}
  </button>
</template>

<script setup>
import { computed } from 'vue';

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['onClick']);

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  classes: {
    type: String,
    default: '',
  },
  isPrimary: {
    type: Boolean,
    default: true,
  },
});

const additionalClasses = computed(() => {
  return props.isPrimary
    ? `bg-rose-300 text-white
      hover:bg-gradient-to-l hover:from-teal-300 hover:to-rose-300
    `
    : `bg-white text-rose-300 border-2 border-rose-300
      hover:bg-gradient-to-l hover:from-rose-100 hover:to-white
    `;
});
</script>

<style lang="scss" scoped></style>
