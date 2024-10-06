import styled from 'styled-components';

export const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Input = styled.input`
  font-size: 34px;
  padding: 4px 10px;

  color: #ffffff25;
  background-color: transparent;

  border: 1px solid #6f6f6f92;
  border-radius: 6px;

  &:focus {
    color: #e97230;

    outline: none;
    border: 1px solid #e97230;
  }
`;

export const StButton = styled.button`
  align-self: center;
  min-width: 360px;

  font-size: 30px;

  color: #ff9d00;

  padding: 10px;

  background-color: transparent;
  
  border: none;
  border-radius: 8px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  cursor: pointer;

  &:hover {
    background-color: #4d380085;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;
