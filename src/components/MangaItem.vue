<template>
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
      <div class="flex justify-between pb-2">
        <div class="flex gap-1">
          <svg
            class="text-rose-300 xs:h-6 xs:w-6 sm:h-4 sm:w-4"
            fill="var(--color-rose-300)"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            ></path>
          </svg>
          <small class="text-rose-300 xs:text-base sm:text-xs">{{
            comic.score
          }}</small>
        </div>

        <div class="flex gap-1">
          <svg
            class="text-rose-300 xs:h-6 xs:w-6 sm:h-4 sm:w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            ></path>
          </svg>
          <small class="text-rose-300 xs:text-base sm:text-xs"
            >Ch {{ comic.chapters }}
          </small>
        </div>

        <div class="flex gap-1">
          <svg
            class="text-rose-300 xs:h-6 xs:w-6 sm:h-4 sm:w-4"
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
          <small class="text-rose-300 xs:text-base sm:text-xs"
            >Vol {{ comic.volumes }}</small
          >
        </div>
      </div>
      <p
        class="text-justify text-sm font-light leading-6 tracking-tight text-slate-400"
      >
        {{ comicDescription }}
      </p>
      <button type="button" class="btn-primary" @click="onAddToReadingList">
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
        Add to reading list
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useReadingListStore } from '@/stores/readingList';

export default {
  setup(props) {
    const comicDescription = computed(() => {
      return `${props.comic.description.substring(0, 400)} ...`;
    });
    const readingListStore = useReadingListStore();
    const onAddToReadingList = () => {
      readingListStore.add(props.comic);
    };

    return {
      comicDescription,
      onAddToReadingList,
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
