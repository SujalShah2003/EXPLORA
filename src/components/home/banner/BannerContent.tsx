import { Badge, Box, Text, Title } from '@mantine/core';
import { CONTENT } from '@/constants';
import BannerActions from './BannerActions';

const { banner } = CONTENT.home;

const BannerContent = () => (
  <Box>
    <Badge color="accent" variant="filled" c="dark.9" size="lg" mb="lg">
      {banner.badge}
    </Badge>

    <Title order={1} fz={{ base: 34, sm: 44, md: 52 }} lh={1.1} fw={800} mb="md">
      {banner.title.start}{' '}
      <Text component="span" inherit c="accent.4">
        {banner.title.highlight}
      </Text>
      {banner.title.end}
    </Title>

    <Text fz={{ base: 'md', md: 'lg' }} c="primary.0" maw={480} mb={32}>
      {banner.description}
    </Text>

    <BannerActions />
  </Box>
);

export default BannerContent;
