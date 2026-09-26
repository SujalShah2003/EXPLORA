import { Paper, Text, ThemeIcon } from '@mantine/core';
import type { IconType } from 'react-icons';

type CategoryTileProps = {
  label: string;
  icon: IconType;
  offset?: boolean;
};

const CategoryTile = ({ label, icon: Icon, offset = false }: CategoryTileProps) => (
  <Paper
    radius="lg"
    p="lg"
    mt={offset ? 24 : 0}
    mb={offset ? 0 : 24}
    bg="rgb(255 255 255 / 10%)"
    bd="1px solid rgb(255 255 255 / 18%)"
  >
    <ThemeIcon variant="white" size={44} radius="md" mb="sm">
      <Icon size={22} />
    </ThemeIcon>
    <Text fw={700}>{label}</Text>
  </Paper>
);

export default CategoryTile;
