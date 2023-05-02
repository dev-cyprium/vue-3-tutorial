<template>
  <div>
    <label
      :for="props.id"
      class="mb-2 block text-sm font-medium text-gray-900"
      >{{ props.labelText }}</label
    >
    <AppInput :id="props.id" :type="props.type" :options="props.options" />
  </div>
</template>

<script setup>
import AppInput from '@/components/shared/AppInput.vue';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (value) => {
      // When we implement styling for other types like radio, checkbox etc, we would allow it here
      return [
        'text',
        'number',
        'password',
        'email',
        'search',
        'tel',
        'url',
      ].includes(value);
    },
  },
  id: {
    type: [String, Number],
    required: true,
  },
  labelText: {
    type: String,
    default: 'Label',
    required: true,
  },
  classes: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    default: () => ({
      min: 0,
      max: 100,
      showMaxNumber: false,
    }),
  },
});
</script>

<style scoped></style>
