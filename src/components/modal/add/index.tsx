import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ModalsContext } from '../../../../pages/_app';

import { Task } from '../../../interfaces/interfaces';

import { TaskForm } from '../../taskForm';

import { addTask } from '../../../../store/taskSlice';

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

export const AddModal = () => {
  const { closeModal } = useContext(ModalsContext);
  const dispatch = useDispatch();

  // Обработчик добавления задачи
  const handleAddTask = (task: Task) => {
    dispatch(addTask(task)); // Диспетчеризуем экшен добавления задачи
    closeModal();
  };
  return (
    <Wrapper>
      <SecondTitle>Новый список</SecondTitle>
      <TaskForm onAdd={handleAddTask} />
    </Wrapper>
  );
};
