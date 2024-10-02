import { FC } from 'react';
import styled from 'styled-components';

import { Task } from '../../interfaces/interfaces';

import { List } from '../../../styles/styles';

import { StEditIcon } from '../../../public/assets/edit';
import { StDeleteIcon } from '../../../public/assets/delete';

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
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
  index: number;
}

export const TaskItem: FC<TaskItemProps> = ({
  task,
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
        <StEditIcon
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
        >
          Редактировать
        </StEditIcon>
        <StDeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
        />
      </Wrapper>
    </List>
  );
};
