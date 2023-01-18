<script setup>
import MainLayout from '@/components/layout/MainLayout.vue';
import { useReadingListStore } from '@/stores/readingList';

const store = useReadingListStore();

const chaptersRead = 50;
const yourRating = 9;
</script>

<template>
  <MainLayout>
    <div
      class="m-5 w-full overflow-x-auto whitespace-nowrap rounded-lg border border-gray-200 shadow-md"
    >
      <table
        class="w-full border-collapse bg-white text-left text-sm text-gray-500"
      >
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              State
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Reading since
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Chapters read
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Your rating
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody v-if="store.currentlyReading.length === 0">
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-6" colspan="6">
              Your list is empty. Go to home page to add a comic.
            </td>
          </tr>
        </tbody>

        <tbody v-else class="divide-y divide-gray-100 border-t border-gray-100">
          <tr
            class="hover:bg-gray-50"
            v-for="comic in store.currentlyReading"
            :key="comic.id"
          >
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
                      comic.authors.length > 1 &&
                      idx !== comic.authors.length - 1
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
              <div class="flex justify-end gap-4">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                    x-tooltip="tooltip"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </a>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                    x-tooltip="tooltip"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </MainLayout>
</template>
