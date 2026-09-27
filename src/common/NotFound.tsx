import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { CONTENT } from '@/constants';

const copy = CONTENT.notFound;

type NotFoundAction = { label: string; href: string };

type NotFoundProps = {
  code?: string;
  title?: string;
  message?: string;
  primaryAction?: NotFoundAction;
  secondaryAction?: NotFoundAction | null;
};

const NotFound = ({
  code = copy.code,
  title = copy.title,
  message = copy.message,
  primaryAction = copy.primaryAction,
  secondaryAction = copy.secondaryAction
}: NotFoundProps) => (
  <Stack align="center" gap="sm" py={{ base: 48, md: 80 }} ta="center">
    <Text
      component="p"
      fz={{ base: 96, md: 140 }}
      fw={900}
      lh={1}
      variant="gradient"
      gradient={{ from: 'primary.4', to: 'primary.8', deg: 135 }}
      aria-hidden="true"
    >
      {code}
    </Text>

    <Title order={1} fz={{ base: 26, md: 32 }} fw={800} mt="sm">
      {title}
    </Title>
    <Text c="dimmed" maw={440} lh={1.6}>
      {message}
    </Text>

    <Group gap="sm" mt="lg" justify="center">
      <Button
        component={Link}
        to={primaryAction.href}
        size="md"
        leftSection={<FiArrowLeft size={16} />}
      >
        {primaryAction.label}
      </Button>
      {secondaryAction && (
        <Button
          component={Link}
          to={secondaryAction.href}
          size="md"
          variant="default"
          leftSection={<FiShoppingBag size={16} />}
        >
          {secondaryAction.label}
        </Button>
      )}
    </Group>
  </Stack>
);

export default NotFound;
