import { ChangeEvent, ComponentPropsWithoutRef, useId, useState } from 'react';
import styled from 'styled-components';

import { ControlStyles, Group } from '../common/group';

export enum EInputStatus {
  Touched = 'touched',
  Pristine = 'pristine',
  Empty = 'empty',
  Error = 'error',
}


export enum EInputVariant {
   Text = 'text',
   Date = 'date',
}

interface IComponentProps<Variant extends EInputVariant>
  extends ComponentPropsWithoutRef<'input'> {
  variant: Variant;
  // message?: string;
  handleChange: (value: string) => void;
}

const Control = styled.input<{ status: EInputStatus }>`
  ${ControlStyles}

  width: 100%;
  border-width: 1px;
`;

export function Input<Variant extends EInputVariant>({
  variant,
  pattern,
  handleChange,
  ...props
}: IComponentProps<Variant>) {
  if (!Object.values(EInputVariant).some((type) => type === variant))
    throw new Error(
      '"variant" property must be one of the EInputVariant members'
    );

  const id = useId();

  const [status, setStatus] = useState<EInputStatus>(EInputStatus.Pristine);

  const format = pattern && new RegExp(pattern);

  const handleStatus = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.trim() === '') {
      setStatus(EInputStatus.Empty);
    } else if (format && !format.test(value)) {
      setStatus(EInputStatus.Error);
    } else {
      setStatus(EInputStatus.Touched);
    }
  };

  return (
    <Group>
      <Control
        id={id}
        type={variant}
        status={status}
        onChange={(event) => {
          handleStatus(event);
          handleChange(event.target.value);
        }}
        {...props}
      />
    </Group>
  );
}
