import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Task } from '../../interfaces/interfaces';

import Column from '../column';

import store from '../../../store/store';
import { useAppSelector } from '../../../store/hooks';
import { setTasks } from '../../../store/taskSlice';

const BoardWrapper = styled.div`
  display: flex;
`;

export const Board: FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem('tasks', JSON.stringify(state.tasks.tasks));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch(setTasks(JSON.parse(savedTasks)));
    }
  }, []);

  // Определение условий фильтрации для каждой колонки
  const filterConditions = {
    todo: (task: Task) => !task.completed && !task.deleted, // Задачи, которые нужно сделать
    inProgress: (task: Task) => task.inProgress && !task.deleted, // Задачи в процессе
    completed: (task: Task) => task.completed && !task.deleted, // Завершенные задачи
  };

  return (
    <BoardWrapper>
      <Column
        title="Нужно сделать"
        tasks={tasks.filter(filterConditions.todo)}
      />
      <Column
        title="В процессе"
        tasks={tasks.filter(filterConditions.inProgress)}
      />
      <Column
        title="Завершенные"
        tasks={tasks.filter(filterConditions.completed)}
      />
    </BoardWrapper>
  );
};
