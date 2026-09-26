import { useState } from 'react';
import {
  Badge,
  Button,
  Divider,
  Group,
  Rating,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core';
import { FiRefreshCw, FiShield, FiShoppingCart, FiTruck } from 'react-icons/fi';
import QuantityInput from '@/common/QuantityInput';
import { CONTENT } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { ADD_TO_CART, GET_CART_QUANTITY } from '@/store/app/cart.slice.ts';
import type { ProductDetail } from '@/types/product';
import { formatPrice, formatSlug, getDiscountedPrice } from '@utils/format.ts';

const copy = CONTENT.productDetail;

type ProductInfoProps = {
  product: ProductDetail;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const dispatch = useAppDispatch();
  const inCart = useAppSelector(GET_CART_QUANTITY(product.id));
  const [quantity, setQuantity] = useState(1);

  const discount = Math.round(product.discountPercentage);
  const finalPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const outOfStock = product.stock <= 0;

  const highlights = [
    { icon: FiTruck, label: copy.highlights.shipping, value: product.shippingInformation },
    { icon: FiShield, label: copy.highlights.warranty, value: product.warrantyInformation },
    { icon: FiRefreshCw, label: copy.highlights.returns, value: product.returnPolicy }
  ];

  const handleAddToCart = () =>
    dispatch(
      ADD_TO_CART({
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: finalPrice,
        quantity
      })
    );

  return (
    <Stack gap="md">
      <Group gap="xs">
        <Badge variant="light">{formatSlug(product.category)}</Badge>
        <Badge variant="light" color={outOfStock ? 'red' : 'teal'}>
          {product.availabilityStatus}
        </Badge>
      </Group>

      <div>
        <Title order={1} fz={{ base: 26, md: 34 }} fw={800} lh={1.2}>
          {product.title}
        </Title>
        {product.brand && (
          <Text c="dimmed" mt={4}>
            {copy.brand.replace('{brand}', product.brand)}
          </Text>
        )}
      </div>

      <Group gap="xs">
        <Rating value={product.rating} fractions={4} readOnly />
        <Text fw={600}>{product.rating.toFixed(1)}</Text>
        <Text c="dimmed" fz="sm">
          {copy.reviewsCount.replace('{count}', String(product.reviews.length))}
        </Text>
      </Group>

      <Group gap="sm" align="baseline">
        <Text fz={32} fw={800} lh={1}>
          {formatPrice(finalPrice)}
        </Text>
        {discount > 0 && (
          <>
            <Text
              fz="lg"
              c="dimmed"
              td="line-through"
              aria-label={CONTENT.product.originalPriceAriaLabel}
            >
              {formatPrice(product.price)}
            </Text>
            <Badge color="red" variant="light" size="lg">
              -{discount}% {CONTENT.product.off}
            </Badge>
          </>
        )}
      </Group>

      <Text c="dimmed" lh={1.7}>
        {product.description}
      </Text>

      <Divider />

      <Group align="flex-end" gap="sm">
        <QuantityInput
          label={copy.quantity}
          value={quantity}
          onChange={setQuantity}
          max={Math.max(1, product.stock)}
          disabled={outOfStock}
        />
        <Button
          size="md"
          leftSection={<FiShoppingCart size={18} />}
          onClick={handleAddToCart}
          disabled={outOfStock}
          flex={1}
          maw={260}
        >
          {copy.addToCart}
        </Button>
      </Group>

      <Group gap="md">
        <Text fz="sm" c="dimmed">
          {copy.inStock.replace('{count}', String(product.stock))}
        </Text>
        {inCart > 0 && (
          <Text fz="sm" c="primary" fw={600}>
            {copy.inCart.replace('{count}', String(inCart))}
          </Text>
        )}
      </Group>
      {product.minimumOrderQuantity > 1 && (
        <Text fz="xs" c="dimmed">
          {copy.minimumOrder.replace('{count}', String(product.minimumOrderQuantity))}
        </Text>
      )}

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm" mt="xs">
        {highlights.map(({ icon: Icon, label, value }) => (
          <Group key={label} gap="sm" wrap="nowrap" align="flex-start">
            <ThemeIcon variant="light" size="lg" radius="md">
              <Icon size={18} />
            </ThemeIcon>
            <div>
              <Text fz="xs" c="dimmed" fw={600} tt="uppercase">
                {label}
              </Text>
              <Text fz="sm">{value}</Text>
            </div>
          </Group>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default ProductInfo;
