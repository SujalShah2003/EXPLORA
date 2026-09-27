import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import CartSummary from '@/components/cart/CartSummary';
import { renderWithProviders } from '../test-utils';

describe('CartSummary', () => {
  it('shows items, subtotal, shipping and total', () => {
    renderWithProviders(
      <CartSummary count={3} subtotal={16.29} shipping={5} total={21.29} onCheckout={vi.fn()} />
    );
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('$16.29')).toBeInTheDocument();
    expect(screen.getByText('$5.00')).toBeInTheDocument();
    expect(screen.getByText('$21.29')).toBeInTheDocument();
  });

  it('calls onCheckout when Checkout is clicked', async () => {
    const onCheckout = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <CartSummary count={1} subtotal={5.43} shipping={5} total={10.43} onCheckout={onCheckout} />
    );

    await user.click(screen.getByRole('button', { name: /checkout/i }));
    expect(onCheckout).toHaveBeenCalledTimes(1);
  });

  it('links Continue shopping to the products page', () => {
    renderWithProviders(
      <CartSummary count={1} subtotal={5.43} shipping={5} total={10.43} onCheckout={vi.fn()} />
    );
    expect(screen.getByRole('link', { name: /continue shopping/i })).toHaveAttribute(
      'href',
      '/products'
    );
  });
});
