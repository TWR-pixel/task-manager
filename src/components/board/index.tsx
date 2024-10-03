import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Column from '../column';

import store from '../../../store/store';
import { useAppSelector } from '../../../store/hooks';
import { setTasks } from '../../../store/taskSlice';

import { StAddColumn } from '../../../public/assets/addColumn';

const BoardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;
interface ColumnInterface {
  id: string;
  title: string;
}

export const Board: FC = () => {
  const [columns, setColumns] = useState<ColumnInterface[]>([
    { id: 'todo', title: 'Нужно сделать' },
    { id: 'inProgress', title: 'В процессе' },
    { id: 'completed', title: 'Завершенные' },
  ]);
  const [columnTitle, setColumnTitle] = useState('Название');
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  // Сохраняем колонки в localStorage
  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  // Загружаем колонки из localStorage
  useEffect(() => {
    const savedColumns = localStorage.getItem('columns');
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  }, []);

  //загружаем задачи из localStorage
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem('tasks', JSON.stringify(state.tasks.tasks));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // сохраняем Задачи в localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch(setTasks(JSON.parse(savedTasks)));
    }
  }, []);

  const handleAddColumn = () => {
    if (columnTitle.trim()) {
      const newColumn = {
        id: uuidv4(),
        title: columnTitle,
      };
      setColumns((prevColumns) => [...columns, newColumn]);
    }
  };

  const handleChangeColumnTitle = (id: string, newTitle: string) => {
    setColumns((prevColumn) =>
      prevColumn.map((column) =>
        column.id === id ? { ...column, title: newTitle } : column
      )
    );
  };

  const filterTasksByColumn = (columnId: string) => {
    return tasks.filter((task) => task.column === columnId);
  };

  return (
    <BoardWrapper>
      {columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={filterTasksByColumn(column.id)}
          onEditTitle={(newTitle) =>
            handleChangeColumnTitle(column.id, newTitle)
          } // Получаем задачи для каждой колонки
        />
      ))}

      <StAddColumn onClick={handleAddColumn} />
    </BoardWrapper>
  );
};
