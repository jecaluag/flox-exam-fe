<template>
  <div
    v-for="task in getTaskLists"
    :key="task.id"
    class="group border-b border-slate-100 mt-2 pb-3"
  >
    <div class="flex items-center gap-3 h-8">
      <Checkbox
        :is-checked="task.completed"
        @change="handleToggleCompleted(task.id)"
      />
      <div class="flex-1">
        <p :class="{ 'line-through text-gray-400': task.completed }">
          {{ task.title }}
        </p>
      </div>

      <div class="hidden group-hover:block">
        <button
          class="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1"
          @click="handleDeleteTask(task.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="ml-8">
      <p
        :class="[
          ' text-sm font-light',
          task.completed ? 'text-gray-400' : 'text-gray-500',
        ]"
      >
        {{ task.description }}
      </p>
    </div>
  </div>
  <div v-if="taskLists.length === 0" class="w-full flex justify-center py-3">
    <p class="text-gray-400 text-sm">No tasks yet</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import type { Task } from "../types";
import { Checkbox } from "../../../components/common/index";

const props = defineProps({
  taskLists: {
    type: Array as PropType<Task[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "toggleCompleted", id: number): void;
  (e: "deleteTask", id: number): void;
}>();

const getTaskLists = computed(() => {
  return props.taskLists.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
});

const handleToggleCompleted = (id: number) => {
  emit("toggleCompleted", id);
};

const handleDeleteTask = (id: number) => {
  emit("deleteTask", id);
};
</script>
