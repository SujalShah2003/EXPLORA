import { Button, Divider, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { CONTENT } from '@/constants';
import { formatPrice } from '@utils/format.ts';

const copy = CONTENT.cart.summary;

type CartSummaryProps = {
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
};

const CartSummary = ({ count, subtotal, shipping, total, onCheckout }: CartSummaryProps) => (
  <Paper withBorder radius="lg" p="lg" pos="sticky" top={100}>
    <Title order={2} fz="lg" fw={700} mb="md">
      {copy.title}
    </Title>

    <Stack gap="sm">
      <Group justify="space-between">
        <Text c="dimmed">{copy.items}</Text>
        <Text fw={600}>{count}</Text>
      </Group>
      <Group justify="space-between">
        <Text c="dimmed">{copy.subtotal}</Text>
        <Text fw={600}>{formatPrice(subtotal)}</Text>
      </Group>
      <Group justify="space-between">
        <Text c="dimmed">{copy.shipping}</Text>
        <Text fw={600}>{formatPrice(shipping)}</Text>
      </Group>

      <Divider my="xs" />

      <Group justify="space-between">
        <Text fw={700} fz="lg">
          {copy.total}
        </Text>
        <Text fw={800} fz="xl">
          {formatPrice(total)}
        </Text>
      </Group>

      <Button size="lg" fullWidth mt="sm" leftSection={<FiLock size={18} />} onClick={onCheckout}>
        {copy.checkout}
      </Button>
      <Button
        component={Link}
        to={CONTENT.cart.empty.action.href}
        variant="subtle"
        fullWidth
        leftSection={<FiArrowLeft size={16} />}
      >
        {copy.continueShopping}
      </Button>
    </Stack>
  </Paper>
);

export default CartSummary;
