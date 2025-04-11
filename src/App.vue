<template>
  <Toaster position="bottom-center" />
  <main class="w-full h-screen flex justify-center bg-white">
    <Tasks />
  </main>
</template>

<script setup lang="ts">
import { Toaster } from "vue-sonner";
import Tasks from "./modules/Task/index.vue";
</script>
