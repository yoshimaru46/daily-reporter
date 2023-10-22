export type TaskProvider = "todoist" | "another_provider";
import { Level } from "npm:pino@8";

export type Config = {
  debugLevel: Level;
  targetDate: Date;
  targetProvider: TaskProvider;
  todoist: {
    token: string;
    projectId: string;
  };
};

export const config: Config = {
  debugLevel: Deno.env.get("DEBUG_LEVEL") as Level,
  targetDate: new Date(Deno.env.get("TARGET_DATE") || new Date().toISOString()),
  targetProvider: Deno.env.get("TARGET_PROVIDER") as TaskProvider,
  todoist: {
    token: Deno.env.get("TODOIST_TOKEN") || "",
    projectId: Deno.env.get("TODOIST_PROJECT_ID") || "",
  },
};
