// Импортируем необходимые функции и типы из Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Task } from '../src/interfaces/interfaces';

// Интерфейс для состояния задач
interface TasksState {
  tasks: Task[];
}

interface MoveTaskPayload {
  taskId: string;
  source: string; // Добавлено свойство source
  destination: string; // Оставлено как есть
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push({
        ...action.payload,
        column: 'todo', // Задачи по умолчанию добавляются в колонку "Нужно сделать"
      });
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    moveTask(state, action: PayloadAction<MoveTaskPayload>) {
      const { taskId, destination } = action.payload; // Получаем ID задачи и колонку назначения
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId); // Находим индекс задачи

      if (taskIndex === -1) return; // Если задача не найдена, выходим

      const task = state.tasks[taskIndex]; // Получаем задачу

      // Определяем новые значения для обновленной задачи
      const newValues = {
        column: destination,
        completed: destination === 'completed',
        inProgress: destination === 'inProgress',
      };

      // Обновляем состояние задачи
      state.tasks[taskIndex] = { ...task, ...newValues };

      console.log(`Task ${taskId} moved to ${destination}`); // Логируем перемещение
    },
  },
});

export const { setTasks, addTask, deleteTask, updateTask, moveTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
