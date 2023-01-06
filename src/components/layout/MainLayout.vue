<template>
  <Navigation />
  <main
    class="relative flex flex-col items-center justify-center bg-gradient-to-r from-rose-200 to-teal-200 px-4 py-10 xl:px-36"
  >
    <div class="flex min-h-screen-without-footer w-fit flex-col items-center">
      <Suspense>
        <template #default>
          <slot />
        </template>
        <template #fallback>
          <Loader />
        </template>
      </Suspense>
    </div>
  </main>
  <Footer />
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue';
import Footer from '@/components/layout/Footer.vue';
import Loader from '@/components/pure/Loader.vue';

export default {
  setup() {
    return {};
  },
  components: {
    Navigation,
    Footer,
    Loader,
  },
};
</script>

<style lang="scss" scoped></style>
