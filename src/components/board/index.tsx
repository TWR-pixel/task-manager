import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { StAddColumn } from '../../../public/assets/addColumn';

import { useAppSelector } from '../../store/hooks';
import { addColumn, deleteColumn, updateColumn } from '../../store/columnSlice';

import { filterTaskByFilter, filterTasksByColumn } from '../../utils/taskUtils';

import { addColumnApi } from '../../services/columnService';

import Column from '../column';

import { TaskFilter } from './filter';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
`;

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
  const [filter, setFilter] = useState<string>('all');
  const dispatch = useDispatch();

  const tasks = useAppSelector((state) => state.tasks.tasks);
  const columns = useAppSelector((state) => state.columns.columns);

  const handleAddColumn = async () => {
    if (columnTitle.trim()) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (token && userId) {
        const newColumn = {
          id: uuidv4(),
          title: columnTitle,
        };
        try {
          const createdColumn = await addColumnApi(token, userId, newColumn);
          dispatch(addColumn(createdColumn));
          setColumnTitle('Название');
        } catch (error) {
          console.error('Ошибка при добавлении колонки:', error);
        }
      }
    }
  };

  const handleChangeColumnTitle = (id: string, newTitle: string) => {
    dispatch(updateColumn({ id, title: newTitle }));
  };

  const handleDeleteColumn = (id: string) => {
    dispatch(deleteColumn(id));
  };

  // Подсчет задач для каждого фильтра
  const tasksCount = useMemo(
    () => ({
      recentlyAdded: filterTaskByFilter(tasks, 'recentlyAdded').length,
      today: filterTaskByFilter(tasks, 'today').length,
      week: filterTaskByFilter(tasks, 'week').length,
      all: filterTaskByFilter(tasks, 'all').length,
    }),
    [tasks]
  );

  const filteredTasksByColumn = (columnId: string) =>
    filterTasksByColumn(tasks, filter, columnId);

  return (
    <Wrapper>
      <TaskFilter
        tasksCount={tasksCount}
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      <List>
        {columns.map(({ id, title }) => (
          <Column
            key={id}
            id={id}
            title={title}
            tasks={filteredTasksByColumn(id)}
            onEditTitle={(newTitle) => handleChangeColumnTitle(id, newTitle)}
            onDelete={() => handleDeleteColumn(id)}
          />
        ))}

        <StAddColumn onClick={handleAddColumn} />
      </List>
    </Wrapper>
  );
};
