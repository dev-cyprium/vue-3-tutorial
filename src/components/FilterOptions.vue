<template>
  <!-- 4xl:max-w-[100rem] -->
  <div
    class="my-5 flex w-full flex-col justify-center rounded-2xl bg-white py-3 shadow-xl shadow-slate-300/60"
  >
    <div
      class="flex flex-wrap items-center justify-center gap-10 px-6 xs:flex-col sm-md--middle:flex-row"
    >
      <Multiselect
        v-model="selectedFilters"
        mode="tags"
        placeholder="Select filters"
        track-by="name"
        label="name"
        :close-on-select="true"
        :always-open="false"
        :searchable="true"
        :options="options"
        @change="(ev) => $emit('onSelectedFilters', ev)"
      >
        <template v-slot:tag="{ option, handleTagRemove, disabled }">
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
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { ref } from 'vue';

export default {
  emits: ['onSelectedFilters'],
  setup() {
    return {
      selectedFilters: ref([]),
    };
  },
  components: {
    Multiselect,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
