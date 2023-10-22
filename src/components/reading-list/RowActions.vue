<template>
  <div class="flex items-center gap-4">
    <a href="#" title="Edit manga" @click.prevent="showEditModal = true">
      <EditIcon classes="text-gray-500" />
    </a>
    <a
      href="#"
      title="Remove from list"
      @click.prevent="showRemoveModal = true"
    >
      <RemoveBinIcon classes="text-gray-500" />
    </a>
    <!-- Edit modal -->
    <Modal
      v-if="showEditModal"
      :title="`Edit ${props.comic.title}`"
      :primary-button="{
        buttonText: 'Update progress',
      }"
      @on-primary-action="onSubmit"
      @close="onEditModalClose"
    >
      <template #content>
        <div class="flex min-h-[392px] flex-col justify-center">
          <EditManga
            :comic="props.comic"
            @on-comic-update="(ev) => (readingData = ev)"
          />
        </div>
      </template>
      <template #primary-button-icon>
        <EditIcon classes="text-white mr-2 h-auto w-4" />
      </template>
    </Modal>

    <!-- Remove modal -->
    <Modal
      v-if="showRemoveModal"
      :title="`Remove ${props.comic.title}`"
      :primary-button="{
        buttonText: 'Remove from list',
      }"
      :secondary-button="{
        buttonText: 'Cancel',
      }"
      @on-primary-action="$emit('comic-removed', props.comic.id)"
      @on-secondary-action="showRemoveModal = false"
      @close="showRemoveModal = false"
    >
      <template #content>
        <p class="whitespace-normal text-base">
          Are you sure you want to remove {{ props.comic.title }} from your
          list?
        </p>
      </template>
      <template #primary-button-icon>
        <RemoveBinIcon classes="text-white mr-2 h-auto w-4" />
      </template>
      <template #secondary-button-icon>
        <CloseIcon classes="text-rose-300 mr-2 h-auto w-4" />
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
import { useReadingListStore } from '@/stores/readingList';
import EditIcon from '@/components/shared/icons/EditIcon.vue';
import CloseIcon from '@/components/shared/icons/CloseIcon.vue';
import RemoveBinIcon from '@/components/shared/icons/RemoveBinIcon.vue';
import EditManga from '@/components/reading-list/EditManga.vue';

const Modal = defineAsyncComponent(() =>
  import('@/components/shared/Modal.vue'),
);

const readingListStore = useReadingListStore();
defineEmits(['comic-removed']);

const props = defineProps({
  comic: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const showEditModal = ref(false);
const showRemoveModal = ref(false);
const readingData = ref(null);

const onEditModalClose = () => {
  showEditModal.value = false;
  readingData.value = null;
};

const onSubmit = async () => {
  showEditModal.value = false;

  if (!readingData.value) return;
  await readingListStore.update(props.comic.id, readingData.value);
};
</script>

<style lang="scss" scoped></style>
