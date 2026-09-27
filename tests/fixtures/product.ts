import type { ProductSummary } from '@/types/product';

export const makeProduct = (overrides: Partial<ProductSummary> = {}): ProductSummary => ({
  id: 38,
  title: 'Rice',
  description: 'Long-grain white rice.',
  category: 'groceries',
  price: 5.99,
  discountPercentage: 9.29,
  rating: 3.18,
  thumbnail: 'https://cdn.dummyjson.com/rice/thumbnail.webp',
  meta: {
    createdAt: '2025-09-30T02:05:55.814Z',
    updatedAt: '2026-08-31T22:07:29.958Z',
    barcode: '7339757397015',
    qrCode: 'https://cdn.dummyjson.com/public/qr-code.png'
  },
  ...overrides
});
