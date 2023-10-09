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
      @update:model-value="(ev) => onChaptersReadUpdate(ev)"
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
      @update:model-value="(ev) => onVolumesReadUpdate(ev)"
    />
    <div>
      <label class="mb-2 block text-sm font-medium text-gray-900">
        Your rating
      </label>
      <Dropdown
        classes="flex-1 basis-2/3 py-2"
        :outline="true"
        :options="readingListStore.ratings"
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
import { onMounted, ref, watch } from 'vue';
import { useReadingListStore } from '@/stores/readingList';
import Dropdown from '@/components/shared/Dropdown.vue';
import AppInputWithLabel from '@/components/shared/AppInputWithLabel.vue';
import { getAppropriateReadingState } from '@/utils/helpers';

const readingListStore = useReadingListStore();
const emit = defineEmits(['on-comic-update']);

const props = defineProps({
  comic: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const formData = ref({
  readingState:
    props.comic?.listData?.readingState ??
    readingListStore.readingStates[0].value,
  chaptersRead: props.comic?.listData?.chaptersRead ?? 1,
  volumesRead: props.comic?.listData?.volumesRead ?? 0,
  rating: props.comic?.listData?.rating ?? readingListStore.ratings[0].value,
});

const previousReadingState = ref(formData.value.readingState);

watch(
  () => formData.value.readingState,
  (_newVal, previousVal) => {
    previousReadingState.value = previousVal;
  },
);

onMounted(() => {
  emitChanges();
});

const emitChanges = () => {
  emit('on-comic-update', {
    ...formData.value,
  });
};

const onSelectedReadingState = (readingState) => {
  formData.value.readingState = readingState;

  if (readingState === 'completed') {
    formData.value.chaptersRead = props.comic.chapters;
    formData.value.volumesRead = props.comic.volumes;
  }

  if (readingState === 'todo') {
    formData.value.chaptersRead = 0;
    formData.value.volumesRead = 0;
  }
  emitChanges();
};

const onVolumesReadUpdate = (updatedVolumes) => {
  formData.value.readingState = getAppropriateReadingState({
    read: updatedVolumes,
    maxToRead: props.comic.volumes,
    previousState: previousReadingState.value,
    currentState: formData.value.readingState,
  });
  emitChanges();
};

const onChaptersReadUpdate = (updatedChapters) => {
  formData.value.readingState = getAppropriateReadingState({
    read: updatedChapters,
    maxToRead: props.comic.chapters,
    previousState: previousReadingState.value,
    currentState: formData.value.readingState,
  });
  emitChanges();
};

const onSelectedRating = (rating) => {
  formData.value.rating = rating;
  emitChanges();
};
</script>

<style lang="scss" scoped></style>
