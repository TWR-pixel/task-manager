import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { ModalsContext } from '../../../../pages/_app';

import { addTask, Task } from '../../../store/taskSlice';

import { TaskForm } from '../../form/task';

import { Title, Wrapper } from '../styles';

export const AddModal = () => {
  const { closeModal } = useContext(ModalsContext);
  const dispatch = useDispatch();

  const handleAddTask = (task: Task) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in localStorage');
      return; // Выход из функции, если userId не найден
    }

    dispatch(addTask({ ...task, userId }));
    closeModal();
  };

  return (
    <Wrapper>
      <Title>Новый список</Title>
      <TaskForm onAdd={handleAddTask} />
    </Wrapper>
  );
};
