import Link from 'next/link';
import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  gap: 14px;
  flex-direction: row;
  justify-content: space-around;

  list-style: none;

  color: #ffffff;
`;

const StyledLink = styled(Link)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  gap: 15px;

  text-decoration: none;

  &:hover {
    color: yellow;
    transition: 0.2s;
    border-radius: 5px;
  }
`;

export const Tabs = () => {
  return (
    <List>
      <StyledLink href={'/all'}>All</StyledLink>
      <StyledLink href={'/todo'}>To Do</StyledLink>
      <StyledLink href={'/done'}>Done</StyledLink>
      <StyledLink href={'/delete'}>Delete</StyledLink>
    </List>
  );
};
