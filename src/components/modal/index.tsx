import { FC, useContext } from 'react';

import { ModalsContext, TasksContext } from '../../../pages/_app';

import { Modal } from '../../modules/modal';

import { ViewModal } from './view';
import { EditingModal } from './editing';
import { DeleteModal } from './delete';
import { AddModal } from './add';

export const ModalComponent: FC = () => {
  const {
    isModalOpen,
    modalMode,
    closeModal,
    editingTask,
    confirmDeleteTaskId,
  } = useContext(ModalsContext);

  const { handleDeleteTask } = useContext(TasksContext);

  const confirmDeleteTask = () => {
    if (confirmDeleteTaskId) {
      handleDeleteTask(confirmDeleteTaskId); // Удаляем задачу по ID
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
    </Modal>
  );
};
