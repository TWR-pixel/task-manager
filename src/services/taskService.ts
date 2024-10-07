import { Task } from '../store/taskSlice';

export const addTask = async (task: Task, token: string): Promise<Task> => {
  const response = await fetch('api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Ошибка при добавлении задачи');
  }

  return await response.json();
};

export const getTasks = async (
  token: string,
  userId: string
): Promise<Task[]> => {
  const response = await fetch('/api/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка при получении задач');
  }

  const tasks = await response.json();
  // Фильтруем задачи по userId
  return tasks.filter((task: Task) => task.userId === userId);
};
