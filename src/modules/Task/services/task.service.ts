import type { AxiosResponse } from "axios";
import axiosInstance from "../../../lib/axios";
import type { CreateTaskDTO, Response } from "../types";
import { getApiUrl } from "../../../config/api.config";

const TASKS_ENDPOINT = "tasks";

export const TaskService = {
  getTasks: async (): Promise<Response> => {
    const response: AxiosResponse<Response> = await axiosInstance.get(
      getApiUrl(TASKS_ENDPOINT)
    );
    return response.data;
  },

  createTask: async (task: CreateTaskDTO): Promise<Response> => {
    const response: AxiosResponse<Response> = await axiosInstance.post(
      getApiUrl(TASKS_ENDPOINT),
      task
    );
    return response.data;
  },

  toggleCompleted: async (id: Number): Promise<Response> => {
    const response: AxiosResponse<Response> = await axiosInstance.patch(
      getApiUrl(`${TASKS_ENDPOINT}/${id}/toggle`)
    );
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await axiosInstance.delete(getApiUrl(`${TASKS_ENDPOINT}/${id}`));
  },
};
