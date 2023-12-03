import { TodoistTaskProvider } from "./todoist.ts";
import { TaskProvider } from "./types.ts";
import type { ENV } from "../config.ts";

class TaskProviderFactory {
  public static create(env: ENV): TaskProvider {
    switch (env.TARGET_PROVIDER) {
      case "todoist": {
        return new TodoistTaskProvider(
          env.TODOIST_TOKEN,
          env.TODOIST_PROJECT_ID
        );
      }
      default:
        throw new Error("Invalid type");
    }
  }
}

export { TaskProviderFactory };
