import { AppProps } from 'next/app';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { CreateForm } from '../src/components/form/create';
import { Tabs } from '../src/components/tabs';
import { FormsContext, IFormsContext } from '../src/modules/forms/context';
import { initialRequestData } from '../src/modules/forms/shapes/request';
import { EditTaskModal } from '../src/modules/modal/components/editTask';
import { TaskModal } from '../src/modules/modal/components/task';
import { IModalsContext, ModalsContext } from '../src/modules/modal/context';
import { GlobalStyles } from '../styles/global-styles';

export const TasksContext = createContext<
  [Task[], Dispatch<SetStateAction<Task[]>>]
>([[], () => {}]);

export type CreateTask = (
  title: string,
  description: string,
  date: string
) => void;

const Wrapper = styled.div`
  height: 100vh;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  background-color: #3a004f;
`;

export interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  done: boolean;
  delete: boolean;
}

export const initTasks = [

];

function CustomApp({ Component, pageProps }: AppProps) {
  const modals: IModalsContext = {
    task: useState(false),
    edit: useState(false),
  };

  const tasks = useState<Task[]>(initTasks);

  const forms: IFormsContext = {
    request: useState(initialRequestData),
    edit: useState(initialRequestData),
  };

  const [newTask, setNewTask] = useState('');

  const createTask: CreateTask = (title, description, date) => {
    tasks[1]([
      ...tasks[0],
      {
        id: tasks.length + 1,
        title,
        description,
        date,
        done: false,
        delete: false,
      },
    ]);
    setNewTask('');
  };

  return (
    <>
      <TasksContext.Provider value={tasks}>
        <ModalsContext.Provider value={modals}>
          <FormsContext.Provider value={forms}>
            <GlobalStyles />
            <Wrapper>
              <Tabs />

              <Component {...pageProps} />

              <EditTaskModal tasks={tasks} />

              <TaskModal tasks={tasks} />

              <CreateForm createTask={createTask} />
            </Wrapper>
          </FormsContext.Provider>
        </ModalsContext.Provider>
      </TasksContext.Provider>
    </>
  );
}

export default CustomApp;
