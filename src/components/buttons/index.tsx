import { FC } from 'react';
import styled from 'styled-components';

const StButton = styled.button`
  display: flex;

  font-size: 30px;
  padding: 10px;

  color: #ff9d00;
  background-color: transparent;

  border-radius: 8px;
  border: none;
`;

interface AddTaskButtonInterface {
  onClick: () => void;
}

const AddTaskButton: FC<AddTaskButtonInterface> = ({ onClick }) => {
  return <StButton onClick={onClick}>Добавить</StButton>;
};

export default AddTaskButton;
