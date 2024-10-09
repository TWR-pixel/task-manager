import { FC, useContext } from 'react';
import styled from 'styled-components';

import { ModalsContext } from '../../../pages/_app';

import { Task } from '../../store/taskSlice';

import { AddTaskButton } from '../buttons/addTask';

import { TaskItem } from '../taskItem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Text = styled.p`
  color: #ffffff;
`;

interface TaskListInterface {
  tasks: Task[];
  columnId: string;
}

const TaskList: FC<TaskListInterface> = ({ tasks, columnId }) => {
  const { openModal } = useContext(ModalsContext);

  const handleEditTask = (task: Task) => {
    openModal('edit', task);
  };

  const handleViewTask = (task: Task) => {
    openModal('view', task);
  };

  const handleDeleteTaskRequest = (task: Task) => {
    openModal('confirmDelete', task);
  };

  // Условие для рендеринга кнопки "Добавить задачу"
  const isFirstColumn = columnId === 'todo';

  return (
    <Wrapper>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTaskRequest}
            onEdit={handleEditTask}
            onView={handleViewTask}
          />
        ))
      ) : (
        <Text>Нет задач для отображения.</Text>
      )}

      {isFirstColumn && <AddTaskButton onClick={() => openModal('add')} />}
    </Wrapper>
  );
};

export default TaskList;
