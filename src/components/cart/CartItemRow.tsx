import { ActionIcon, Anchor, Box, Flex, Group, Image, Paper, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import QuantityInput from '@/common/QuantityInput';
import { CONTENT } from '@/constants';
import { useAppDispatch } from '@/store';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY, type CartItem } from '@/store/app/cart.slice.ts';
import { formatPrice } from '@utils/format.ts';

const copy = CONTENT.cart;

type CartItemRowProps = {
  item: CartItem;
};

const CartItemRow = ({ item }: CartItemRowProps) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (quantity: number) =>
    dispatch(UPDATE_CART_QUANTITY({ id: item.id, quantity }));

  return (
    <Paper withBorder radius="lg" p="md">
      <Flex direction={{ base: 'column', sm: 'row' }} align={{ sm: 'center' }} gap="md">
        <Group wrap="nowrap" gap="md" flex={1} miw={0}>
          <Box
            bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
            bdrs="md"
            p={6}
          >
            <Image src={item.thumbnail} alt={item.title} w={80} h={80} fit="contain" />
          </Box>
          <Box miw={0}>
            <Anchor
              component={Link}
              to={`${CONTENT.product.href}${item.id}`}
              c="var(--mantine-color-text)"
              fw={600}
              lineClamp={2}
              underline="never"
            >
              {item.title}
            </Anchor>
            <Text c="dimmed" fz="sm" mt={4}>
              {copy.each.replace('{price}', formatPrice(item.price))}
            </Text>
          </Box>
        </Group>

        <Group justify="space-between" wrap="nowrap" gap="lg">
          <QuantityInput value={item.quantity} onChange={handleQuantityChange} />
          <Text fw={800} fz="lg" w={110} ta="right">
            {formatPrice(item.price * item.quantity)}
          </Text>
          <ActionIcon
            variant="subtle"
            color="red"
            size="lg"
            radius="md"
            aria-label={copy.removeAriaLabel.replace('{title}', item.title)}
            onClick={() => dispatch(REMOVE_FROM_CART(item.id))}
          >
            <FiTrash2 size={18} />
          </ActionIcon>
        </Group>
      </Flex>
    </Paper>
  );
};

export default CartItemRow;
