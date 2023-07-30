import { defineStore } from 'pinia';
import axios from 'axios';
import {
  findById,
  getRatingOptions,
  readingStateLabels,
} from '@/utils/helpers';
import dayjs from 'dayjs';
// import { computed, ref } from 'vue';

export const useReadingListStore = defineStore('readingListStore', {
  state: () => ({
    currentlyReading: [],
    isLoading: true,
  }),
  getters: {
    readingStates() {
      return Object.entries(readingStateLabels).reduce((acc, [key, label]) => {
        acc.push({
          value: key,
          name: label,
        });
        return acc;
      }, []);
    },
    ratings() {
      return getRatingOptions();
    },
  },
  actions: {
    async fetchState() {
      this.currentlyReading = (
        await axios.get('http://localhost:9000/currently-reading/')
      ).data;
      this.isLoading = false;
    },

    async add(comic) {
      if (!findById(this.currentlyReading, comic.id)) {
        console.log('first time adding: ', comic.id);
        const payload = {
          ...comic,
          listData: {
            readingState: this.readingStates[0].value,
            startedReading: dayjs().format('YYYY-MM-DD'),
            chaptersRead: 1,
            volumesRead: 0,
            rating: {
              value: null,
              rate: null,
            },
          },
        };
        console.log('🚀 ~ comic added: ', payload);
        this.currentlyReading.push(payload);
        await axios.post('http://localhost:9000/currently-reading/', payload);
      }
    },

    async remove(comicId) {
      if (findById(this.currentlyReading, comicId)) {
        this.currentlyReading = this.currentlyReading.filter(
          (c) => c.id !== comicId
        );
        await axios.delete(
          `http://localhost:9000/currently-reading/${comicId}`
        );
      }
    },

    async update(comicId, dataToUpdate) {
      const comic = findById(this.currentlyReading, comicId);
      if (comic) {
        const payload = {
          ...comic,
          listData: {
            ...dataToUpdate,
          },
        };
        const comicIndex = this.currentlyReading.findIndex(
          (comic) => comic.id === comicId
        );
        this.currentlyReading.splice(comicIndex, 1, payload);

        await axios.put(
          `http://localhost:9000/currently-reading/${comicId}`,
          payload
        );
        // TODO: notifikacija
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
//           rating: {
//             value: null,
//             rate: null,
//           },
//         },
//       };
//       console.log('🚀 ~ comic added: ', data);
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
