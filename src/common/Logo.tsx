import { Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

type LogoProps = {
  inverted?: boolean;
};

const Logo = ({ inverted = false }: LogoProps) => (
  <Group
    renderRoot={(props) => <Link to="/" {...props} />}
    gap="xs"
    wrap="nowrap"
    td="none"
    aria-label="CoSpace home"
  >
    <Text fw={800} fz="xl" c={inverted ? 'white' : 'var(--mantine-color-text)'} lh={1}>
      LOGO
    </Text>
  </Group>
);

export default Logo;
