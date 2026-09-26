import { Anchor, Box, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  viewAll?: { label: string; href: string };
};

const SectionHeader = ({ eyebrow, title, description, viewAll }: SectionHeaderProps) => (
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
    {viewAll && (
      <Anchor component={Link} to={viewAll.href} fw={600} underline="never">
        <Group gap={6} wrap="nowrap">
          {viewAll.label}
          <FiArrowRight />
        </Group>
      </Anchor>
    )}
  </Group>
);

export default SectionHeader;
