<template>
  <section class="p-8 mt-8 max-w-3xl w-full">
    <Header />

    <div class="mt-8">
      <Spinner v-if="isLoading" />

      <template v-else>
        <TaskList
          :task-lists="taskLists"
          @toggle-completed="handleToggleCompleted"
          @delete-task="handleDeleteTask"
        />

        <CreateTask ref="createTaskRef" @create-task="handleCreateTask" />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { AxiosError } from "axios";
import { toast } from "vue-sonner";

import { Spinner } from "../../components/common";
import Header from "./components/Header.vue";
import TaskList from "./components/TaskList.vue";
import CreateTask from "./components/CreateTask.vue";
import { TaskService } from "./services/task.service.ts";
import type { Task, CreateTaskDTO } from "./types";
import type { ErrorResponse } from "./types";

const taskLists = ref<Task[]>([]);
const createTaskRef = ref<InstanceType<typeof CreateTask>>();
const isLoading = ref<Boolean>(true);

onMounted(() => {
  handleFetchTasks();
});

const handleFetchTasks = async () => {
  try {
    isLoading.value = true;
    const response = await TaskService.getTasks();
    taskLists.value = response.data as Task[];
  } catch (error) {
    showErrorToast(error as AxiosError<ErrorResponse>);
  } finally {
    isLoading.value = false;
  }
};

const handleCreateTask = async (taskData: CreateTaskDTO) => {
  try {
    const response = await TaskService.createTask(taskData);
    taskLists.value = [response.data as Task, ...taskLists.value];
    createTaskRef.value?.resetValues();
    toast.success(response.message);
  } catch (error) {
    showErrorToast(error as AxiosError<ErrorResponse>);
  }
};

const handleToggleCompleted = async (id: number) => {
  const taskIndex = taskLists.value.findIndex((task) => task.id === id);
  if (taskIndex === -1) return;

  const originalTask = taskLists.value[taskIndex];

  try {
    await TaskService.toggleCompleted(id);
    taskLists.value[taskIndex] = {
      ...originalTask,
      completed: !originalTask.completed,
    };
  } catch (error) {
    taskLists.value[taskIndex] = originalTask;
    showErrorToast(error as AxiosError<ErrorResponse>);
  }
};

const handleDeleteTask = async (id: number) => {
  const taskIndex = taskLists.value.findIndex((task) => task.id === id);
  if (taskIndex === -1) return;

  const originalTask = taskLists.value[taskIndex];

  try {
    await TaskService.deleteTask(id);
    taskLists.value = taskLists.value.filter((task) => task.id !== id);
    toast.success("Task deleted successfully");
  } catch (error) {
    taskLists.value.splice(taskIndex, 0, originalTask);
    showErrorToast(error as AxiosError<ErrorResponse>);
  }
};

const showErrorToast = (error: AxiosError<ErrorResponse>) => {
  const message = error.response?.data?.message ?? "An error occurred";
  toast.error(message);
};
</script>

<style scoped></style>
