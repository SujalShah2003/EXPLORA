import { Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCompass } from 'react-icons/fi';
import { CONTENT } from '@/constants';

const { primaryCta, secondaryCta } = CONTENT.home.banner;

const BannerActions = () => (
  <Group gap="sm">
    <Button
      component={Link}
      to={primaryCta.href}
      size="lg"
      variant="white"
      leftSection={<FiCompass size={18} />}
    >
      {primaryCta.label}
    </Button>
    <Button
      component={Link}
      to={secondaryCta.href}
      size="lg"
      variant="outline"
      color="white"
      rightSection={<FiArrowRight size={18} />}
    >
      {secondaryCta.label}
    </Button>
  </Group>
);

export default BannerActions;
