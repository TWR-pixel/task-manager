import { ComponentProps, FC } from 'react';
import styled from 'styled-components';

interface ICheckboxProps extends ComponentProps<'svg'> {}

const Checkbox: FC<ICheckboxProps> = (props) => (
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
        <polygon points="59.2,78.3 40.2,59.3 34.5,64.9 59.2,89.6 98,50.8 92.3,45.1 "></polygon>
        <path d="M1,127h126V1H1V127z M9,9h110v110H9V9z"></path>
      </g>
    </g>
  </svg>
);

export const StCheckbox = styled(Checkbox)`
  width: 20px;
  height: 20px;
  
  cursor: pointer;
`;
