import { defineStore } from 'pinia';
import axios from 'axios';
import { findById } from '../composables/helpers';
// import { ref } from 'vue';

export const useReadingListStore = defineStore('readingListStore', {
  state: () => ({
    currentlyReading: [],
    isLoading: true,
  }),

  actions: {
    async fetchState() {
      this.currentlyReading = (
        await axios.get('http://localhost:9000/currently-reading/')
      ).data;
      this.isLoading = false;
    },

    add(comic) {
      if (!findById(this.currentlyReading, comic.id)) {
        console.log('first time adding: ', comic.id);
        this.currentlyReading.push(comic);
        axios.post('http://localhost:9000/currently-reading/', comic);
      }
    },

    remove(comic) {
      if (findById(this.currentlyReading, comic.id)) {
        this.currentlyReading = this.currentlyReading.filter(
          (c) => c.id !== comic.id
        );
        axios.delete('http://localhost:9000/currently-reading/', comic);
      }
    },
  },
});

// export const useReadingListStore = defineStore('readingListStore', () => {
//   let currentlyReading = ref([]);
//   let isLoading = ref(true);

//   const fetchState = async () => {
//     currentlyReading.value = (
//       await axios.get('http://localhost:9000/currently-reading/')
//     ).data;
//     isLoading.value = false;
//   };

//   const add = (comic) => {
//     if (!findById(currentlyReading.value, comic.id)) {
//       console.log('first time adding: ', comic.id);
//       currentlyReading.value.push(comic);
//       axios.post('http://localhost:9000/currently-reading/', comic);
//     }
//   };

//   const remove = (comic) => {
//     if (findById(currentlyReading.value, comic.id)) {
//       currentlyReading.value = currentlyReading.value.filter(
//         (c) => c.id !== comic.id
//       );
//       axios.delete('http://localhost:9000/currently-reading/', comic);
//     }
//   };

//   return {
//     isLoading,
//     currentlyReading,
//     fetchState,
//     add,
//     remove,
//   };
// });
