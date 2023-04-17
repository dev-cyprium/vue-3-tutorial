<script setup>
import { onMounted } from 'vue';
import { useReadingListStore } from '@/stores/readingList';
import MainLayout from '@/components/layout/MainLayout.vue';
import Loader from '@/components/shared/Loader.vue';
import Row from '@/components/reading-list/Row.vue';

const readingListStore = useReadingListStore();

onMounted(async () => {
  if (!readingListStore.currentlyReading.length) {
    await readingListStore.fetchState();
  }
});
</script>

<template>
  <MainLayout>
    <div class="m-5 w-full">
      <h1 class="mb-5 text-2xl font-medium text-slate-600">
        Currently reading
      </h1>
      <div
        class="overflow-x-auto whitespace-nowrap rounded-lg border border-gray-200 shadow-md"
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
                Remove
              </th>
            </tr>
          </thead>

          <tbody v-if="readingListStore.isLoading">
            <tr class="hover:bg-gray-50">
              <td class="loader-wrapper px-6 py-6" colspan="6">
                <Loader />
              </td>
            </tr>
          </tbody>

          <tbody
            v-if="
              readingListStore.currentlyReading.length === 0 &&
              !readingListStore.isLoading
            "
          >
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-6" colspan="6">
                Your list is empty. Go to home page to add a comic.
              </td>
            </tr>
          </tbody>

          <tbody
            v-else
            class="divide-y divide-gray-100 border-t border-gray-100"
          >
            <Row
              v-for="comic in readingListStore.currentlyReading"
              :key="comic.id"
              :item="comic"
              @remove-comic="readingListStore.remove($event)"
            />
          </tbody>
        </table>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.loader-wrapper > div {
  display: flex;
  justify-content: center;
}
</style>
