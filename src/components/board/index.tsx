import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Column from '../column';

import store from '../../../store/store';
import { useAppSelector } from '../../../store/hooks';
import { setTasks } from '../../../store/taskSlice';
import {
  addColumn,
  deleteColumn,
  setColumns,
  updateColumn,
} from '../../../store/columnSlice';

import { StAddColumn } from '../../../public/assets/addColumn';

const List = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: nowrap;

  overflow-x: auto;
  overflow-y: hidden;
  height: calc(100vh - 40px);

  /* Стилизация скролла */
  ::-webkit-scrollbar {
    width: 12px; /* Ширина вертикального скроллбара */
    height: 12px; /* Высота горизонтального скроллбара */
  }

  ::-webkit-scrollbar-track {
    background: #ffc96b46; /* Цвет фона скроллбара */
    border-radius: 10px; /* Закругление углов трека */
    margin: 0 60px 4px 60px; /* Добавим отступ снизу к треку */
  }

  ::-webkit-scrollbar-thumb {
    background: #e97230; /* Цвет ползунка */
    border-radius: 10px; /* Закругление углов ползунка */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #e97230;
  }
`;

export const Board: FC = () => {
  const [columnTitle, setColumnTitle] = useState('Название');
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const columns = useAppSelector((state) => state.columns.columns);
  const dispatch = useDispatch();

  // Загружаем колонки из localStorage
  useEffect(() => {
    const savedColumns = localStorage.getItem('columns');
    if (savedColumns) {
      dispatch(setColumns(JSON.parse(savedColumns)));
    }
  }, [dispatch]);

  //загружаем задачи из localStorage
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem('tasks', JSON.stringify(state.tasks.tasks));
      localStorage.setItem('columns', JSON.stringify(state.columns.columns));
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
  }, [dispatch]);

  const handleAddColumn = () => {
    if (columnTitle.trim()) {
      const newColumn = {
        id: uuidv4(),
        title: columnTitle,
      };
      dispatch(addColumn(newColumn));
      setColumnTitle('Название');
    }
  };

  const handleChangeColumnTitle = (id: string, newTitle: string) => {
    dispatch(updateColumn({ id, title: newTitle }));
  };

  const handleDeleteColumn = (id: string) => {
    dispatch(deleteColumn(id));
  };

  const filterTasksByColumn = useMemo(() => {
    return (columnId: string) =>
      tasks.filter((task) => task.column === columnId);
  }, [tasks]);

  return (
    <List>
      {columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={filterTasksByColumn(column.id)}
          onEditTitle={(newTitle) =>
            handleChangeColumnTitle(column.id, newTitle)
          }
          onDelete={() => handleDeleteColumn(column.id)}
        />
      ))}
      <StAddColumn onClick={handleAddColumn} />
    </List>
  );
};
