import React, { FC } from 'react';
import styled from 'styled-components';

import { List } from '../../../styles/styles';

import { StDeleteIcon } from '../../../public/assets/delete';

import { Task } from '../../interfaces/interfaces';
import { StEditIcon } from '../../../public/assets/edit';
import { StClearCheckbox } from '../../../public/assets/clearCheckbox';
import { StCheckbox } from '../../../public/assets/checkbox';

const StButton = styled.button`
  background-color: transparent;
  width: 20px;
  height: 20px;
  border: none;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const TaskBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  cursor: pointer;
`;

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
}

export const TaskItem: FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
  onView,
}) => {
  return (
    <List>
      <TaskBlock onClick={() => onView(task)}>
        <h1>{task.title}</h1>
      </TaskBlock>
      <Wrapper>
        <StEditIcon onClick={() => onEdit(task)}>Редактировать</StEditIcon>
        {task.completed ? (
          <StCheckbox onClick={() => onToggle(task.id)} />
        ) : (
          <StClearCheckbox onClick={() => onToggle(task.id)} />
        )}

        <StDeleteIcon onClick={() => onDelete(task.id)} />
      </Wrapper>
    </List>
  );
};
