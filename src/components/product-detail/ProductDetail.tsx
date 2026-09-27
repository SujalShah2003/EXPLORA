import { lazy, Suspense } from 'react';
import {
  Anchor,
  Box,
  Breadcrumbs,
  SimpleGrid,
  Skeleton,
  Stack,
  Text
} from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import NotFound from '@/common/NotFound';
import SectionError from '@/common/SectionError';
import { CONTENT } from '@/constants';
import ProductDetailSkeleton from '@/pages/product-detail/skeleton/ProductDetailSkeleton';
import { useGetProductByIdQuery } from '@services/product.service.ts';
import { formatSlug } from '@utils/format.ts';
const ProductGallery = lazy(() => import('./ProductGallery'));
const ProductInfo = lazy(() => import('./ProductInfo'));
const ProductSpecs = lazy(() => import('./ProductSpecs'));
const ProductReviews = lazy(() => import('./ProductReviews'));

const galleryFallback = <Skeleton h={{ base: 330, md: 470 }} radius="lg" />;
const infoFallback = (
  <Stack gap="md">
    <Skeleton h={22} w={180} radius="xl" />
    <Skeleton h={34} w="85%" />
    <Skeleton h={18} w={200} />
    <Skeleton h={34} w={220} />
    <Skeleton h={70} />
    <Skeleton h={42} w={340} radius="md" />
  </Stack>
);
const panelFallback = <Skeleton h={320} radius="lg" />;

const copy = CONTENT.productDetail;

const ProductDetail = () => {
  const { id = '' } = useParams();
  const {
    currentData: product,
    isFetching,
    isError,
    error,
    refetch
  } = useGetProductByIdQuery(id);

  const status = error && 'status' in error ? error.status : undefined;
  const isNotFound = isError && (status === 404 || status === 400);
  const isLoading = isFetching && !product;

  return (
    <Box component="section">
      {isLoading && <ProductDetailSkeleton />}

      {isNotFound && (
        <NotFound
          title={copy.notFoundTitle}
          message={copy.notFoundMessage}
          primaryAction={{
            label: copy.backToProducts,
            href: copy.breadcrumbs.products.href
          }}
          secondaryAction={null}
        />
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
              underline="never"
            >
              <FiHome size={16} />
            </Anchor>
            <Anchor
              component={Link}
              to={copy.breadcrumbs.products.href}
              c="dimmed"
              underline="never"
            >
              {copy.breadcrumbs.products.label}
            </Anchor>
            <Anchor
              component={Link}
              to={`${copy.breadcrumbs.categoryHref}${encodeURIComponent(product.category)}`}
              c="dimmed"
              underline="never"
            >
              {formatSlug(product.category)}
            </Anchor>
            <Text
              fz="sm"
              c="var(--mantine-color-text)"
              lineClamp={1}
              aria-current="page"
            >
              {product.title}
            </Text>
          </Breadcrumbs>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48}>
            <Suspense fallback={galleryFallback}>
              <ProductGallery
                key={product.id}
                title={product.title}
                images={
                  product.images.length ? product.images : [product.thumbnail]
                }
              />
            </Suspense>
            <Suspense fallback={infoFallback}>
              <ProductInfo key={`info-${product.id}`} product={product} />
            </Suspense>
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt={48}>
            <Suspense fallback={panelFallback}>
              <ProductSpecs product={product} />
            </Suspense>
            <Suspense fallback={panelFallback}>
              <ProductReviews reviews={product.reviews} />
            </Suspense>
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;
