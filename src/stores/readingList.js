import { defineStore } from 'pinia';

export const useReadingListStore = defineStore({
  id: 'readingList',
  state: () => ({
    readingList: new Set(),
  }),
  getters: {},
  actions: {
    add(comic) {
      this.readingList.add(comic);
    },
    remove(comic) {
      this.readingList.delete(comic);
    },
  },
});
