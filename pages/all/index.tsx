import React, { useContext } from 'react';

import { Board } from '../../src/components/board';
import AddTaskButton from '../../src/components/buttons';
import { ModalsContext } from '../_app';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AllPage = () => {
  const { openModal } = useContext(ModalsContext);

  return (
    <Wrapper>
      <div>
        <Board />;
      </div>
      <div>
        <AddTaskButton onClick={() => openModal('add')} />
      </div>
    </Wrapper>
  );
};

export default AllPage;
