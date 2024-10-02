import { FC } from 'react';
import styled from 'styled-components';

import { Task } from '../../interfaces/interfaces';

import TaskList from '../taskList';

const Wrapper = styled.div`
  min-width: auto;
  min-height: 100px;

  padding: 20px;
  margin: 0 10px;

  border-radius: 5px;

  background-color: #737373;
`;

const Title = styled.h2`
  font-size: 20px;

  margin: 0 0 10px 0;

  color: #ff9d00;
`;

interface ColumnProps {
  title: string;
  tasks: Task[];
}

const Column: FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <p>Нет задач для отображения.</p>
      )}
    </Wrapper>
  );
};

export default Column;
