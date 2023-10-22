import { TodoistApiClient } from "../api_clients/todoist.ts";
import { Task, TaskProvider } from "./types.ts";

class TodoistTaskProvider implements TaskProvider {
  #apiClient: TodoistApiClient;
  constructor(token: string, projectId: string) {
    this.#apiClient = new TodoistApiClient(token, projectId);
  }
  public async getCompletedTasks(from: Date, to: Date): Promise<Task[]> {
    return await this.#apiClient.getCompletedTasks(from, to);
  }

  public async getNextTasks(today: Date): Promise<Task[]> {
    return await this.#apiClient.getNextTasks(today);
  }
}

export { TodoistTaskProvider };
