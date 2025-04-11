<template>
  <div class="relative flex items-center">
    <input
      type="checkbox"
      :checked="isChecked"
      @change="handleChange"
      class="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:bg-green-600 checked:border-green-600 focus:ring-green-500 hover:ring-green-500 focus:ring-2 hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 cursor-pointer transition-all"
    />
    <svg
      v-show="isChecked"
      class="absolute w-4 h-4 left-0.5 top-0.5 pointer-events-none"
      viewBox="0 0 16 16"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isChecked: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["change"]);

const handleChange = () => {
  emit("change", !props.isChecked);
};
</script>

<style scoped></style>
