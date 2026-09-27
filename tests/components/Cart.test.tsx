import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Cart from '@/components/cart/Cart';
import { ADD_TO_CART, GET_CART_COUNT } from '@/store/app/cart.slice.ts';
import type { RootState } from '@/store';
import { makeStore, renderWithProviders } from '../test-utils';

const withItems = () => {
  const store = makeStore();
  store.dispatch(ADD_TO_CART({ id: 1, title: 'Rice', thumbnail: 'rice.webp', price: 5.43, quantity: 3 }));
  store.dispatch(ADD_TO_CART({ id: 2, title: 'Coffee', thumbnail: 'coffee.webp', price: 7.99 }));
  return store;
};

const count = (store: ReturnType<typeof makeStore>) =>
  GET_CART_COUNT(store.getState() as unknown as RootState);

describe('Cart page', () => {
  it('shows the empty state when there are no items', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore products' })).toHaveAttribute(
      'href',
      '/products'
    );
  });

  it('lists items and totals including $5 shipping', async () => {
    renderWithProviders(<Cart />, { store: withItems() });

    expect(await screen.findByText('Rice')).toBeInTheDocument();
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    // 3 × 5.43 + 7.99 = 24.28, + 5.00 shipping = 29.28
    expect(await screen.findByText('$24.28')).toBeInTheDocument();
    expect(screen.getByText('$29.28')).toBeInTheDocument();
  });

  it('removes a single item', async () => {
    const user = userEvent.setup();
    const store = withItems();
    renderWithProviders(<Cart />, { store });

    await user.click(await screen.findByRole('button', { name: 'Remove Coffee from cart' }));
    expect(screen.queryByText('Coffee')).not.toBeInTheDocument();
    expect(count(store)).toBe(3);
  });

  it('checks out: shows the confirmation modal and empties the cart', async () => {
    const user = userEvent.setup();
    const store = withItems();
    renderWithProviders(<Cart />, { store });

    await user.click(await screen.findByRole('button', { name: /checkout/i }));

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByText('Order placed')).toBeInTheDocument();
    expect(within(dialog).getByText(/4 items totalling \$29\.28/)).toBeInTheDocument();
    expect(count(store)).toBe(0);
  });
});
