import { lazy, Suspense, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Group,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  FiCheckCircle,
  FiShoppingBag,
  FiShoppingCart,
  FiTrash2
} from 'react-icons/fi';
import SectionHeader from '@/common/SectionHeader';
import { CONTENT } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  CLEAR_CART,
  GET_CART_COUNT,
  GET_CART_ITEMS,
  GET_CART_SUBTOTAL
} from '@/store/app/cart.slice.ts';
import { formatPrice } from '@utils/format.ts';

const AppModal = lazy(() => import('@/components/modal/AppModal'));
const CartItemRow = lazy(() => import('./CartItemRow'));
const CartSummary = lazy(() => import('./CartSummary'));

const copy = CONTENT.cart;

const Cart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(GET_CART_ITEMS);
  const count = useAppSelector(GET_CART_COUNT);
  const subtotal = useAppSelector(GET_CART_SUBTOTAL);
  const shipping = copy.summary.shippingCost;
  const total = Math.round((subtotal + shipping) * 100) / 100;
  const [placedOrder, setPlacedOrder] = useState<{
    count: number;
    total: number;
  } | null>(null);

  const handleCheckout = () => {
    setPlacedOrder({ count, total });
    dispatch(CLEAR_CART());
  };

  return (
    <Box component="section">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={
          items.length
            ? copy.itemCount.replace('{count}', String(count))
            : copy.description
        }
      />

      {!items.length && (
        <Stack align="center" gap="sm" py={64} ta="center">
          <ThemeIcon variant="light" size={72} radius="xl">
            <FiShoppingCart size={32} />
          </ThemeIcon>
          <Title order={2} fz="xl" fw={700} mt="sm">
            {copy.empty.title}
          </Title>
          <Text c="dimmed">{copy.empty.message}</Text>
          <Button component={Link} to={copy.empty.action.href} mt="sm">
            {copy.empty.action.label}
          </Button>
        </Stack>
      )}

      {items.length > 0 && (
        <Grid gap="xl" align="flex-start">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              <Suspense
                fallback={items.map(item => (
                  <Skeleton key={item.id} h={114} radius="lg" />
                ))}
              >
                {items.map(item => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </Suspense>
              <Group justify="flex-end">
                <Button
                  variant="subtle"
                  color="red"
                  leftSection={<FiTrash2 size={16} />}
                  onClick={() => dispatch(CLEAR_CART())}
                >
                  {copy.clear}
                </Button>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Suspense fallback={<Skeleton h={400} radius="lg" />}>
              <CartSummary
                count={count}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                onCheckout={handleCheckout}
              />
            </Suspense>
          </Grid.Col>
        </Grid>
      )}

      <Suspense fallback={null}>
        <AppModal
          opened={!!placedOrder}
          onClose={() => setPlacedOrder(null)}
          title={copy.checkoutModal.title}
          icon={<FiCheckCircle size={32} />}
          description={copy.checkoutModal.message
            .replace('{count}', String(placedOrder?.count ?? 0))
            .replace('{total}', formatPrice(placedOrder?.total ?? 0))}
        >
          <Button
            component={Link}
            to={copy.empty.action.href}
            onClick={() => setPlacedOrder(null)}
            size="lg"
            fullWidth
            leftSection={<FiShoppingBag size={18} />}
          >
            {copy.checkoutModal.close}
          </Button>
        </AppModal>
      </Suspense>
    </Box>
  );
};

export default Cart;
