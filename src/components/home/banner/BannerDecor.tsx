import { Box } from '@mantine/core';

const BannerDecor = () => (
  <>
    <Box
      pos="absolute"
      top={-120}
      right={-80}
      w={360}
      h={360}
      bdrs="50%"
      bg="rgb(255 255 255 / 8%)"
      aria-hidden="true"
    />
    <Box
      pos="absolute"
      bottom={-140}
      left="35%"
      w={280}
      h={280}
      bdrs="50%"
      bg="rgb(252 179 0 / 14%)"
      aria-hidden="true"
    />
  </>
);

export default BannerDecor;
