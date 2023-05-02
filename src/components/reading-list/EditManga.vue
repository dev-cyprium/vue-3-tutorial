<template>
  <form class="space-y-6" action="#">
    <div>
      <label class="mb-2 block text-sm font-medium text-gray-900"
        >Reading status</label
      >
      <Dropdown
        classes="flex-1 basis-2/3"
        :outline="true"
        :options="readingListStore.readingStates"
        :prefilled-options="[readingListStore.readingStates[0].value]"
        :searchable="true"
        mode="single"
        placeholder="Reading status, eg: Currently reading"
        @onSelectedOptions="(ev) => $emit('onSelectedReadingState', ev)"
      />
    </div>
    <AppInputWithLabel
      type="number"
      id="chapters-read"
      label-text="Number of chapters read"
      :options="{
        min: 0,
        max: props.comic.chapters,
        showMaxNumber: true,
      }"
    />
    <AppInputWithLabel
      type="number"
      id="volumes-read"
      label-text="Number of volumes read"
      :options="{
        min: 0,
        max: props.comic.volumes,
        showMaxNumber: true,
      }"
    />
    <div>
      <label class="mb-2 block text-sm font-medium text-gray-900">
        Your rating
      </label>
      <Dropdown
        classes="flex-1 basis-2/3"
        :outline="true"
        :options="ratings"
        :prefilled-options="[ratings[0].value]"
        :searchable="true"
        mode="single"
        placeholder="Your rating, from 1 to 10"
        @onSelectedOptions="(ev) => $emit('onSelectedRating', ev)"
      />
    </div>
  </form>
</template>

<script setup>
import { useReadingListStore } from '@/stores/readingList';
import Dropdown from '@/components/shared/Dropdown.vue';
import AppInputWithLabel from '@/components/shared/AppInputWithLabel.vue';
import { computed } from 'vue';

const readingListStore = useReadingListStore();

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['onSelectedReadingState', 'onSelectedRating']);

const props = defineProps({
  comic: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const ratingDescriptions = {
  1: 'Appalling',
  2: 'Horrible',
  3: 'Very Bad',
  4: 'Bad',
  5: 'Average',
  6: 'Fine',
  7: 'Good',
  8: 'Very Good',
  9: 'Great',
  10: 'Masterpiece',
};

const ratings = computed(() => {
  return Object.entries(ratingDescriptions)
    .reduce((acc, current) => {
      const rating = current[0];
      const ratingDescription = current[1];
      return [
        ...acc,
        {
          name: `(${rating}) ${ratingDescription}`,
          value: `${ratingDescription.toLowerCase()}`,
        },
      ];
    }, [])
    .reverse();
});
</script>

<style lang="scss" scoped></style>
