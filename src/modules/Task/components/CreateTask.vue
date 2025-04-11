<template>
  <div
    v-if="!isCreateTaskSectionShown"
    class="flex items-center gap-3 mt-2 group cursor-pointer"
    @click="isCreateTaskSectionShown = true"
  >
    <div class="relative flex items-center">
      <div
        class="w-5 h-5 rounded-full text-green-700 group-hover:bg-green-700 group-hover:text-white hover:text-white flex items-center justify-center transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>

      <p
        class="ml-3 mt-0.5 font-light text-gray-400 group-hover:text-green-700 select-none"
      >
        Add new task
      </p>
    </div>
  </div>

  <div v-else class="border border-slate-300 rounded-lg mt-1 py-4 px-2">
    <input
      type="text"
      class="w-full outline-none font-medium"
      placeholder="Enter task title"
      v-model="newTaskTitle"
    />
    <textarea
      class="w-full mt-1.5 outline-none font-light text-sm resize-none"
      placeholder="Enter task description"
      v-model="newTaskDescription"
    />

    <div class="flex gap-2 mt-2 justify-end">
      <button
        type="button"
        class="text-gray-500 hover:text-gray-700 bg-gray-100 rounded py-1 px-3"
        @click="resetValues"
      >
        Cancel
      </button>
      <button
        type="button"
        class="bg-green-500 hover:bg-green-600 text-white rounded py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="handleCreateTask"
        :disabled="!newTaskTitle.trim()"
      >
        Add task
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { CreateTaskDTO } from "../types";

const isCreateTaskSectionShown = ref(false);
const newTaskTitle = ref("");
const newTaskDescription = ref("");

const emit = defineEmits<{
  (e: "createTask", task: CreateTaskDTO): void;
}>();

const handleCreateTask = () => {
  const title = newTaskTitle.value.trim();
  if (!title) return;

  emit("createTask", {
    title,
    description: newTaskDescription.value.trim(),
  });
};

const resetValues = () => {
  isCreateTaskSectionShown.value = false;
  newTaskTitle.value = "";
  newTaskDescription.value = "";
};

defineExpose({
  resetValues,
});
</script>
