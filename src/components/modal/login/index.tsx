import { FC } from 'react';

import { LoginForm } from '../../form/login';

import { Title, Wrapper } from '../styles';

export const LoginModal: FC = () => {
  return (
    <Wrapper>
      <Title>Авторизация</Title>
      <LoginForm />
    </Wrapper>
  );
};
