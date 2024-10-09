import { Task } from '../store/taskSlice';

import { calculateDaysLeft } from './dateUtils';

// Функция фильтрации задач по выбранному фильтру
export const filterTaskByFilter = (tasks: Task[], filter: string) => {
  return tasks.filter((task) => {
    const daysLeft = calculateDaysLeft(task.dueDate ?? '');
    switch (filter) {
      case 'recentlyAdded':
        return tasks.slice(-5);
      case 'today':
        return daysLeft === 0;
      case 'week':
        return daysLeft <= 7;
      case 'all':
      default:
        return true;
    }
  });
};

export const filterTasksByColumn = (
  tasks: Task[],
  filter: string,
  columnId: string
) => {
  return tasks
    .filter((task) => {
      const daysLeft = calculateDaysLeft(task.dueDate ?? '');
      switch (filter) {
        case 'recentlyAdded':
          return true;
        case 'today':
          return daysLeft === 0;
        case 'week':
          return daysLeft <= 7;
        case 'all':
        default:
          return true;
      }
    })
    .filter((task) => task.column === columnId);
};
