<template>
  <div
    ref="multiselectWrapper"
    :class="`rounded-2xl bg-white py-3 ${classes} ${shadowClasses} ${outlineClasses}`"
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
      :can-clear="mode === 'tags'"
      @open="onMultiselectOpening"
      @close="onMultiselectClosing"
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
import { computed } from 'vue';

export default {
  setup(props) {
    const multiselectWrapper = ref();

    const outlineClasses = computed(() => {
      return props.outline ? 'outline outline-2 outline-rose-200' : '';
    });

    const shadowClasses = computed(() => {
      return props.shadow ? 'shadow-xl shadow-slate-300/60 ' : '';
    });

    const onMultiselectOpening = () => {
      if (props.outline) {
        multiselectWrapper.value.classList.remove('outline');
        multiselectWrapper.value.classList.add('outline-dashed');
      }
    };

    const onMultiselectClosing = () => {
      if (props.outline) {
        multiselectWrapper.value.classList.remove('outline-dashed');
        multiselectWrapper.value.classList.add('outline');
      }
    };

    return {
      multiselectWrapper,
      onMultiselectOpening,
      onMultiselectClosing,
      outlineClasses,
      shadowClasses,
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
      validator: (value) => ['single', 'multiple', 'tags'].includes(value),
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
    outline: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
