import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

import { Board } from '../../src/components/board';

const Wrapper = styled.div`
  margin: 20px 40px;
`;

const AllPage = () => {
  return (
    <Wrapper>
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </Wrapper>
  );
};

export default AllPage;
