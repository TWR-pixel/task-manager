import { useContext } from 'react';
import styled from 'styled-components';

import { ModalsContext } from '../../modules/modal/context';

const StyledButton = styled.button`
  cursor: pointer;

  border: none;
  background-color: transparent;

  &:hover {
    color: orange;
    transition: 0.2s;
    border-radius: 5px;
  }
`;

export const ChangeTask = () => {
  const { edit } = useContext(ModalsContext);

  const [open, setOpen] = edit;

  const changeTask = () => {
    setOpen(true);
  };

  return <StyledButton onClick={changeTask}>Изменить задачу</StyledButton>;
};
