<script setup>
import Multiselect from '@vueform/multiselect';
</script>

<template>
  <nav class="border-gray-200 bg-teal-500 px-2 py-2.5 sm:px-4">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <a href="/" class="flex items-center">
        <span
          class="self-center whitespace-nowrap text-xl font-semibold text-white"
          >MangaList</span
        >
      </a>
      <button
        data-collapse-toggle="mobile-menu"
        type="button"
        class="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-teal-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
        <ul
          class="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
        >
          <li>
            <a
              href="#"
              class="block rounded py-2 pr-4 pl-3 text-teal-800 hover:underline md:bg-transparent md:p-0"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block rounded py-2 pr-4 pl-3 text-teal-800 hover:underline md:bg-transparent md:p-0"
              aria-current="page"
              >Contact</a
            >
          </li>
          <svg
            class="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </ul>
      </div>
    </div>
  </nav>

  <main
    class="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-rose-200 to-teal-200 py-10 xs:px-4 xl:px-28"
  >
    <div
      class="my-5 flex w-full flex-col justify-center rounded-2xl bg-white py-3 shadow-xl shadow-slate-300/60 xs:max-w-xs sm-md--middle:max-w-2xl lg-xl--middle:max-w-5xl 3xl:max-w-[87rem] 4xl:max-w-[100rem]"
    >
      <div
        class="flex flex-wrap items-center justify-center gap-10 px-6 xs:flex-col sm-md--middle:flex-row"
      >
        <Multiselect
          v-model="value"
          mode="tags"
          placeholder="Select filters"
          track-by="name"
          label="name"
          :close-on-select="false"
          :always-open="true"
          :search="true"
          :options="options"
        >
          <template v-slot:tag="{ option, handleTagRemove, disabled }">
            <div
              class="multiselect-tag is-user"
              :class="{
                'is-disabled': disabled,
              }"
            >
              {{ processEmojiCode(option.emoji) }} &#x231B;
              {{ option.name }}
              <span
                v-if="!disabled"
                class="multiselect-tag-remove"
                @mousedown.prevent="handleTagRemove(option, $event)"
              >
                <span class="multiselect-tag-remove-icon"></span>
              </span>
            </div>
          </template>
        </Multiselect>
      </div>
    </div>
    <div class="flex flex-wrap justify-center gap-10">
      <div
        v-for="n in 8"
        :key="n"
        class="flex w-auto max-w-xs flex-col justify-center rounded-2xl bg-white shadow-xl shadow-slate-300/60"
      >
        <img
          class="aspect-square rounded-t-2xl object-cover object-center"
          src="@/assets/comics/20centuryboys.jpg"
        />
        <div class="p-4">
          <small class="text-xs text-blue-400">Automobile company</small>
          <h1 class="pb-2 text-2xl font-medium text-slate-600">Dodge Car</h1>
          <p class="text-sm font-light leading-6 tracking-tight text-slate-400">
            Dodge is an American brand of automobiles and a division of
            Stellantis, based in Auburn Hills, Michigan.. Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Blanditiis magnam, nobis
            accusantium rerum at assumenda, autem provident, inventore corporis
            facilis quaerat cum maxime labore. Adipisci laborum corrupti
            molestiae commodi ab.
          </p>
          <button
            type="button"
            class="my-3 mr-2 inline-flex items-center rounded-lg bg-rose-300 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gradient-to-l hover:from-teal-200 hover:to-rose-300 focus:outline-none focus:ring-4 focus:ring-rose-300"
          >
            <svg
              class="mr-2 -ml-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              ></path>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </main>

  <footer
    class="bg-teal-500 p-4 shadow md:flex md:items-center md:justify-between md:p-6"
  >
    <span class="text-sm text-teal-800 sm:text-center">
      Olja Ivković &copy; 2022
      <span>All Rights Reserved</span>
    </span>
    <ul class="mt-3 flex flex-wrap items-center text-sm text-teal-800 sm:mt-0">
      <li>
        <a href="#" class="mr-4 hover:underline md:mr-6">Home</a>
      </li>
      <li>
        <a href="#" class="hover:underline">Contact</a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      count: 0,
      value: ['judy'],
      options: [
        {
          value: 'psychological',
          name: 'Psychological',
          emoji: '&#x231B;',
        },
        {
          value: 'jane',
          name: 'Jane',
          image: 'https://randomuser.me/api/portraits/med/women/2.jpg',
        },
        {
          value: 'john',
          name: 'John',
          image: 'https://randomuser.me/api/portraits/med/men/1.jpg',
        },
        {
          value: 'joe',
          name: 'Joe',
          image: 'https://randomuser.me/api/portraits/med/men/2.jpg',
        },
      ],
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    processEmojiCode(code) {
      return code;
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/style.scss';
@import '@vueform/multiselect/themes/default.css';
</style>
