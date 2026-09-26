import { Anchor, Box, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { CONTENT } from '@/constants';

const { eyebrow, title, description, viewAll } = CONTENT.home.categories;

const CategoriesHeader = () => (
  <Group justify="space-between" align="center" mb="xl" gap="md">
    <Box>
      <Text c="primary" fw={700} tt="uppercase" fz="sm" lts={1} mb={4}>
        {eyebrow}
      </Text>
      <Title order={2} fz={{ base: 26, md: 32 }} fw={800} mb={4}>
        {title}
      </Title>
      <Text c="dimmed">{description}</Text>
    </Box>
    <Anchor component={Link} to={viewAll.href} fw={600} underline="never">
      <Group gap={6} wrap="nowrap">
        {viewAll.label}
        <FiArrowRight />
      </Group>
    </Anchor>
  </Group>
);

export default CategoriesHeader;
