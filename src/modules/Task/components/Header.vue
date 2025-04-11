<template>
  <div>
    <h1 class="text-2xl font-semibold">Task List</h1>
    <p class="text-gray-600 mt-1">{{ getSubtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const getSubtitle = computed(() => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `Today, ${formatter.format(date).replace(/,/g, "")}`;
});
</script>

<style scoped></style>
