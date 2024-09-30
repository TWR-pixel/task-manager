import React, { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { TaskItem } from '../taskItem';

import { Task } from '../../interfaces/interfaces';

import { ModalsContext, TasksContext } from '../../../pages/_app';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TaskList: FC = () => {
  const router = useRouter();
  const { tasks, handleToggleTask } = useContext(TasksContext);
  const { openModal } = useContext(ModalsContext);

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  // Фильтрация задач в зависимости от текущего маршрута
  useEffect(() => {
    const path = router.pathname;

    const filterTasks = (condition: (task: Task) => boolean) => {
      setFilteredTasks(tasks.filter(condition));
    };

    switch (path) {
      case '/all':
        filterTasks((task) => !task.deleted);
        break;
      case '/todo':
        filterTasks((task) => !task.completed && !task.deleted);
        break;
      case '/done':
        filterTasks((task) => task.completed && !task.deleted);
        break;
      default:
        filterTasks(() => true);
    }
  }, [router.pathname, tasks]);

  const handleEditTask = (task: Task) => {
    openModal('edit', task);
  };

  const handleViewTask = (task: Task) => {
    openModal('view', task);
  };

  const handleDeleteTaskRequest = (id: string) => {
    openModal('confirmDelete', { id } as Task); // Передаем только id в openModal
  };

  return (
    <Wrapper>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTaskRequest}
          onEdit={handleEditTask}
          onView={handleViewTask}
        />
      ))}
    </Wrapper>
  );
};
