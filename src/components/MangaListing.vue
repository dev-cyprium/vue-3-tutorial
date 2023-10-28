<template>
  <FilterOptions
    :genres="genres"
    @on-selected-genres="updateSelectedGenres"
    @on-selected-mode="updateFilteringMode"
  />
  <SortingOptions
    @on-selected-sorting-option="selectedSortingOption = $event"
    @on-selected-mode="(e) => (sortingMode = e)"
  />

  <div class="flex flex-wrap justify-center w-full gap-10">
    <MangaItem v-for="comic in filteredComics" :comic="comic" :key="comic.id" />
    <h2
      v-if="filteredComics.length === 0"
      class="pt-3 text-sm text-teal-800 sm:text-center"
    >
      No results...
    </h2>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import axios from 'axios';
import { useReadingListStore } from '@/stores/readingList';
import MangaItem from '@/components/MangaItem.vue';
import FilterOptions from '@/components/FilterOptions.vue';
import SortingOptions from '@/components/SortingOptions.vue';

const comics = ref([]);
const genres = ref([]);
let filteringMode = ref('any');
let selectedGenres = ref([]);
const selectedSortingOption = ref('score');
const sortingMode = ref('asc');

const readingListStore = useReadingListStore();

const { data: comicData } = await axios.get(
  'https://comics.kaznaservis.rs/comics',
);
const { data: genreData } = await axios.get(
  'https://comics.kaznaservis.rs/genres',
);

comics.value = comicData;
genres.value = genreData;

if (!readingListStore.currentlyReading.length) {
  await readingListStore.fetchState();
}

const sortedComics = computed(() => {
  const allComics = comics.value.map((c) => c);

  return allComics.sort((a, b) => {
    if (sortingMode.value === 'asc') {
      return a[selectedSortingOption.value] > b[selectedSortingOption.value]
        ? 1
        : -1;
    }

    // descending
    return a[selectedSortingOption.value] < b[selectedSortingOption.value]
      ? 1
      : -1;
  });
});

const filteredComics = computed(() => {
  if (selectedGenres.value?.length === 0) return sortedComics.value;

  if (filteringMode.value === 'all') {
    // All of the following genres
    return sortedComics.value?.filter((comic) =>
      selectedGenres.value?.every((filter) => comic.genres.includes(filter)),
    );
  }

  // Any of the following genres
  return sortedComics.value?.filter((comic) =>
    comic.genres.some((genre) => selectedGenres.value?.includes(genre)),
  );
});

const updateSelectedGenres = (filters) => {
  selectedGenres.value = filters;
};

const updateFilteringMode = (mode) => {
  filteringMode.value = mode;
};
</script>

<!--  <script>
import { computed, ref } from 'vue';
import axios from 'axios';
import MangaItem from '@/components/MangaItem.vue';
import FilterOptions from '@/components/FilterOptions.vue';
import SortingOptions from '@/components/SortingOptions.vue';

export default {
  async setup() {
    const comics = ref([]);
    const genres = ref([]);
    const selectedGenres = ref([]);
    const filteringMode = ref('any');
    const selectedSortingOption = ref('score');
    const sortingMode = ref('asc');

    const { data: comicData } = await axios.get('https:/comics.kaznaservis.rs//comics');
    const { data: genreData } = await axios.get('https:/comics.kaznaservis.rs//genres');

    comics.value = comicData;
    genres.value = genreData;

    const sortedComics = computed(() => {
      const allComics = comics.value.map((c) => c);

      return allComics.sort((a, b) => {
        if (sortingMode.value === 'asc') {
          return a[selectedSortingOption.value] > b[selectedSortingOption.value]
            ? 1
            : -1;
        }

        // descending
        return a[selectedSortingOption.value] < b[selectedSortingOption.value]
          ? 1
          : -1;
      });
    });

    const filteredComics = computed(() => {
      if (selectedGenres.value?.length === 0) return sortedComics.value;

      if (filteringMode.value === 'all') {
        // All of the following genres
        return sortedComics.value?.filter((comic) =>
          selectedGenres.value?.every((filter) =>
            comic.genres.includes(filter),
          ),
        );
      }

      // Any of the following genres
      return sortedComics.value?.filter((comic) =>
        comic.genres.some((genre) => selectedGenres.value?.includes(genre)),
      );
    });

    return {
      genres: computed(() => genres),
      selectedGenres,
      filteringMode,
      filteredComics,
      selectedSortingOption,
      sortingMode,
      sortedComics,
      comics,
    };
  },
  components: {
    FilterOptions,
    MangaItem,
    SortingOptions,
  },
  methods: {
    updateSelectedGenres(filters) {
      this.selectedGenres = filters;
    },
    updateFilteringMode(mode) {
      this.filteringMode = mode;
    },
  },
  // How it would be done in Vue 2 with Options API:
  // computed: {
  //   sortedComics() {
  //     const allComics = this.comics.map((c) => c);

  //     return allComics.sort((a, b) => {
  //       if (this.sortingMode === 'asc') {
  //         return a[this.selectedSortingOption] > b[this.selectedSortingOption]
  //           ? 1
  //           : -1;
  //       }

  //       // descending
  //       return a[this.selectedSortingOption] < b[this.selectedSortingOption]
  //         ? 1
  //         : -1;
  //     });
  //   },

  //   filteredComics() {
  //     if (this.selectedGenres?.length === 0) return this.sortedComics;

  //     if (this.filteringMode === 'all') {
  //       // All of the following genres
  //       return this.sortedComics.filter((comic) =>
  //         this.selectedGenres.every((filter) => comic.genres.includes(filter))
  //       );
  //     }

  //     // Any of the following genres
  //     return this.sortedComics.filter((comic) =>
  //       comic.genres.some((genre) => this.selectedGenres?.includes(genre))
  //     );
  //   },
  // },
};
</script> -->
