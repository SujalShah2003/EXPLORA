import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProductCard from '@/components/product/ProductCard';
import { GET_CART_COUNT, GET_CART_ITEMS } from '@/store/app/cart.slice.ts';
import type { RootState } from '@/store';
import { makeProduct } from '../fixtures/product';
import { renderWithProviders } from '../test-utils';

vi.mock('sonner', () => ({ toast: { success: vi.fn() } }));

describe('ProductCard', () => {
  beforeEach(() => {
    vi.mocked(toast.success).mockClear();
  });

  it('shows the title, category, description and created date', () => {
    renderWithProviders(<ProductCard product={makeProduct()} />);
    expect(screen.getByText('Rice')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Long-grain white rice.')).toBeInTheDocument();
    expect(screen.getByText(/Added on 30 Sep 2025/)).toBeInTheDocument();
  });

  it('shows the discounted price, the struck-through original and the discount badge', () => {
    renderWithProviders(<ProductCard product={makeProduct()} />);
    expect(screen.getByText('$5.43')).toBeInTheDocument();
    expect(screen.getByLabelText('Original price')).toHaveTextContent('$5.99');
    expect(screen.getByText('-9% off')).toBeInTheDocument();
  });

  it('hides the original price and badge when there is no discount', () => {
    renderWithProviders(<ProductCard product={makeProduct({ discountPercentage: 0 })} />);
    expect(screen.getByText('$5.99')).toBeInTheDocument();
    expect(screen.queryByLabelText('Original price')).not.toBeInTheDocument();
  });

  it('shows the New badge only when isNew is set', () => {
    const { unmount } = renderWithProviders(<ProductCard product={makeProduct()} />);
    expect(screen.queryByText('New')).not.toBeInTheDocument();
    unmount();

    renderWithProviders(<ProductCard product={makeProduct()} isNew />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('links View details to the product page', () => {
    renderWithProviders(<ProductCard product={makeProduct()} />);
    expect(screen.getByRole('link', { name: /view details/i })).toHaveAttribute(
      'href',
      '/product/38'
    );
  });

  it('adds to the cart at the discounted price and shows a toast', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<ProductCard product={makeProduct()} />);

    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    const state = store.getState() as unknown as RootState;
    expect(GET_CART_COUNT(state)).toBe(1);
    expect(GET_CART_ITEMS(state)[0]).toMatchObject({ id: 38, price: 5.43, quantity: 1 });
    expect(toast.success).toHaveBeenCalledWith('Added to cart', {
      description: '1 × Rice'
    });
    expect(screen.getByRole('button', { name: 'In cart (1)' })).toBeInTheDocument();
  });
});
