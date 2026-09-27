import { describe, expect, it } from 'vitest';
import { formatDate, formatPrice, formatSlug, getDiscountedPrice } from '@utils/format.ts';

describe('formatSlug', () => {
  it('capitalises each dash-separated word', () => {
    expect(formatSlug('home-decoration')).toBe('Home Decoration');
    expect(formatSlug('womens-jewellery')).toBe('Womens Jewellery');
  });

  it('handles a single word', () => {
    expect(formatSlug('beauty')).toBe('Beauty');
  });
});

describe('formatPrice', () => {
  it('formats as US dollars with two decimals', () => {
    expect(formatPrice(5.43)).toBe('$5.43');
    expect(formatPrice(5)).toBe('$5.00');
  });

  it('adds thousands separators', () => {
    expect(formatPrice(28999.99)).toBe('$28,999.99');
  });
});

describe('getDiscountedPrice', () => {
  it('applies the percentage and rounds to cents', () => {
    expect(getDiscountedPrice(5.99, 9.29)).toBe(5.43);
    expect(getDiscountedPrice(9.99, 10.48)).toBe(8.94);
  });

  it('returns the original price when there is no discount', () => {
    expect(getDiscountedPrice(20, 0)).toBe(20);
  });
});

describe('formatDate', () => {
  // Midday UTC so the calendar date is the same in every timezone.
  const date = '2025-09-30T12:00:00.000Z';

  it('uses DD MMM YYYY by default', () => {
    expect(formatDate(date)).toBe('30 Sep 2025');
  });

  it('accepts a custom template', () => {
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2025-09-30');
  });
});
