<script setup>
import RowActions from '@/components/reading-list/RowActions.vue';

const chaptersRead = 50;
const yourRating = 9;

const props = defineProps({
  items: Array,
});
</script>

<template>
  <tr class="hover:bg-gray-50" v-for="comic in props.items" :key="comic.id">
    <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
      <div class="relative h-10 w-10">
        <img
          class="h-full w-full rounded-full object-cover object-center"
          :src="comic.image"
          :alt="comic.title"
        />
        <span
          class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-blue-400 ring ring-white"
        ></span>
      </div>
      <div class="text-sm">
        <div class="font-medium text-gray-700">{{ comic.title }}</div>
        <div>
          <small
            v-for="(author, idx) in comic.authors"
            :key="idx"
            class="inline text-xs text-gray-400"
          >
            {{
              comic.authors.length > 1 && idx !== comic.authors.length - 1
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
    <td class="px-6 py-4">16 Jan 2023</td>
    <td class="px-6 py-4">
      <div class="flex gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-600"
        >
          {{ chaptersRead }} / {{ comic.chapters }}
        </span>
      </div>
    </td>
    <td class="px-6 py-4">
      <span class="flex items-center gap-1"
        >{{ yourRating }}
        <svg
          aria-hidden="true"
          fill="var(--color-rose-300)"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          class="h-4 w-4 text-rose-300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </span>
    </td>
    <td class="px-6 py-4">
      <RowActions />
    </td>
  </tr>
</template>

<style lang="scss" scoped></style>
