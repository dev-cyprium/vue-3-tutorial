<template>
  <!-- md:max-w-sm 3xl:max-w-xs -->
  <div
    class="flex flex-1 basis-64 flex-col justify-between rounded-2xl bg-white shadow-xl shadow-slate-300/60 md:max-w-sm 3xl:max-w-xs"
  >
    <img
      class="aspect-square rounded-t-2xl object-cover object-center"
      :src="comic.image"
    />
    <div class="p-4">
      <span>
        <small
          v-for="(author, idx) in comic.authors"
          :key="idx"
          class="inline text-xs text-teal-400"
        >
          {{
            comic.authors.length > 1 && idx !== comic.authors.length - 1
              ? `${author.trim()}, `
              : `${author.trim()}`
          }}
        </small>
      </span>
      <h1 class="pb-2 text-2xl font-medium text-slate-600">
        {{ comic.title }}
      </h1>
      <p
        class="text-justify text-sm font-light leading-6 tracking-tight text-slate-400"
      >
        {{ comicDescription }}
      </p>
      <button type="button" class="btn-primary">
        <svg
          class="mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          ></path>
        </svg>
        Read more
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
export default {
  setup(props) {
    const comicDescription = computed(() => {
      return `${props.comic.description.substring(0, 400)} ...`;
    });

    return {
      comicDescription,
    };
  },
  props: {
    comic: {
      type: Object,
      required: true,
    },
  },
};
</script>
