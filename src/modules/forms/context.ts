import { createContext, Dispatch, SetStateAction } from 'react';

import { initialRequestData, IRequestData } from './shapes/request';

type TData<Shape extends object> = [Shape, Dispatch<SetStateAction<Shape>>];

export interface IFormsContext {
  request: TData<IRequestData>;
  edit: TData<IRequestData>;
}

const initial: IFormsContext = {
  request: [initialRequestData, () => {}],
  edit: [initialRequestData, () => {}],
};

export const FormsContext = createContext(initial);
