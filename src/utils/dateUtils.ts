export const getCurrentDate = (): string => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0'); // Добавляет 0 перед числом, если оно меньше 10
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0, поэтому добавляем 1
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const calculateDaysLeft = (dueDate: string) => {
  const today = new Date();

  const deadline = new Date(dueDate);

  const difference = deadline.getTime() - today.getTime();

  const daysLeft = Math.ceil(difference / (1000 * 3600 * 24));

  return daysLeft;
};
