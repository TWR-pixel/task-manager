import { FC, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Task } from '../../../store/taskSlice';

import { getCurrentDate } from '../../../utils/dateUtils';

import { Input, StButton, StForm, Wrapper } from '../styles';

const DateBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;

  padding: 0 10px;
  color: #ff9d00;
`;

interface TaskFormProps {
  onAdd: (task: Task) => void;
  editingTask?: Task | null;
}

export const TaskForm: FC<TaskFormProps> = ({ onAdd, editingTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTaskTitle(editingTask.title);
      setTaskDescription(editingTask.description);
      setDueDate(editingTask.dueDate || '');
    }
  }, [editingTask]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() !== '' && taskDescription.trim() !== '') {
      const newTask: Task = {
        userId: localStorage.getItem('userId') || '',
        id: editingTask ? editingTask.id : uuidv4(),
        title: taskTitle,
        description: taskDescription,
        createdDate: editingTask ? editingTask.createdDate : getCurrentDate(),
        dueDate: dueDate,
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
        <DateBlock>
          <Label>Срок завершения:</Label>
          <Input
            type="date"
            value={dueDate}
            placeholder="Cрок завершения"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </DateBlock>
      </Wrapper>

      <StButton type="submit">
        {editingTask ? 'Сохранить изменения' : 'Создать'}
      </StButton>
    </StForm>
  );
};
