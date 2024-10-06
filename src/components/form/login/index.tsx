import { FC, useContext } from 'react';

import { useLogin } from '../../../hooks/useLogin';

import { ModalsContext } from '../../../../pages/_app';

import { ErrorMessage, Input, StButton, StForm } from '../styles';

export const LoginForm: FC = () => {
  const { email, setEmail, password, setPassword, error, handleSubmit } =
    useLogin();
  const { closeModal } = useContext(ModalsContext);

  return (
    <StForm onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <StButton type="submit">Войти</StButton>
      <StButton type="button" onClick={closeModal}>
        Отмена
      </StButton>
    </StForm>
  );
};
