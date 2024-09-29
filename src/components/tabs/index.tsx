import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const List = styled.ul`
  display: flex;
  gap: 14px;
  flex-direction: row;
  justify-content: space-around;

  list-style: none;
`;

const StLink = styled(Link)<{ isActive: boolean }>`
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 15px;

  color: #ffffff;

  text-decoration: none;

  :focus {
    border: none;
    outline: none;
  }
`;

export const Tabs = () => {
  const router = useRouter();

  return (
    <List>
      <motion.div whileHover={{ scale: 1.3 }}>
        <StLink href="/all" passHref isActive={router.pathname === '/all'}>
          Все
        </StLink>
      </motion.div>

      <motion.div whileHover={{ scale: 1.3 }}>
        <StLink href="/todo" passHref isActive={router.pathname === '/todo'}>
          В планах 
        </StLink>
      </motion.div>

      <motion.div whileHover={{ scale: 1.3 }}>
        <StLink href="/done" passHref isActive={router.pathname === '/done'}>
          Завершено
        </StLink>
      </motion.div>
    </List>
  );
};
