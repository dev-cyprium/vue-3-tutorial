<script setup>
import Navigation from '@/components/layout/Navigation.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import Loader from '@/components/shared/Loader.vue';
</script>

<template>
  <Navigation />
  <main
    class="relative flex flex-col items-center justify-center bg-gradient-to-r from-rose-200 to-teal-200 px-4 py-10 xl:px-36"
  >
    <!-- w-fit -> if we want it to scale based on its children (content) -->
    <div class="flex min-h-screen-without-footer w-full flex-col items-center">
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
  <AppFooter />
</template>

<style lang="scss" scoped></style>
