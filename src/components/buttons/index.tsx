import { FC } from 'react';
import styled from 'styled-components';

const StButton = styled.button`
  display: flex;
  font-size: 30px;
  color: #00d0ff;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: transparent;
`;

interface AddTaskButtonInterface {
  onClick: () => void;
}

const AddTaskButton: FC<AddTaskButtonInterface> = ({ onClick }) => {
  return <StButton onClick={onClick}>Добавить</StButton>;
};

export default AddTaskButton;
