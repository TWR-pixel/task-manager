import { FC, useContext } from 'react';
import styled from 'styled-components';

import { ModalsContext } from '../../../../pages/_app';

import { Task } from '../../../interfaces/interfaces';

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

interface DeleteModalInterface {
  editingTask: Task;
  confirmDeleteTask: () => void;
}

export const DeleteModal: FC<DeleteModalInterface> = ({
  editingTask,
  confirmDeleteTask,
}) => {
  const { closeModal } = useContext(ModalsContext);
  return (
    <Wrapper>
      <SecondTitle>Удалить задачу?</SecondTitle>
      <p>Вы уверены, что хотите удалить задачу "{editingTask.title}"?</p>
      <button onClick={confirmDeleteTask}>Удалить</button>
      <button onClick={closeModal}>Отмена</button>
    </Wrapper>
  );
};
