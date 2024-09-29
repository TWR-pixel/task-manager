export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  deleted: boolean;
  date?: string;
}
