<template>
  <FilterOptions
    :options="filters"
    @onSelectedFilters="updateSelectedFilters"
  />
  <div class="flex w-full flex-wrap justify-center gap-10">
    <MangaItem v-for="comic in filteredComics" :comic="comic" :key="comic.id" />
    <h2
      v-if="filteredComics.length === 0"
      class="pt-3 text-sm text-teal-800 sm:text-center"
    >
      No results...
    </h2>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import axios from 'axios';
import MangaItem from '@/components/MangaItem.vue';
import FilterOptions from '@/components/FilterOptions.vue';

export default {
  async setup() {
    const { data: comics } = await axios.get('http://localhost:9000/comics');
    const { data: genres } = await axios.get('http://localhost:9000/genres');

    return {
      comics: ref(comics),
      filters: computed(() => genres),
      selectedFilters: ref([]),
    };
  },
  components: {
    FilterOptions,
    MangaItem,
  },
  computed: {
    filteredComics() {
      if (this.selectedFilters.length === 0) return this.comics;
      // Any of the following genres
      // return this.comics.filter((comic) =>
      //   comic.genres.some((genre) => this.selectedFilters.includes(genre))
      // );

      // All of the following genres
      return this.comics.filter((comic) => {
        return this.selectedFilters.every((filter) =>
          comic.genres.includes(filter)
        );
      });
    },
  },
  methods: {
    updateSelectedFilters(filters) {
      this.selectedFilters = filters;
    },
  },
};
</script>
