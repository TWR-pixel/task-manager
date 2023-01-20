import { Dispatch, FC, SetStateAction, useContext } from 'react';
import styled from 'styled-components';

import { Task, TasksContext } from '../../../../pages/_app';

import { Modal } from '../../../../public/ui/components/modal';

import { EditForm } from '../../../components/form/edit';
import { ModalsContext } from '../context';

interface IEditTaskModal {
  tasks: [Task[], Dispatch<SetStateAction<Task[]>>];
}

export type EditTask = (
  title: string,
  description: string,
  date: string
) => void;

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

export const EditTaskModal: FC<IEditTaskModal> = () => {
  const {
    edit: [open, setOpen],
  } = useContext(ModalsContext);

  const [tasks, setTasks] = useContext(TasksContext);

  const editTask: EditTask = (title, description, date) => {
    setTasks((tasks: Task[]) =>
      tasks.map((task, index) => {
        if (task.id == index) {
          return {
            id: tasks.length,
            title,
            description,
            date,
            done: false,
            delete: false,
          };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <StyledModal open={open} setOpen={setOpen}>
      <Content>
        <EditForm editTask={editTask} />
      </Content>
    </StyledModal>
  );
};
