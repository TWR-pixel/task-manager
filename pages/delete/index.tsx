import { FC, useContext } from 'react';
import styled from 'styled-components';

import { TasksContext } from '../_app';

import { Checkbox } from '../../public/assets/checkbox';
import { ClearCheckbox } from '../../public/assets/clearCheckbox';
import { DeleteIcon } from '../../public/assets/delete';

const List = styled.ul`
  display: flex;
  gap: 14px;
  flex-direction: column;

  list-style: none;

  color: #ffffff;

  li {
    padding-bottom: 5px;
    border-bottom-width: 50vh;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    gap: 15px;

    &:hover {
      color: yellow;
      transition: 0.2s;
      border-radius: 5px;
    }
  }
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  margin-left: auto;
  width: 12px;
  height: 12px;
`;

const StyledCheckbox = styled(Checkbox)`
  width: 30px;
  height: 30px;
`;

const StyledClearCheckbox = styled(ClearCheckbox)`
  width: 30px;
  height: 30px;
`;

const DeletePage: FC = () => {
  const [tasks, setTasks] = useContext(TasksContext);

  const changeTaskStatus = (el: any) => {
    setTasks(
      tasks.map((item) =>
        item.id === el.id ? { ...item, done: !item.done } : item
      )
    );
  };

  const changeTaskStatusDelete = (el: any) => {
    setTasks(
      tasks.map((item) =>
        item.id === el.id ? { ...item, delete: !item.delete } : item
      )
    );
  };

  return (
    <List>
      {tasks.map((el) => (
        <li key={el.id}>
          {el.done ? (
            <StyledCheckbox onClick={() => changeTaskStatus(el)} />
          ) : (
            <StyledClearCheckbox onClick={() => changeTaskStatus(el)} />
          )}

          {el.title}

          <StyledDeleteIcon onClick={() => changeTaskStatusDelete(el)} />
        </li>
      ))}
    </List>
  );
};

export default DeletePage;
