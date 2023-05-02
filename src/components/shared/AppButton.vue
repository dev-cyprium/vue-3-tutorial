<template>
  <button
    type="button"
    :class="`btn-primary my-3 mr-2 px-5 py-3 ${props.classes}`"
    @click="$emit('onClick')"
  >
    <slot name="icon"></slot>
    {{ props.text }}
  </button>
</template>

<script setup>
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
});
</script>

<style lang="scss" scoped></style>
