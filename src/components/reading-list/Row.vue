<template>
  <tr class="hover:bg-gray-50">
    <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
      <div class="relative h-10 w-10">
        <img
          class="h-full w-full rounded-full object-cover object-center"
          :src="props.comic.image"
          :alt="props.comic.title"
        />
        <span
          class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-blue-400 ring ring-white"
        ></span>
      </div>
      <div class="text-sm">
        <div class="font-medium text-gray-700">{{ props.comic.title }}</div>
        <div>
          <small
            v-for="(author, idx) in props.comic.authors"
            :key="idx"
            class="inline text-xs text-gray-400"
          >
            {{
              props.comic.authors.length > 1 &&
              idx !== props.comic.authors.length - 1
                ? `${author.trim()}, `
                : `${author.trim()}`
            }}
          </small>
        </div>
      </div>
    </th>
    <td class="px-6 py-4">
      <span
        class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
      >
        Currently reading
      </span>
    </td>
    <td class="px-6 py-4">
      {{ formatStartReadingDate(comic) }}
    </td>
    <td class="px-6 py-4">
      <div class="flex gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-600"
        >
          {{ props.comic.listData.chaptersRead }} / {{ props.comic.chapters }}
        </span>
      </div>
    </td>
    <td class="px-6 py-4">
      <div class="flex gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-500"
        >
          {{ props.comic.listData.volumesRead }} / {{ props.comic.volumes }}
        </span>
      </div>
    </td>
    <td class="px-6 py-4">
      <span class="flex items-center gap-1">
        {{ props.comic.listData.rating ?? 'Your rating' }}
        <StarIcon />
      </span>
    </td>
    <td class="px-6 py-4">
      <div class="flex items-center gap-4">
        <a href="#">
          <RowActions
            :comic="props.comic"
            @comic-removed="$emit('comic-removed', $event)"
          />
        </a>
      </div>
    </td>
  </tr>
</template>

<script setup>
import dayjs from 'dayjs';
import StarIcon from '@/components/shared/icons/StarIcon.vue';
import RowActions from '@/components/reading-list/RowActions.vue';

defineEmits(['comic-removed']);

const props = defineProps({
  comic: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const formatStartReadingDate = (comic) => {
  const date = comic?.listData?.startedReading ?? dayjs();
  return dayjs(date).format('DD MMM YYYY');
};
</script>

<style lang="scss" scoped></style>
