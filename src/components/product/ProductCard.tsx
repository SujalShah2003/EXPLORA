import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Rating,
  Stack,
  Text
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { FiEye, FiShoppingCart } from 'react-icons/fi';
import { CONTENT } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { ADD_TO_CART, GET_CART_QUANTITY } from '@/store/app/cart.slice.ts';
import type { ProductSummary } from '@/types/product';
import {
  formatDate,
  formatPrice,
  formatSlug,
  getDiscountedPrice
} from '@utils/format.ts';

const { product: copy } = CONTENT;

type ProductCardProps = {
  product: ProductSummary;
  isNew?: boolean;
};

const ProductCard = ({ product, isNew = false }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(GET_CART_QUANTITY(product.id));

  const discount = Math.round(product.discountPercentage);
  const finalPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage
  );
  const detailsHref = `${copy.href}${product.id}`;

  const handleAddToCart = () =>
    dispatch(
      ADD_TO_CART({
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: finalPrice
      })
    );

  return (
    <Card withBorder radius="lg" padding="md" h="100%">
      <Card.Section
        pos="relative"
        bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          h={200}
          fit="contain"
          p="md"
          loading="lazy"
        />
        <Group
          pos="absolute"
          top={12}
          left={12}
          right={12}
          justify="space-between"
        >
          {isNew ? (
            <Badge color="accent" variant="filled" c="dark.9">
              {copy.newBadge}
            </Badge>
          ) : (
            <Box />
          )}
          {discount > 0 && (
            <Badge color="red" variant="light">
              -{discount}% {copy.off}
            </Badge>
          )}
        </Group>
      </Card.Section>

      <Group justify="space-between" mt="md" gap="xs" wrap="nowrap">
        <Text c="dimmed" fz={10} fw={500} tt="uppercase" truncate>
          {formatSlug(product.category)}
        </Text>
        <Text c="dimmed" fz="xs" style={{ whiteSpace: 'nowrap' }}>
          {copy.addedOn} {formatDate(product.meta.createdAt)}
        </Text>
      </Group>

      <Text
        c="var(--mantine-color-text)"
        fw={700}
        lineClamp={2}
        mt={4}
      >
        {product.title}
      </Text>

      <Text c="dimmed" fz="sm" lineClamp={2} mt={4}>
        {product.description}
      </Text>

      <Group
        justify="space-between"
        align="center"
        mt="auto"
        pt="md"
        gap="xs"
        wrap="nowrap"
      >
       
        <Group
          gap={6}
          wrap="nowrap"
          aria-label={copy.ratingAriaLabel.replace(
            '{rating}',
            product.rating.toFixed(1)
          )}
        >
          <Rating
            value={product.rating}
            fractions={10}
            readOnly
            size="xs"
            aria-hidden="true"
          />
          <Text fz="xs" c="dimmed" aria-hidden="true">
            {product.rating.toFixed(1)}
          </Text>
        </Group>

         <Stack gap={0} miw={0} align="flex-end">
          <Text fw={800} fz="lg" lh={1.2} truncate>
            {formatPrice(finalPrice)}
          </Text>
          {discount > 0 && (
            <Text
              fz="xs"
              c="dimmed"
              td="line-through"
              truncate
              aria-label={copy.originalPriceAriaLabel}
            >
              {formatPrice(product.price)}
            </Text>
          )}
        </Stack>
      </Group>

      <Group grow gap="xs" mt="md">
        <Button
          component={Link}
          to={detailsHref}
          variant="default"
          leftSection={<FiEye size={16} />}
        >
          {copy.viewDetails}
        </Button>
        <Button
          variant={quantity > 0 ? 'light' : 'filled'}
          leftSection={<FiShoppingCart size={16} />}
          onClick={handleAddToCart}
        >
          {quantity > 0
            ? copy.inCart.replace('{count}', String(quantity))
            : copy.addToCart}
        </Button>
      </Group>
    </Card>
  );
};

export default ProductCard;
