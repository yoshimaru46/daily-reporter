import { format, subBusinessDays } from "npm:date-fns@2";
import { TaskProviderFactory } from "./task_providers/index.ts";
import { ENV } from "./config.ts";
import { initLogger } from "./logger.ts";
import { formatDailyReport } from "./format_daily_report.ts";
import { notifyToSlack } from "./notifyToSlack.ts";
export const sendDailyReport = async () => {
  const logger = initLogger(ENV.DEBUG_LEVEL);
  logger.debug({ ENV });

  const taskProvider = TaskProviderFactory.create(ENV);

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

  // 整形
  const output = formatDailyReport(completedTasks, nextTasks);
  logger.debug({ output });

  // 送信
  await notifyToSlack(output);
};
