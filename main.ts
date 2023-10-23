import "https://deno.land/std@0.191.0/dotenv/load.ts";

import { format, subBusinessDays } from "npm:date-fns@2";
import { TaskProviderFactory } from "./src/task_providers/index.ts";
import { config } from "./config.ts";
import { initLogger } from "./src/logger.ts";
import { formatDailyReport } from "./src/format_daily_report.ts";

if (import.meta.main) {
  const logger = initLogger(config.debugLevel);
  logger.debug({ config });

  const taskProvider = TaskProviderFactory.create(config);

  const today = new Date(); // 今日
  const previousDay = subBusinessDays(today, 1); // 前営業日
  const DATE_FORMAT = "yyyy-MM-dd";

  logger.debug({
    today: format(today, DATE_FORMAT),
    previousDay: format(previousDay, DATE_FORMAT),
  });

  // やったことを取得
  const completedTasks = await taskProvider.getCompletedTasks(
    previousDay,
    today
  );
  logger.debug({ completedTasks });

  // やることを取得
  const nextTasks = await taskProvider.getNextTasks(today);
  logger.debug({ nextTasks });

  // 整形して出力
  const output = formatDailyReport(completedTasks, nextTasks);
  console.log(output);
}
