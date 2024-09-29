import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  html {
    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
  }

  body {
    width: 100%;
    margin: 0;

    background-color: #000;

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  }

  img {
    width: 100%;
    max-width: 100%;
  }

  a:focus, input:focus, select:focus, button:focus {
    outline: 2px solid #e97230;
  }

  input, select, button {
    color: inherit;
    
    ::placeholder {
      color: inherit;
    }
  }
`;
