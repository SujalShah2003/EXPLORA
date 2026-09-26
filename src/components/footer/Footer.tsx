import { Anchor, Box, Container, Divider, Group, Stack, Text } from '@mantine/core';
import Logo from '@/common/Logo';
import { CONTENT } from '@/constants';

const { brand, footer } = CONTENT;

const Footer = () => (
  <Box component="footer" bg="dark.9" c="gray.3" py={48}>
    <Container size="xl">
      <Group justify="space-between" align="flex-start" gap="xl">
        <Stack gap="sm" maw={500}>
          <Box><Logo inverted /></Box>
          <Text c="gray.5" size="sm" tt="capitalize">
            {footer.description}
          </Text>
        </Stack>
        <Group gap="xl">
          {footer.links.map((link) => (
            <Anchor key={link.label} c="gray.4" href={link.href}>
              {link.label}
            </Anchor>
          ))}
        </Group>
      </Group>
      <Divider color="dark.6" my="xl" />
      <Text c="gray.6" size="xs">
        © {new Date().getFullYear()} {brand.name}. {footer.rightsReserved}
      </Text>
    </Container>
  </Box>
);

export default Footer;
