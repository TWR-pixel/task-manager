import { createContext, Dispatch, SetStateAction } from 'react';

type TModal = [boolean, Dispatch<SetStateAction<boolean>>];

export interface IModalsContext {
  task: TModal;
  edit: TModal;
}

const initial: IModalsContext = {
  task: [false, () => {}],
  edit: [false, () => {}],
};

export const ModalsContext = createContext(initial);
