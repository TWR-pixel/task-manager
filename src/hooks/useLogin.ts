import { FormEvent, useContext, useState } from 'react';

import { ModalsContext } from '../../pages/_app';

import { handleLogin } from '../services/authService';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { closeModal } = useContext(ModalsContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await handleLogin(email, password);
      alert('Авторизация успешно завершена!');
      closeModal();
    } catch (error) {
      setError('Ошибка авторизации. Проверьте данные и попробуйте снова.');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};
