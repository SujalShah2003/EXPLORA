import { Anchor, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { CONTENT } from '@/constants';
import styles from './WebHeader.module.css';

const { navLinks } = CONTENT.header;

const WebHeader = () => (
  <Group gap={4} visibleFrom="md">
    {navLinks.map((link) => (
      <Anchor
        key={link.label}
        component={Link}
        to={link.href}
        c="var(--mantine-color-text)"
        fw={500}
        underline="never"
        px="md"
        py="sm"
        className={styles.navLink}
      >
        {link.label}
      </Anchor>
    ))}
  </Group>
);

export default WebHeader;
