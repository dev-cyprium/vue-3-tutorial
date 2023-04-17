<script setup>
import dayjs from 'dayjs';
import StarIcon from '@/components/shared/icons/StarIcon.vue';
import RemoveBinIcon from '@/components/shared/icons/RemoveBinIcon.vue';

const props = defineProps({
  item: Object,
});

const formateStartReadingDate = (comic) => {
  const date = comic?.listData?.startedReading ?? dayjs();
  return dayjs(date).format('DD MMM YYYY');
};
</script>

<template>
  <tr class="hover:bg-gray-50">
    <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
      <div class="relative h-10 w-10">
        <img
          class="h-full w-full rounded-full object-cover object-center"
          :src="props.item.image"
          :alt="props.item.title"
        />
        <span
          class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-blue-400 ring ring-white"
        ></span>
      </div>
      <div class="text-sm">
        <div class="font-medium text-gray-700">{{ props.item.title }}</div>
        <div>
          <small
            v-for="(author, idx) in props.item.authors"
            :key="idx"
            class="inline text-xs text-gray-400"
          >
            {{
              props.item.authors.length > 1 &&
              idx !== props.item.authors.length - 1
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
      {{ formateStartReadingDate(comic) }}
    </td>
    <td class="px-6 py-4">
      <div class="flex gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-600"
        >
          {{ props.item.listData.chaptersRead }} / {{ props.item.chapters }}
        </span>
      </div>
    </td>
    <td class="px-6 py-4">
      <span class="flex items-center gap-1">
        {{ props.item.listData.rating ?? 'Click to rate' }}
        <StarIcon />
      </span>
    </td>
    <td class="px-6 py-4">
      <div class="flex items-center gap-4">
        <a href="#" title="Remove from list">
          <RemoveBinIcon @click="$emit('remove-comic', props.item.id)" />
        </a>
      </div>
    </td>
  </tr>
</template>

<style lang="scss" scoped></style>
