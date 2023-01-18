import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useReadingListStore = defineStore('readingListStore', () => {
  const currentlyReading = ref([]);
  const savedCurrentlyReadingList = JSON.parse(
    window.localStorage.getItem('currentlyReadingList')
  );

  if (savedCurrentlyReadingList) {
    currentlyReading.value = savedCurrentlyReadingList;
  }

  const add = (comic) => {
    if (
      !savedCurrentlyReadingList.find(
        (savedComic) => savedComic.id === comic.id
      )
    ) {
      currentlyReading.value.push(comic);

      window.localStorage.setItem(
        'currentlyReadingList',
        JSON.stringify(currentlyReading.value)
      );
    }
  };

  const remove = (comic) => {
    console.log('🚀  ~ remove ~ comic', comic);
    // add removing logic
  };

  return {
    currentlyReading,
    add,
    remove,
  };
});
