<template>
  <footer
    class="flex flex-col items-center justify-center bg-teal-500 p-8 shadow"
  >
    <router-link to="/" aria-current="page">
      <span
        class="whitespace-nowrap font-logo text-3xl text-white hover:text-rose-200"
        >MangaList</span
      >
    </router-link>
    <span class="pt-3 text-sm text-teal-800 sm:text-center">
      Made with 💖 by Olja Ivković, for teaching purposes
      <p class="pt-1">&copy; {{ currentYear }} All Rights Reserved</p>
    </span>
  </footer>
</template>

<script>
import { computed } from 'vue';

export default {
  setup() {
    return {
      currentYear: computed(() => new Date().getFullYear()),
    };
  },
};
</script>

<style lang="scss" scoped></style>
