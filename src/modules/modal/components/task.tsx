
import { FC, useContext } from 'react';
import styled from 'styled-components';
import { TasksContext } from '../../../../pages/_app';
import { Modal } from '../../../../public/ui/components/modal';

import { ModalsContext } from '../context';

const StyledModal = styled(Modal)`
  padding: 16px;
  width: 30%;
  max-width: 30%;
  height: 100%;
  max-height: 100%;
`;

const Content = styled.div`
  min-height: calc(100% - 24px - 16px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: start;
  gap: 30px;

  list-style: none;
`;



export const TaskModal: FC = () => {
  const {
    task: [open, setOpen],
  } = useContext(ModalsContext);

  const [tasks, setTasks] = useContext(TasksContext);

  return (
    <StyledModal open={open} setOpen={setOpen}>
      <Content>
        <List>
          {tasks.map((el, id) => (
            <li key={id}>
              <h1>{el.title}</h1>
              <p>{el.description}</p>
              <p>{el.date}</p>
            </li>
          ))}
        </List>
      </Content>
    </StyledModal>
  );
};
