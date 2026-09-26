import { Card, Group, Skeleton, Stack } from '@mantine/core';

const ProductCardSkeleton = () => (
  <Card withBorder radius="lg" padding="md" h="100%">
    <Card.Section>
      <Skeleton h={200} radius={0} />
    </Card.Section>
    <Group justify="space-between" mt="md">
      <Skeleton h={10} w="35%" />
      <Skeleton h={10} w="30%" />
    </Group>
    <Skeleton h={16} mt={10} />
    <Skeleton h={16} w="70%" mt={6} />
    <Skeleton h={12} mt={10} />
    <Skeleton h={12} w="85%" mt={6} />
    <Group justify="space-between" mt="lg" wrap="nowrap">
      <Stack gap={6}>
        <Skeleton h={20} w={80} />
        <Skeleton h={10} w={55} />
      </Stack>
      <Skeleton h={12} w={90} />
    </Group>
    <Group grow gap="xs" mt="md">
      <Skeleton h={36} radius="md" />
      <Skeleton h={36} radius="md" />
    </Group>
  </Card>
);

export default ProductCardSkeleton;
