<script setup>
import MainLayout from '@/components/layout/MainLayout.vue';
import { useReadingListStore } from '@/stores/readingList';
import Loader from '@/components/shared/Loader.vue';
import Row from '@/components/reading-list/Row.vue';

const store = useReadingListStore();
store.fetchState();
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

        <tbody v-if="store.isLoading">
          <tr class="hover:bg-gray-50">
            <td class="loader-wrapper px-6 py-6" colspan="6">
              <Loader />
            </td>
          </tr>
        </tbody>

        <tbody v-if="store.currentlyReading.length === 0 && !store.isLoading">
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-6" colspan="6">
              Your list is empty. Go to home page to add a comic.
            </td>
          </tr>
        </tbody>

        <tbody v-else class="divide-y divide-gray-100 border-t border-gray-100">
          <Row :items="store.currentlyReading" />
        </tbody>
      </table>
    </div>
  </MainLayout>
</template>

<style scoped>
.loader-wrapper > div {
  display: flex;
  justify-content: center;
}
</style>
