import { Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { CONTENT } from '@/constants';

const { brand } = CONTENT;

type LogoProps = {
  inverted?: boolean;
};

const Logo = ({ inverted = false }: LogoProps) => (
  <Group
    renderRoot={(props) => <Link to="/" {...props} />}
    gap="xs"
    wrap="nowrap"
    td="none"
    aria-label={brand.homeAriaLabel}
  >
    <Text fw={800} fz="xl" c={inverted ? 'white' : 'var(--mantine-color-text)'} lh={1}>
      {brand.name}
    </Text>
  </Group>
);

export default Logo;
