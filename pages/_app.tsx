import { AppProps } from 'next/app';
import { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Tabs } from '../src/components/tabs';
import { Task } from '../src/interfaces/interfaces';

import { GlobalStyles } from '../styles/global-styles';

import { ModalComponent } from '../src/components/modal';
import AddTaskButton from '../src/components/buttons';

const Wrapper = styled.div`
  height: 100vh;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #020202;
`;

const StButton = styled.button`
  display: flex;
  font-size: 30px;

  color: #00d0ff;

  padding: 10px;

  border-radius: 8px;
  border: none;

  background-color: transparent;
`;

const TasksBlock = styled.div`
  height: calc(100vh - 100px); // Учитываем высоту кнопки и отступы
  overflow-y: auto; // Включаем прокрутку только для задач
  padding-right: 10px;
`;

// Интерфейс для контекста модального окна
interface ModalsContextInterface {
  isModalOpen: boolean;
  modalMode: 'view' | 'edit' | 'add' | 'confirmDelete'; // Добавлен новый режим
  openModal: (
    mode: 'view' | 'edit' | 'add' | 'confirmDelete',
    task?: Task | null,
    onConfirm?: (id: string) => void
  ) => void;
  closeModal: () => void;
  editingTask: Task | null;
  confirmDeleteTaskId: string | null; // Добавляем ID для подтверждения удаления
}

// Создаем контекст для управления модальным окном
export const ModalsContext = createContext<ModalsContextInterface>({
  isModalOpen: false,
  modalMode: 'add',
  openModal: () => {},
  closeModal: () => {},
  editingTask: null,
  confirmDeleteTaskId: null,
});

interface TasksContextInterface {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  handleToggleTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  handleAddOrUpdateTask: (newTask: Task) => void;
}

export const TasksContext = createContext<TasksContextInterface>({
  tasks: [],
  setTasks: () => {},
  handleToggleTask: () => {},
  handleDeleteTask: () => {},
  handleAddOrUpdateTask: () => {},
});

function CustomApp({ Component, pageProps }: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    'view' | 'edit' | 'add' | 'confirmDelete'
  >('add');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [confirmDeleteTaskId, setConfirmDeleteTaskId] = useState<string | null>(
    null
  );

  // Загрузка задач из localStorage
  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  // Сохранение задач в localStorage при их изменении
  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  // Загрузка задач из localStorage только один раз при первой загрузке
  const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  // Сохранение задач в localStorage при их изменении
  const saveTasksToLocalStorage = (tasks: Task[]) => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };

  const openModal = (
   mode: 'view' | 'edit' | 'add' | 'confirmDelete',
   task?: Task | null,
   onConfirm?: (id: string) => void
 ) => {
   setModalMode(mode);
   setEditingTask(task || null);
   setIsModalOpen(true);
   if (mode === 'confirmDelete' && task) {
     setConfirmDeleteTaskId(task.id); // Устанавливаем ID задачи для удаления
   }
 };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMode('add');
    setEditingTask(null);
    setConfirmDeleteTaskId(null); // Сбрасываем ID при закрытии
  };

  //функция для переключения статуса задач
  const handleToggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    closeModal();
  };

  // Функция для добавления или обновления задачи
  const handleAddOrUpdateTask = (newTask: Task) => {
    if (modalMode === 'edit' && editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editingTask.id ? newTask : task))
      );
    } else {
      const taskExists = tasks.some((task) => task.id === newTask.id);
      if (!taskExists) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    }
    closeModal();
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        handleToggleTask,
        handleDeleteTask,
        handleAddOrUpdateTask,
      }}
    >
      <ModalsContext.Provider
        value={{
          isModalOpen,
          modalMode,
          openModal,
          closeModal,
          editingTask,
          confirmDeleteTaskId,
        }}
      >
        <GlobalStyles />
        <Wrapper>
          <div>
            <Tabs />

            <Component {...pageProps} />
          </div>
          <div>
            <AddTaskButton onClick={() => openModal('add')} />
          </div>
          <ModalComponent />
        </Wrapper>
      </ModalsContext.Provider>
    </TasksContext.Provider>
  );
}

export default CustomApp;
