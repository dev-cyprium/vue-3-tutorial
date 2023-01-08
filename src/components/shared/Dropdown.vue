<template>
  <div
    :class="`rounded-2xl bg-white py-3 shadow-xl shadow-slate-300/60 ${classes}`"
  >
    <Multiselect
      v-model="selectedOptions"
      :mode="mode"
      :placeholder="placeholder"
      track-by="name"
      label="name"
      :close-on-select="true"
      :always-open="false"
      :searchable="searchable"
      :options="options"
      @change="(ev) => $emit('onSelectedOptions', ev)"
    >
      <template
        v-if="mode === 'tags'"
        v-slot:tag="{ option, handleTagRemove, disabled }"
      >
        <div
          class="multiselect-tag is-user"
          :class="{
            'is-disabled': disabled,
          }"
        >
          {{ option.name }}
          <span
            v-if="!disabled"
            class="multiselect-tag-remove"
            @mousedown.prevent="handleTagRemove(option, $event)"
          >
            <span class="multiselect-tag-remove-icon"></span>
          </span>
        </div>
      </template>
    </Multiselect>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { ref } from '@vue/reactivity';

export default {
  setup(props) {
    return {
      selectedOptions: ref(props.prefilledOptions),
    };
  },
  components: {
    Multiselect,
  },
  emits: ['onSelectedOptions'],
  props: {
    prefilledOptions: {
      type: Array,
      required: false,
      default: () => [],
    },
    options: {
      type: Array,
      required: true,
    },
    mode: {
      type: String,
      default: 'single',
      validator(value) {
        return ['single', 'multiple', 'tags'].includes(value);
      },
    },
    classes: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Select...',
    },
    searchable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
