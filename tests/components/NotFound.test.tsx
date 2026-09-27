import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFound from '@/common/NotFound';
import { renderWithProviders } from '../test-utils';

describe('NotFound', () => {
  it('renders the default 404 content with both actions', () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /browse products/i })).toHaveAttribute(
      'href',
      '/products'
    );
  });

  it('accepts custom copy and can hide the secondary action', () => {
    renderWithProviders(
      <NotFound
        title="Product not found"
        message="Gone."
        primaryAction={{ label: 'Back to products', href: '/products' }}
        secondaryAction={null}
      />
    );
    expect(screen.getByRole('heading', { name: 'Product not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to products/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /browse products/i })).not.toBeInTheDocument();
  });
});
