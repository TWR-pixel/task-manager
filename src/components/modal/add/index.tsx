import {  useContext } from 'react';

import styled from 'styled-components';

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

const StBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SecondTitle = styled.h2`
  text-align: center;
  color: #84848480;
`;

export const AddModal = () => {
  const { handleAddOrUpdateTask } = useContext(TasksContext);

  return (
    <Wrapper>
      <SecondTitle>Новый список</SecondTitle>
      <TaskForm onAdd={handleAddOrUpdateTask} />
    </Wrapper>
  );
};
