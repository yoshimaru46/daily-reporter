type Task = {
  title: string;
  completedAt?: Date;
  createdAt?: Date;
};

interface TaskProvider {
  getCompletedTasks: (from: Date, to: Date) => Promise<Task[]>;
  getNextTasks: (today: Date) => Promise<Task[]>;
}

export type { Task, TaskProvider };
