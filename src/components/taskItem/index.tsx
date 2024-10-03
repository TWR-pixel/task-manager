import { FC } from 'react';
import styled from 'styled-components';

import { Task } from '../../interfaces/interfaces';

import { List } from '../../../styles/styles';

import { StEditIcon } from '../../../public/assets/edit';
import { StDeleteIcon } from '../../../public/assets/delete';
import { useDrag } from 'react-dnd';

const StList = styled(List)`
  border-radius: 6px;
  outline: none;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  transition: background-color 0.3s ease, transform 0.2s ease; 
  &:hover {
    background-color: #4d380085; 
    transform: scale(1.02); 
  }

  &:active {
    transform: scale(0.98); 
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const TaskBlock = styled.div`
  padding: 4px 8px;
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
  index,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, column: task.column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <StList ref={drag}>
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
    </StList>
  );
};
