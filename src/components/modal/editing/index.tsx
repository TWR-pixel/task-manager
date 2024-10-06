import { FC, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { Task, updateTask } from '../../../../store/taskSlice';

import { ModalsContext } from '../../../../pages/_app';

import { TaskForm } from '../../form/task';

import { Title, Wrapper } from '../styles';

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
      <Title>Редактирование</Title>
      <TaskForm onAdd={handleAddOrUpdateTask} editingTask={editingTask} />
    </Wrapper>
  );
};
