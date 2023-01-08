<template>
  <div class="mb-5 flex w-full justify-center gap-3 xs:flex-col md:flex-row">
    <Dropdown
      classes="flex-1 basis-1/3"
      :options="sortingOptions"
      :prefilled-options="[sortingOptions[0].value]"
      :searchable="false"
      mode="single"
      placeholder="Sort by..."
      @onSelectedOptions="(ev) => $emit('onSelectedSortingOption', ev)"
    />
    <Dropdown
      classes="flex-1 basis-1/3"
      :options="sortingModes"
      :prefilled-options="[sortingModes[0].value]"
      :searchable="false"
      mode="single"
      placeholder="Sort ascending / descending"
      @onSelectedOptions="(ev) => $emit('onSelectedMode', ev)"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import Dropdown from '@/components/shared/Dropdown.vue';

export default {
  setup() {
    const sortingOptions = computed(() => [
      {
        name: 'Sort by rating',
        value: 'score',
      },
      {
        name: 'Sort by number of chapters',
        value: 'chapters',
      },
    ]);

    const sortingModes = computed(() => [
      {
        name: 'Ascending',
        value: 'asc',
      },
      {
        name: 'Descending',
        value: 'desc',
      },
    ]);

    return {
      sortingOptions,
      sortingModes,
    };
  },
  emits: ['onSelectedSortingOption', 'onSelectedMode'],
  components: {
    Dropdown,
  },
};
</script>

<style lang="scss" scoped></style>
