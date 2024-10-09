import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getColumns } from '../services/columnService';
import { getTasks } from '../services/taskService';

import { setColumns } from '../store/columnSlice';
import { setTasks } from '../store/taskSlice';

export const useBoardData = () => {
  const dispatch = useDispatch();

  // Загружаем колонок из API
  const loadColumns = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      try {
        const columnsData = await getColumns(token, userId);
        dispatch(setColumns(columnsData));
      } catch (error) {
        console.error('Ошибка при загрузке колонок:', error);
      }
    }
  };

  // Загрузка задач из API
  const loadTasks = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      try {
        const tasksData = await getTasks(token, userId); // Получаем задачи по userId
        dispatch(setTasks(tasksData));
      } catch (error) {
        console.error('Ошибка при загрузке задач:', error);
      }
    }
  };
  // Загрузка колонок и задач при монтировании компонента
  useEffect(() => {
    loadColumns();
    loadTasks();
  }, [dispatch]);
};
