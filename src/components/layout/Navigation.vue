<template>
  <nav class="border-gray-200 bg-teal-500 px-2 py-2.5 sm:px-5">
    <div class="w-100 flex flex-wrap items-center justify-between">
      <router-link
        to="/"
        class="block rounded py-2 pr-4 pl-3 text-teal-800 md:bg-transparent md:p-0"
        aria-current="page"
      >
        <span
          class="whitespace-nowrap font-logo text-3xl text-white hover:text-rose-200"
          >MangaList</span
        >
      </router-link>
      <button
        type="button"
        aria-controls="mobile-menu"
        aria-expanded="false"
        @click="toggleMenu"
        class="ml-3 inline-flex items-center rounded-lg p-2 text-sm focus:outline-none focus:ring-2 md:hidden"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          aria-hidden="true"
          fill="none"
          stroke="white"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
        <ul
          class="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
        >
          <li>
            <router-link
              to="/"
              class="block rounded py-2 pr-4 pl-3 text-teal-800 hover:underline md:bg-transparent md:p-0"
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="/reading-list"
              class="block rounded py-2 pr-4 pl-3 text-teal-800 hover:underline md:bg-transparent md:p-0"
              aria-current="page"
              >Reading list</router-link
            >
          </li>
        </ul>
      </div>
      <Transition>
        <div v-show="mobileMenuOpen" class="w-full md:hidden" id="mobile-menu">
          <ul
            class="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
          >
            <li>
              <router-link
                to="/"
                class="block rounded py-2 pr-4 pl-3 text-teal-800 hover:underline md:bg-transparent md:p-0"
                aria-current="page"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                to="/reading-list"
                class="block rounded py-2 pr-4 pl-3 text-teal-800 hover:underline md:bg-transparent md:p-0"
                aria-current="page"
                >Reading list</router-link
              >
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const mobileMenuOpen = ref(false);

    const toggleMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    return {
      mobileMenuOpen,
      toggleMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
