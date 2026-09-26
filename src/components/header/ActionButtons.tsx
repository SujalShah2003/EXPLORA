import { Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FiCompass } from 'react-icons/fi';
import styles from './WebHeader.module.css';

const ActionButtons = () => (
  <Group gap="xs" wrap="nowrap">
    <Button
      component={Link}
      to="/products"
      leftSection={<FiCompass size={16} />}
      className={`${styles.authButton} ${styles.signUpButton}`}
    >
      Explore products
    </Button>
  </Group>
);

export default ActionButtons;
