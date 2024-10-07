import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { ModalsContext } from '../../../../pages/_app';

import { addTask, Task } from '../../../../store/taskSlice';

import { TaskForm } from '../../form/task';

import { Title, Wrapper } from '../styles';

export const AddModal = () => {
  const { closeModal } = useContext(ModalsContext);
  const dispatch = useDispatch();

  const handleAddTask = (task: Task) => {
    dispatch(addTask(task));
    closeModal();
  };

  return (
    <Wrapper>
      <Title>Новый список</Title>
      <TaskForm onAdd={handleAddTask} />
    </Wrapper>
  );
};
