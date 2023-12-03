export type TaskProvider = "todoist" | "another_provider";
import { Level } from "npm:pino@8";

import * as dotenv from "https://deno.land/std@0.167.0/dotenv/mod.ts";

await dotenv.config({
  export: true,
  // .env.exampleと、.env+通常の環境変数を比較して不足がないかチェック
  safe: true,
  example: ".env.example",
  path: ".env",
});

const config = Deno.env.toObject();
export const ENV = {
  DATABASE_URL: config["DATABASE_URL"],
  DEBUG_LEVEL: config["DEBUG_LEVEL"] as Level,
  TARGET_PROVIDER: config["TARGET_PROVIDER"] as TaskProvider,
  TODOIST_TOKEN: config["TODOIST_TOKEN"] || "",
  TODOIST_PROJECT_ID: config["TODOIST_PROJECT_ID"] || "",
  SLACK_WEBHOOK_URL: config["SLACK_WEBHOOK_URL"] || "",
};

export type ENV = typeof ENV;
