import { ActionIcon, Indicator } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { CONTENT } from '@/constants';
import { useAppSelector } from '@/store';
import { GET_CART_COUNT } from '@/store/app/cart.slice.ts';

const { cart } = CONTENT.header;

const CartButton = () => {
  const count = useAppSelector(GET_CART_COUNT);

  return (
    <Indicator
      label={count > 99 ? '99+' : count}
      size={18}
      offset={4}
      color="accent"
      c="dark.9"
      fw={700}
      disabled={count === 0}
    >
      <ActionIcon
        component={Link}
        to={cart.href}
        variant="default"
        size="lg"
        radius="md"
        aria-label={cart.ariaLabel.replace('{count}', String(count))}
      >
        <FiShoppingCart size={18} />
      </ActionIcon>
    </Indicator>
  );
};

export default CartButton;
