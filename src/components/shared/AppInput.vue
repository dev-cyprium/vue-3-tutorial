<template>
  <div v-if="props.type === 'number'" class="relative">
    <button
      type="button"
      class="absolute top-3 left-3 h-6 w-6 text-rose-300 focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-rose-200"
      @click="substract"
    >
      <svg
        data-darkreader-inline-stroke=""
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
    <input
      :id="props.id"
      :type="props.type"
      v-model="inputNumber"
      :min="props.options.min"
      :max="props.options.max"
      :class="`w-full rounded-2xl border-0 bg-white pt-3 pb-3 pl-11 outline outline-2 outline-rose-200 focus:ring-0
        focus-visible:outline-dashed focus-visible:outline-rose-200
        ${classes}
        ${props.options.showMaxNumber ? 'pr-[6rem]' : 'pr-11'}`"
    />
    <span
      v-if="props.options.max && props.options.showMaxNumber"
      class="absolute right-12 top-3.5 font-bold text-rose-300"
    >
      / {{ props.options.max }}
    </span>
    <button
      type="button"
      class="absolute top-3 right-3 h-6 w-6 text-rose-300 focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-rose-200"
      @click="add"
    >
      <svg
        data-darkreader-inline-stroke=""
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
  </div>
  <div v-else>
    <input
      :id="props.id"
      v-model="inputText"
      :type="props.type"
      :class="`w-full rounded-2xl border-0 bg-white py-3 px-3
        outline outline-2 outline-rose-200 focus:ring-0 focus-visible:outline-dashed
        focus-visible:outline-rose-200 ${classes}`"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (value) => {
      // When we implement styling for other types like radio, checkbox etc, we would allow it here
      return [
        'text',
        'number',
        'password',
        'email',
        'search',
        'tel',
        'url',
      ].includes(value);
    },
  },
  id: {
    type: [String, Number],
    required: true,
  },
  classes: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    default: () => ({
      min: 0,
      max: 100,
      showMaxNumber: false,
    }),
  },
});

const inputNumber = ref(0);
const inputText = ref('');

const substract = () => {
  if (inputNumber.value > props.options.min) {
    inputNumber.value--;
  }
};

const add = () => {
  if (inputNumber.value < props.options.max) {
    inputNumber.value++;
  }
};
</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
