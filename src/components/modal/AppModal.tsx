import type { ReactNode } from 'react';
import { Modal, Stack, Text, ThemeIcon } from '@mantine/core';

type AppModalProps = {
  opened: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  size?: string | number;
};

const AppModal = ({
  opened,
  onClose,
  title,
  description,
  icon,
  children,
  size = 'sm'
}: AppModalProps) => (
  <Modal.Root opened={opened} onClose={onClose} size={size} centered radius="xl">
    <Modal.Overlay backgroundOpacity={0.45} blur={4} />
    <Modal.Content>
      <Modal.Body p="xl" pos="relative">
        <Modal.CloseButton pos="absolute" top={16} right={16} size="lg" />

        <Stack align="center" gap="xs" ta="center" pt="md">
          {icon && (
            <ThemeIcon
              variant="light"
              color="gray"
              size={80}
              radius="50%"
              bd="1px solid var(--mantine-color-default-border)"
              c="var(--mantine-color-text)"
              mb="xs"
            >
              {icon}
            </ThemeIcon>
          )}

          <Modal.Title fz={26} fw={800} lh={1.3}>
            {title}
          </Modal.Title>

          {description && (
            <Text c="dimmed" fz="md" lh={1.6} maw={360}>
              {description}
            </Text>
          )}
        </Stack>

        {children && (
          <Stack gap="sm" mt="xl">
            {children}
          </Stack>
        )}
      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
);

export default AppModal;
