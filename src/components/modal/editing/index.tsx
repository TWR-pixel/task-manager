import { FC, useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ModalsContext } from '../../../../pages/_app';

import { Task } from '../../../interfaces/interfaces';

import { TaskForm } from '../../taskForm';

import { updateTask } from '../../../../store/taskSlice';

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

export const EditingModal: FC<EditingModalInterface> = ({ editingTask }) => {
  const { closeModal } = useContext(ModalsContext);
  const dispatch = useDispatch();

  const handleAddOrUpdateTask = (task: Task) => {
    dispatch(updateTask(task)); // Диспетчеризуем экшен обновления задачи
    closeModal();
  };
  return (
    <Wrapper>
      <SecondTitle>Редактирование</SecondTitle>
      <TaskForm onAdd={handleAddOrUpdateTask} editingTask={editingTask} />
    </Wrapper>
  );
};
