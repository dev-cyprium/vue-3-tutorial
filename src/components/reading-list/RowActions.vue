<template>
  <div class="flex items-center gap-4">
    <a href="#" @click.prevent="showEditModal = true" title="Edit manga">
      <EditIcon classes="text-gray-500" />
    </a>
    <a
      href="#"
      title="Remove from list"
      @click.prevent="showRemoveModal = true"
    >
      <RemoveBinIcon />
    </a>
    <!-- Edit modal -->
    <Modal
      v-if="showEditModal"
      :title="`Edit ${props.comic.title}`"
      @close="showEditModal = false"
    >
      <template #content>
        <EditManga :comic="props.comic" />
      </template>
      <template #footer>
        <AppButton
          classes="w-full mt-6 mr-0"
          text="Update progress"
          @onClick="onSubmit"
        >
          <template #icon>
            <EditIcon classes="text-white mr-2 h-auto w-4" />
          </template>
        </AppButton>
      </template>
    </Modal>

    <!-- Remove modal -->
    <Modal
      v-if="showRemoveModal"
      :title="`Remove ${comic.title}`"
      @close="showRemoveModal = false"
    >
      <template #content>
        <p class="whitespace-normal text-base">
          Are you sure you want to remove {{ props.comic.title }} from your
          list?
        </p>
      </template>
      <template #footer>
        <AppButton
          classes="w-1/2 mt-6 mr-0 bg-white text-rose-300"
          text="Cancel"
          :is-primary="false"
          @onClick="showRemoveModal = false"
        >
          <template #icon>
            <CloseIcon classes="text-rose-300 mr-2 h-auto w-4" />
          </template>
        </AppButton>
        <AppButton
          classes="w-1/2 mt-6 mr-0"
          text="Remove from list"
          @onClick="$emit('comicRemoved', props.comic.id)"
        >
          <template #icon>
            <RemoveBinIcon classes="text-white mr-2 h-auto w-4" />
          </template>
        </AppButton>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
import AppButton from '@/components/shared/AppButton.vue';
import EditIcon from '@/components/shared/icons/EditIcon.vue';
import RemoveBinIcon from '@/components/shared/icons/RemoveBinIcon.vue';
import CloseIcon from '@/components/shared/icons/CloseIcon.vue';

const Modal = defineAsyncComponent(() =>
  import('@/components/shared/Modal.vue')
);
const EditManga = defineAsyncComponent(() =>
  import('@/components/reading-list/EditManga.vue')
);

const props = defineProps({
  comic: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const showEditModal = ref(false);
const showRemoveModal = ref(false);

const onSubmit = () => {
  console.log('on submit...');
  showEditModal.value = false;
};
</script>

<style lang="scss" scoped></style>
