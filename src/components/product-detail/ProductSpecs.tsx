import type { ReactNode } from 'react';
import { Badge, Group, Paper, Table, Title } from '@mantine/core';
import { CONTENT } from '@/constants';
import type { ProductDetail } from '@/types/product';
import { formatDate, formatSlug } from '@utils/format.ts';

const copy = CONTENT.productDetail.specs;

type ProductSpecsProps = {
  product: ProductDetail;
};

const ProductSpecs = ({ product }: ProductSpecsProps) => {
  const { width, height, depth } = product.dimensions;

  const rows = [
    product.brand && { label: copy.brand, value: product.brand },
    { label: copy.category, value: formatSlug(product.category) },
    { label: copy.sku, value: product.sku },
    { label: copy.weight, value: copy.weightUnit.replace('{value}', String(product.weight)) },
    {
      label: copy.dimensions,
      value: copy.dimensionsUnit
        .replace('{width}', String(width))
        .replace('{height}', String(height))
        .replace('{depth}', String(depth))
    },
    { label: copy.addedOn, value: formatDate(product.meta.createdAt) },
    { label: copy.updatedOn, value: formatDate(product.meta.updatedAt) },
    {
      label: copy.tags,
      value: (
        <Group gap={6}>
          {product.tags.map(tag => (
            <Badge key={tag} variant="default" tt="none">
              {tag}
            </Badge>
          ))}
        </Group>
      )
    }
  ].filter(Boolean) as { label: string; value: ReactNode }[];

  return (
    <Paper withBorder radius="lg" p="lg">
      <Title order={2} fz="lg" fw={700} mb="md">
        {copy.title}
      </Title>
      <Table verticalSpacing="sm" withRowBorders>
        <Table.Tbody>
          {rows.map(row => (
            <Table.Tr key={row.label}>
              <Table.Th w="40%" c="dimmed" fw={500}>
                {row.label}
              </Table.Th>
              <Table.Td>{row.value}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default ProductSpecs;
