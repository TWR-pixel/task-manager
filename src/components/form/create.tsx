import { FC, useContext } from 'react';
import styled from 'styled-components';
import { EInputVariant, Input } from '../../../public/ui/components/form/input';


import { CreateTask } from '../../../pages/_app';
import { IRequestData } from '../../modules/forms/shapes/request';
import { FormsContext } from '../../modules/forms/context';

const Wrapper = styled.div`
  margin-top: auto;
  margin-bottom: 10px;
  display: flex;
  gap: 14px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
`;

interface FormProps {
  createTask: CreateTask;
}

export const CreateForm: FC<FormProps> = ({ createTask }) => {
  const { request } = useContext(FormsContext);
  const [data, setData] = request;

  const patchData =
    <Key extends keyof IRequestData>(key: Key) =>
    (value: IRequestData[Key]) =>
      setData((data) => ({ ...data, [key]: value }));

  return (
    <Wrapper>
      <form action="">
        <Input
          required
          placeholder="Title for the task"
          variant={EInputVariant.Text}
          value={data.title}
          handleChange={patchData('title')}
        />
        <Input
          required
          placeholder="Task description"
          variant={EInputVariant.Text}
          value={data.description}
          handleChange={patchData('description')}
        />

        <Input
          required
          variant={EInputVariant.Date}
          value={data.date}
          handleChange={patchData('date')}
        />
      </form>

      <StyledButton
        onClick={() => createTask(data.title, data.description, data.date)}
      >
        Add new task
      </StyledButton>
    </Wrapper>
  );
};
