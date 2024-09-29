import { ComponentProps, FC } from 'react';
import styled from 'styled-components';

interface IClearCheckbox extends ComponentProps<'svg'> {}

const ClearCheckbox: FC<IClearCheckbox> = (props) => (
  <svg
    fill="#ffffff"
    width="64px"
    height="64px"
    viewBox="0 0 128.00 128.00"
    version="1.1"
    stroke="#ffffff"
    strokeWidth="0.00128"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <path d="M1,127h126V1H1V127z M9,9h110v110H9V9z"></path>{' '}
      </g>
    </g>
  </svg>
);

export const StClearCheckbox = styled(ClearCheckbox)`
  width: 20px;
  height: 20px;
  
  cursor: pointer;
`;
