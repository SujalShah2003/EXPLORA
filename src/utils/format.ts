import dayjs from 'dayjs';

export const formatDate = (date: string, template = 'DD MMM YYYY') =>
  dayjs(date).format(template);

export const formatSlug = (slug: string) =>
  slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export const formatPrice = (value: number) => priceFormatter.format(value);

export const getDiscountedPrice = (price: number, discountPercentage: number) =>
  Math.round(price * (1 - discountPercentage / 100) * 100) / 100;
