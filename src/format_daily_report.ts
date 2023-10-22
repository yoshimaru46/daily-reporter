import { Task } from "./task_providers/types.ts";

export const formatDailyReport = (
  completedTasks: Task[],
  nextTasks: Task[],
) => {
  const completedTasksText = tasksText(completedTasks);
  const nextTasksText = tasksText(nextTasks);

  const COMPLETED_TASKS_HEADER = "## やったこと";
  const NEXT_TASKS_HEADER = "## やること";

  return `${COMPLETED_TASKS_HEADER}\n${completedTasksText}\n\n${NEXT_TASKS_HEADER}\n${nextTasksText}`;
};

const tasksText = (tasks: Task[]) => {
  return tasks
    .map((task) => {
      return `- ${task.title}`;
    })
    .join("\n");
};
