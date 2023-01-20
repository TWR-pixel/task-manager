export interface IRequestData {
  title: string;
  description: string;
  date: string;
}

const date = new Date();

export const initialRequestData: IRequestData = {
  title: '',
  description: '',
  date: `${date.toISOString().split('T')[0]}`,
};
