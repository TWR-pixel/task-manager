export const handleRegistration = async (
  username: string,
  email: string,
  password: string
) => {
  const userData = {
    username,
    email,
    password,
  };

  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Ошибка при регистрации!');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Ошибка при регистрации. Попробуйте снова!');
  }
};

export const handleLogin = async (email: string, password: string) => {
  const userData = { email, password };

  try {
    const response = await fetch('/api/..', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Неверные учетные данные');
    }
    const { token } = await response.json();
    localStorage.setItem('token', token);
  } catch (error) {
    throw new Error('Ошибка при авторизации. Попробуйте снова!');
  }
};
