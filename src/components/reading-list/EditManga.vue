<template>
  <form class="space-y-6" action="#">
    <div>
      <label class="mb-2 block text-sm font-medium text-gray-900">
        Reading status
      </label>
      <Dropdown
        classes="flex-1 basis-2/3 py-2"
        :outline="true"
        :options="readingListStore.readingStates"
        :prefilled-options="formData.readingState"
        :searchable="true"
        mode="single"
        placeholder="Reading status, eg: Currently reading"
        @on-selected-options="(ev) => onSelectedReadingState(ev)"
      />
    </div>
    <AppInputWithLabel
      v-model="formData.chaptersRead"
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
      v-model="formData.volumesRead"
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
        classes="flex-1 basis-2/3 py-2"
        :outline="true"
        :options="ratings"
        :prefilled-options="formData.rating"
        :searchable="true"
        mode="single"
        placeholder="Your rating, from 1 to 10"
        @on-selected-options="(ev) => onSelectedRating(ev)"
      />
    </div>
  </form>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useReadingListStore } from '@/stores/readingList';
import Dropdown from '@/components/shared/Dropdown.vue';
import AppInputWithLabel from '@/components/shared/AppInputWithLabel.vue';
import { ratingDescriptions } from '../../composables/helpers';

const readingListStore = useReadingListStore();

const props = defineProps({
  comic: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const ratings = computed(() => {
  return Object.entries(ratingDescriptions)
    .reduce((acc, current) => {
      const rating = +current[0];
      const ratingDescription = current[1];
      let value = ratingDescription.toLowerCase().split(' ');

      if (value.length > 1) {
        value = value.join('_');
      } else {
        value = value[0];
      }

      return [
        ...acc,
        {
          name: `(${rating}) ${ratingDescription}`,
          value: value,
          rating,
        },
      ];
    }, [])
    .reverse();
});

const formData = ref({
  readingState:
    props.comic.listData.readingState ??
    readingListStore.readingStates[0].value,
  chaptersRead: props.comic.listData.chaptersRead ?? 1,
  volumesRead: props.comic.listData.volumesRead ?? 0,
  rating: props.comic.listData.rating ?? ratings.value[0].value,
});

const onSelectedReadingState = (readingState) => {
  console.log('selected readingState: ', readingState);
};

const onSelectedRating = (rating) => {
  console.log('selected rating: ', rating);
};
</script>

<style lang="scss" scoped></style>
