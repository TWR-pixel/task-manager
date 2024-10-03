import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Task } from '../../interfaces/interfaces';

import TaskList from '../taskList';

import { moveTask } from '../../../store/taskSlice';

const Wrapper = styled.div`
  min-width: auto;
  min-height: 100px;

  padding: 20px;
  margin: 0 10px;

  border-radius: 5px;

  background-color: #737373;
`;

const TitleInput = styled.input`
  font-size: 20px;

  padding: 4px 8px;
  margin: 0 0 10px 0;

  border-radius: 6px;

  color: #ff9d00;
  background-color: transparent;

  border: none;
  :focus {
    background-color: #60606065;
  }
`;

interface ColumnProps {
  title: string;
  tasks: Task[];
  id: string;
  onEditTitle: (newTitle: string) => void;
}

const Column: FC<ColumnProps> = ({ title, tasks, id, onEditTitle }) => {
  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string; column: string }) => {
      if (item.column !== id) {
        dispatch(
          moveTask({ taskId: item.id, source: item.column, destination: id })
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Wrapper ref={drop}>
      <TitleInput
        type="text"
        defaultValue={title} // Устанавливаем текущее название колонки
        onBlur={(e) => onEditTitle(e.target.value)} // Изменяем название при потере фокуса
      />
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <p>Нет задач для отображения.</p>
      )}
    </Wrapper>
  );
};

export default Column;
