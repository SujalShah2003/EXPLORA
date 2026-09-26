import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FiMoon, FiSun } from 'react-icons/fi';
import { CONTENT } from '@/constants';
import styles from '@/components/header/WebHeader.module.css';

const ToggleTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="default"
      size="lg"
      radius="md"
      className={styles.themeButton}
      onClick={toggleColorScheme}
      aria-label={CONTENT.header.toggleThemeAriaLabel}
    >
      {colorScheme === 'dark' ? <FiSun /> : <FiMoon />}
    </ActionIcon>
  );
};

export default ToggleTheme;
