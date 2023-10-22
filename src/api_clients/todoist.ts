import { Task } from "../task_providers/types.ts";

export class TodoistApiClient {
  #token: string;
  #projectId: string;
  constructor(token: string, projectId: string) {
    this.#token = token;
    this.#projectId = projectId;
  }
  public async getCompletedTasks(from: Date, to: Date): Promise<Task[]> {
    const url = new URL(`https://api.todoist.com/sync/v9/completed/get_all`);
    url.searchParams.set("project_id", this.#projectId);
    url.searchParams.set("since", from.toISOString());
    url.searchParams.set("until", to.toISOString());
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.#token}`,
      },
    });

    const json = (await res.json()) as unknown as {
      items: {
        content: string;
        completed_at: string;
      }[];
    };
    const tasks = json.items.map((item) => {
      return {
        title: item.content,
        completedAt: new Date(item.completed_at),
      };
    });
    return tasks.sort((a, b) => {
      return a.completedAt.getTime() - b.completedAt.getTime();
    });
  }

  public async getNextTasks(today: Date): Promise<Task[]> {
    const url = new URL(`https://api.todoist.com/rest/v2/tasks `);
    url.searchParams.set("project_id", this.#projectId);
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.#token}`,
      },
    });

    const tasks = (await res.json()) as unknown as {
      content: string;
      parent_id: string | null;
      created_at: string;
      due: {
        date: string;
      } | null;
    }[];
    const topLevelTasks = tasks.filter((task) => task.parent_id === null);
    const todayTasks = topLevelTasks.filter((task) => {
      return task.due !== null && new Date(task.due.date) <= today;
    });
    // deno-lint-ignore no-explicit-any
    return todayTasks.map((task: any) => {
      return {
        title: task.content,
        createdAt: new Date(task.created_at),
      };
    });
  }
}
