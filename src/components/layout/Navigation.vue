<template>
  <nav class="border-gray-200 bg-teal-500 px-2 py-2.5 sm:px-5">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
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
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
