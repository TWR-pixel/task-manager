import { FC, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { ModalsContext } from '../../../pages/_app';
import { deleteTask } from '../../store/taskSlice';

import { Modal } from '../../modules/modal';

import { ViewModal } from './view';
import { EditingModal } from './editing';
import { DeleteModal } from './delete';
import { AddModal } from './add';
import { RegistrationModal } from './registration';
import { LoginModal } from './login';

export const ModalComponent: FC = () => {
  const {
    isModalOpen,
    modalMode,
    closeModal,
    editingTask,
    confirmDeleteTaskId,
  } = useContext(ModalsContext);

  const dispatch = useDispatch();

  const confirmDeleteTask = () => {
    if (confirmDeleteTaskId) {
      console.log('Confirming deletion of task with ID:', confirmDeleteTaskId);
      dispatch(deleteTask(confirmDeleteTaskId)); // Удаляем задачу по ID
      closeModal();
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {modalMode === 'view' && editingTask && (
        <ViewModal editingTask={editingTask} />
      )}

      {modalMode === 'edit' && editingTask && (
        <EditingModal editingTask={editingTask} />
      )}

      {modalMode === 'add' && <AddModal />}

      {modalMode === 'confirmDelete' && editingTask && (
        <DeleteModal
          editingTask={editingTask}
          confirmDeleteTask={confirmDeleteTask}
        />
      )}

      {modalMode === 'registration' && <RegistrationModal />}

      {modalMode === 'login' && <LoginModal />}
    </Modal>
  );
};
