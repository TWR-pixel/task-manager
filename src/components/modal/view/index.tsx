import { FC } from 'react';
import styled from 'styled-components';

import { Task } from '../../../interfaces/interfaces';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  strong {
    color: #00d0ff;
  }
`;

const StBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FirstTitle = styled.h1`
  font-size: 40px;
  text-align: center;
  color: #ffffff;
`;

const Text = styled.p`
  font-size: 30px;
  color: #ffffffe1;
`;

const DateText = styled.p`
  font-size: 26px;
  color: #ffffff;
`;

interface ViewModalInterface {
  editingTask: Task;
}

export const ViewModal: FC<ViewModalInterface> = ({ editingTask }) => {
  return (
    <Wrapper>
      <StBlock>
        <FirstTitle>{editingTask.title}</FirstTitle>
        <Text>
          <strong>Описание:</strong> {editingTask.description}
        </Text>
      </StBlock>
      <DateText>
        <strong>Дата выполнения:</strong> {editingTask.date || 'Нет даты'}
      </DateText>
    </Wrapper>
  );
};
