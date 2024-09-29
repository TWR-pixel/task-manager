import styled from 'styled-components';
import { Task } from '../../../interfaces/interfaces';
import { FC, useContext } from 'react';
import { TaskForm } from '../../taskForm';
import { TasksContext } from '../../../../pages/_app';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  strong {
    color: #00d0ff;
  }
`;

const SecondTitle = styled.h2`
  text-align: center;
  color: #84848480;
`;

interface EditingModalInterface {
  editingTask: Task;
}

export const EditingModal: FC<EditingModalInterface> = ({
  editingTask,
}) => {
  const { handleAddOrUpdateTask } = useContext(TasksContext);
  
  return (
    <Wrapper>
      <SecondTitle>Редактирование</SecondTitle>
      <TaskForm onAdd={handleAddOrUpdateTask} editingTask={editingTask} />
    </Wrapper>
  );
};
