import { FC, FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Task } from '../../../../store/taskSlice';

import { Input, StButton, StForm, Wrapper } from '../styles';

interface TaskFormProps {
  onAdd: (task: Task) => void;
  editingTask?: Task | null;
}

export const TaskForm: FC<TaskFormProps> = ({ onAdd, editingTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTaskTitle(editingTask.title);
      setTaskDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() !== '' && taskDescription.trim() !== '') {
      const newTask: Task = {
        id: editingTask ? editingTask.id : uuidv4(),
        title: taskTitle,
        description: taskDescription,
        completed: false,
        deleted: false,
        column: 'todo',
      };
      onAdd(newTask);
    }
  };

  return (
    <StForm onSubmit={handleSubmit}>
      <Wrapper>
        <Input
          type="text"
          value={taskTitle}
          placeholder="Название задачи"
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <Input
          type="text"
          value={taskDescription}
          placeholder="Описание"
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </Wrapper>

      <StButton type="submit">
        {editingTask ? 'Сохранить изменения' : 'Создать'}
      </StButton>
    </StForm>
  );
};
