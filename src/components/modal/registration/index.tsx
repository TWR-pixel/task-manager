import { Title, Wrapper } from '../styles';

import { RegistrationForm } from '../../form/registration';

export const RegistrationModal = () => {
  return (
    <Wrapper>
      <Title>Регистрация</Title>
      <RegistrationForm />
    </Wrapper>
  );
};
