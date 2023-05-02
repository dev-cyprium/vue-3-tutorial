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
          <StarIcon />
          <small class="text-rose-300 xs:text-base sm:text-xs">{{
            comic.score
          }}</small>
        </div>

        <div class="flex gap-1">
          <ChaptersIcon />
          <small class="text-rose-300 xs:text-base sm:text-xs"
            >Ch {{ comic.chapters }}
          </small>
        </div>

        <div class="flex gap-1">
          <BookIcon classes="text-rose-300 xs:h-6 xs:w-6 sm:h-4 sm:w-4" />
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
      <AppButton
        text="Add to reading list"
        classes="my-3 py-3"
        @onClick="onAddToReadingList"
      >
        <template #icon>
          <BookIcon classes="text-white mr-2 h-5 w-5" />
        </template>
      </AppButton>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useReadingListStore } from '@/stores/readingList';
import StarIcon from '@/components/shared/icons/StarIcon.vue';
import ChaptersIcon from '@/components/shared/icons/ChaptersIcon.vue';
import BookIcon from '@/components/shared/icons/BookIcon.vue';
import AppButton from '@/components/shared/AppButton.vue';

export default {
  setup(props) {
    const readingListStore = useReadingListStore();

    const comicDescription = computed(() => {
      return `${props.comic.description.substring(0, 400)} ...`;
    });

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
      default: () => ({}),
    },
  },
  components: {
    StarIcon,
    BookIcon,
    ChaptersIcon,
    AppButton,
  },
};
</script>
