import { Anchor, Box, Container, Divider, Group, Stack, Text } from '@mantine/core';
import Logo from '@/common/Logo';

const Footer = () => (
  <Box component="footer" bg="dark.9" c="gray.3" py={48}>
    <Container size="xl">
      <Group justify="space-between" align="flex-start" gap="xl">
        <Stack gap="sm" maw={500}>
          <Box><Logo inverted /></Box>
          <Text c="gray.5" size="sm" tt="capitalize">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet tincidunt, nunc nisl aliquam nunc, eget aliquam nisl nunc eu nunc.
          </Text>
        </Stack>
        <Group gap="xl">
          <Anchor c="gray.4" href="#about">About</Anchor>
          <Anchor c="gray.4" href="#contact">Contact</Anchor>
        </Group>
      </Group>
      <Divider color="dark.6" my="xl" />
      <Text c="gray.6" size="xs">
        © {new Date().getFullYear()} LOGO. All rights reserved.
      </Text>
    </Container>
  </Box>
);

export default Footer;
