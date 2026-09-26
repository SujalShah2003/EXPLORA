import { Anchor, Box, Breadcrumbs, Button, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiChevronRight, FiHome } from 'react-icons/fi';
import SectionError from '@/common/SectionError';
import { CONTENT } from '@/constants';
import ProductDetailSkeleton from '@/pages/product-detail/skeleton/ProductDetailSkeleton';
import { useGetProductByIdQuery } from '@services/product.service.ts';
import { formatSlug } from '@utils/format.ts';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductSpecs from './ProductSpecs';
import ProductReviews from './ProductReviews';

const copy = CONTENT.productDetail;

const ProductDetail = () => {
  const { id = '' } = useParams();
  const { currentData: product, isFetching, isError, error, refetch } = useGetProductByIdQuery(id);

  const status = error && 'status' in error ? error.status : undefined;
  const isNotFound = isError && (status === 404 || status === 400);
  const isLoading = isFetching && !product;

  return (
    <Box component="section">
      {isLoading && <ProductDetailSkeleton />}

      {isNotFound && (
        <Stack align="center" gap="sm" py={80} ta="center">
          <Title order={1} fz={28} fw={800}>
            {copy.notFoundTitle}
          </Title>
          <Text c="dimmed" maw={420}>
            {copy.notFoundMessage}
          </Text>
          <Button
            component={Link}
            to={copy.breadcrumbs.products.href}
            variant="light"
            leftSection={<FiArrowLeft size={16} />}
            mt="sm"
          >
            {copy.backToProducts}
          </Button>
        </Stack>
      )}

      {isError && !isNotFound && !isFetching && (
        <SectionError
          title={copy.errorTitle}
          message={copy.errorMessage}
          retryLabel={copy.retry}
          onRetry={refetch}
          retrying={isFetching}
        />
      )}

      {product && (
        <>
          <Breadcrumbs
            mb="xl"
            fz="sm"
            separator={<FiChevronRight size={14} />}
            separatorMargin={6}
            c="dimmed"
          >
            <Anchor
              component={Link}
              to={copy.breadcrumbs.home.href}
              c="dimmed"
              aria-label={copy.breadcrumbs.home.label}
              display="flex"
            >
              <FiHome size={16} />
            </Anchor>
            <Anchor component={Link} to={copy.breadcrumbs.products.href} c="dimmed">
              {copy.breadcrumbs.products.label}
            </Anchor>
            <Anchor
              component={Link}
              to={`${copy.breadcrumbs.categoryHref}${encodeURIComponent(product.category)}`}
              c="dimmed"
            >
              {formatSlug(product.category)}
            </Anchor>
            <Text fz="sm" c="var(--mantine-color-text)" lineClamp={1} aria-current="page">
              {product.title}
            </Text>
          </Breadcrumbs>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48}>
            <ProductGallery
              key={product.id}
              title={product.title}
              images={product.images.length ? product.images : [product.thumbnail]}
            />
            <ProductInfo key={`info-${product.id}`} product={product} />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt={48}>
            <ProductSpecs product={product} />
            <ProductReviews reviews={product.reviews} />
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;
