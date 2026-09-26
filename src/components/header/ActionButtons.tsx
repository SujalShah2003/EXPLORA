import { Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FiCompass } from 'react-icons/fi';
import { CONTENT } from '@/constants';
import styles from './WebHeader.module.css';

const { exploreProducts } = CONTENT.header;

const ActionButtons = () => (
  <Group gap="xs" wrap="nowrap">
    <Button
      component={Link}
      to={exploreProducts.href}
      leftSection={<FiCompass size={16} />}
      className={`${styles.authButton} ${styles.signUpButton}`}
    >
      {exploreProducts.label}
    </Button>
  </Group>
);

export default ActionButtons;
