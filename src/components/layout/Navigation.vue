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
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
