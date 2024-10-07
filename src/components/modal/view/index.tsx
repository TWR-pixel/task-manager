import { FC } from 'react';
import styled from 'styled-components';

import { Task } from '../../../store/taskSlice';

import { Text, Title, Wrapper } from '../styles';
import { formatDate } from '../../../utils/dateUtils';

const StBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`;

interface ViewModalInterface {
  editingTask: Task;
}

export const ViewModal: FC<ViewModalInterface> = ({ editingTask }) => {
  return (
    <Wrapper>
      <Title>{editingTask.title}</Title>
      <StBlock>
        <Text>
          <strong>Описание:</strong> {editingTask.description}
        </Text>
        <Text>
          <strong>Дата добавления:</strong> {editingTask.createdDate}
        </Text>
        <Text>
          <strong>Срок завершения:</strong>{' '}
          {editingTask.dueDate
            ? formatDate(editingTask.dueDate)
            : 'Не установлен'}
        </Text>
      </StBlock>
    </Wrapper>
  );
};
