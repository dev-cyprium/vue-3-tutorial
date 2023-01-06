<template>
  <MainLayout>
    <MangaListing />
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout.vue';
import MangaListing from '@/components/MangaListing.vue';

export default {
  components: {
    MainLayout,
    MangaListing,
  },
};
</script>
