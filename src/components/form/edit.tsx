import { FC, useContext } from 'react';
import styled from 'styled-components';
import { EInputVariant, Input } from '../../../public/ui/components/form/input';

import { IRequestData } from '../../modules/forms/shapes/request';
import { FormsContext } from '../../modules/forms/context';
import { EditTask } from '../../modules/modal/components/editTask';

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
  editTask: EditTask;
}

export const EditForm: FC<FormProps> = ({ editTask }) => {
  const { edit } = useContext(FormsContext);
  const [data, setData] = edit;

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
        onClick={() => editTask(data.title, data.description, data.date)}
      >
        Edit Task
      </StyledButton>
    </Wrapper>
  );
};
