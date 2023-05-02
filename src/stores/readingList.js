import { defineStore } from 'pinia';
import axios from 'axios';
import { findById } from '../composables/helpers';
import dayjs from 'dayjs';
// import { computed, ref } from 'vue';

export const useReadingListStore = defineStore('readingListStore', {
  state: () => ({
    currentlyReading: [],
    isLoading: true,
  }),
  getters: {
    readingStates() {
      return [
        {
          value: 'currently',
          name: 'Currently reading',
        },
        {
          value: 'completed',
          name: 'Completed',
        },
        {
          value: 'todo',
          name: 'Plan to read',
        },
        {
          value: 'onhold',
          name: 'On hold',
        },
        {
          value: 'dropped',
          name: 'Dropped',
        },
      ];
    },
  },
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
        const data = {
          ...comic,
          listData: {
            readingState: this.readingStates[0].value,
            startedReading: dayjs().format('YYYY-MM-DD'),
            chaptersRead: 1,
            volumesRead: 0,
            rating: null,
          },
        };
        console.log('🚀 ~ file: readingList.js:47 ~ add ~ data', data);
        this.currentlyReading.push(data);
        axios.post('http://localhost:9000/currently-reading/', data);
      }
    },

    remove(comicId) {
      if (findById(this.currentlyReading, comicId)) {
        this.currentlyReading = this.currentlyReading.filter(
          (c) => c.id !== comicId
        );
        axios.delete(`http://localhost:9000/currently-reading/${comicId}`);
      }
    },
  },
});

// export const useReadingListStore = defineStore('readingListStore', () => {
//   let currentlyReading = ref([]);
//   let isLoading = ref(true);
//   const readingStates = computed([
//     {
//       value: 'currently',
//       name: 'Currently reading',
//     },
//     {
//       value: 'completed',
//       name: 'Completed',
//     },
//     {
//       value: 'todo',
//       name: 'Plan to read',
//     },
//     {
//       value: 'onhold',
//       name: 'On hold',
//     },
//     {
//       value: 'dropped',
//       name: 'Dropped',
//     },
//   ]);

//   const fetchState = async () => {
//     currentlyReading.value = (
//       await axios.get('http://localhost:9000/currently-reading/')
//     ).data;
//     isLoading.value = false;
//   };

//   const add = (comic) => {
//     if (!findById(currentlyReading.value, comic.id)) {
//       console.log('first time adding: ', comic.id);
//       const data = {
//         ...comic,
//         listData: {
//           readingState: readingStates.value[0].value,
//           startedReading: dayjs().format('YYYY-MM-DD'),
//           chaptersRead: 1,
//           rating: null,
//         },
//       };
//       console.log('🚀 ~ file: readingList.js:47 ~ add ~ data', data);
//       currentlyReading.value.push(data);
//       axios.post('http://localhost:9000/currently-reading/', data);
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
//     readingStates,
//     fetchState,
//     add,
//     remove,
//   };
// });
