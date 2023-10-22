import { Config } from "../../config.ts";
import { TodoistTaskProvider } from "./todoist.ts";
import { TaskProvider } from "./types.ts";

class TaskProviderFactory {
  public static create(config: Config): TaskProvider {
    switch (config.targetProvider) {
      case "todoist": {
        const { token, projectId } = config.todoist;
        return new TodoistTaskProvider(token, projectId);
      }
      default:
        throw new Error("Invalid type");
    }
  }
}

export { TaskProviderFactory };
