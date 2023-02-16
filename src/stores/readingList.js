import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { findInSet } from '../composables/helpers';

export const useReadingListStore = defineStore('readingListStore', () => {
  let currentlyReading = ref(new Set());
  let isLoading = ref(true);

  const fetchState = async () => {
    currentlyReading.value = new Set(
      (await axios.get('http://localhost:9000/currently-reading/')).data
    );
    isLoading.value = false;
  };

  const add = (comic) => {
    if (!findInSet(currentlyReading.value, (c) => c.id === comic.id)) {
      console.log('first time adding: ', comic.id);
      axios.post('http://localhost:9000/currently-reading/', comic);
    }
    currentlyReading.value.add(comic);
  };

  const remove = (comic) => {
    if (findInSet(currentlyReading.value, (c) => c.id === comic.id)) {
      currentlyReading.value.remove(comic);
      axios.delete('http://localhost:9000/currently-reading/', comic);
    }
  };

  fetchState();

  return {
    isLoading,
    currentlyReading,
    add,
    remove,
  };
});
