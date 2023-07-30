<template>
  <div>
    <label :for="props.id" class="mb-2 block text-sm font-medium text-gray-900">
      {{ props.labelText }}
    </label>
    <AppInput
      :id="props.id"
      :type="props.type"
      :options="props.options"
      :model-value="modelValue"
      @update:model-value="(newValue) => $emit('update:model-value', newValue)"
    />
  </div>
</template>

<script setup>
import AppInput from '@/components/shared/AppInput.vue';
import { isAcceptedInputType } from '@/utils/helpers';

defineEmits(['update:model-value']);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => {
      return isAcceptedInputType(value);
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
