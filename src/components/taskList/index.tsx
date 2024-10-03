import { FC, useContext } from 'react';
import styled from 'styled-components';

import { Task } from '../../interfaces/interfaces';

import { ModalsContext } from '../../../pages/_app';

import { TaskItem } from '../taskItem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface TaskListInterface {
  tasks: Task[];
}

const TaskList: FC<TaskListInterface> = ({ tasks }) => {
  const { openModal } = useContext(ModalsContext);

  const handleEditTask = (task: Task) => {
    openModal('edit', task);
  };

  const handleViewTask = (task: Task) => {
    openModal('view', task);
  };

  const handleDeleteTaskRequest = (id: string) => {
    openModal('confirmDelete', { id } as Task);
  };

  return (
    <Wrapper>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index} // Передаем индекс для перетаскивания
            onDelete={handleDeleteTaskRequest}
            onEdit={handleEditTask}
            onView={handleViewTask}
          />
        ))
      ) : (
        <p>Нет задач для отображения.</p>
      )}
    </Wrapper>
  );
};

export default TaskList;
