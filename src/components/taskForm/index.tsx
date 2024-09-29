import { FC, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../interfaces/interfaces';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 60px;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 20px;
  color: #ffffff50;
`;

const StyledInputBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 2px;
`;

const Label = styled.label`
  font-size: 16px;

  padding: 4px 4px 4px 10px;

  color: #00d0ff;
`;

const Input = styled.input`
  font-size: 34px;
  padding: 4px;

  color: #ffffff25;
  background-color: transparent;

  border: 1px solid #6f6f6f92;
  border-radius: 6px;

  &:focus {
    color: #ffffffaa;
    outline: none;
    border: 1px solid #00d0ff;
  }
`;

const StyledButton = styled.button`
  font-size: 30px;

  color: #00d0ff;

  padding: 10px;

  border-radius: 8px;
  border: none;

  background-color: transparent;
`;

interface TaskFormProps {
  onAdd: (task: Task) => void;
  editingTask?: Task | null;
}

const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0]; // Берем дату без времени
};

export const TaskForm: FC<TaskFormProps> = ({ onAdd, editingTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [date, setDate] = useState<string>(getCurrentDate());

  useEffect(() => {
    if (editingTask) {
      setTaskTitle(editingTask.title);
      setTaskDescription(editingTask.description);
      setDate(editingTask.date || getCurrentDate());
    }
  }, [editingTask]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() !== '' && taskDescription.trim() !== '') {
      const newTask: Task = {
        id: editingTask ? editingTask.id : uuidv4(), // Используйте uuid для новых задач
        title: taskTitle,
        description: taskDescription,
        completed: false,
        deleted: false,
        date: date, // Добавляем дату
      };
      onAdd(newTask);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Wrapper>
        <StyledInputBlock>
          <Label>Название задачи </Label>
          <Input
            type="text"
            value={taskTitle}
            placeholder="Название задачи"
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </StyledInputBlock>
        <StyledInputBlock>
          <Label>Описание</Label>
          <Input
            type="text"
            value={taskDescription}
            placeholder="Описание"
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </StyledInputBlock>
        <StyledInputBlock>
          <Label>Дата выполнения</Label>
          <Input
            type="date" // Поле для ввода даты'
            min={getCurrentDate()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </StyledInputBlock>
      </Wrapper>

      <StyledButton type="submit">
        {editingTask ? 'Сохранить изменения' : 'Создать'}
      </StyledButton>
    </StyledForm>
  );
};
