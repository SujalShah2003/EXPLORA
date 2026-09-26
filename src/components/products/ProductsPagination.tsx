import { Box, Flex, Group, Pagination, Select, Text } from '@mantine/core';
import { CONTENT } from '@/constants';

const copy = CONTENT.products;

type ProductsPaginationProps = {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

const ProductsPagination = ({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange
}: ProductsPaginationProps) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.min(page, totalPages);
  const from = total ? (currentPage - 1) * limit + 1 : 0;
  const to = Math.min(currentPage * limit, total);

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="space-between"
      gap="md"
      mt="xl"
    >
      <Box flex={1}>
        <Text c="dimmed" fz="sm" aria-live="polite">
          {copy.showing
            .replace('{from}', String(from))
            .replace('{to}', String(to))
            .replace('{total}', String(total))}
        </Text>
      </Box>

      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={onPageChange}
          radius="md"
          withEdges
        />
      )}

      <Group flex={1} justify="flex-end" gap="xs" wrap="nowrap">
        <Text fz="sm" c="dimmed" component="label" htmlFor="products-per-page">
          {copy.filters.limit.label}
        </Text>
        <Select
          id="products-per-page"
          data={copy.filters.limit.options}
          value={String(limit)}
          onChange={value => value && onLimitChange(Number(value))}
          allowDeselect={false}
          w={80}
          checkIconPosition="right"
          size="sm"
          radius="md"
        />
      </Group>
    </Flex>
  );
};

export default ProductsPagination;
