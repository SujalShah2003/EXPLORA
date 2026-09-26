import { AppShell, Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import ScrollToTop from '@/common/ScrollToTop';
import Logo from '@/common/Logo';
import WebHeader from '@/components/header/WebHeader';
import MobileHeader from '@/components/header/MobileHeader';
import Footer from '@/components/footer/Footer';
import ToggleTheme from '@/components/toggle-theme/ToggleTheme';
import ActionButtons from '@/components/header/ActionButtons';
import CartButton from '@/components/header/CartButton';
import { CONTENT } from '@/constants';

const MasterLayout = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <ScrollToTop />
      <AppShell
        header={{ height: 76 }}
        navbar={{
          width: 300,
          breakpoint: 'md',
          collapsed: { desktop: true, mobile: !opened },
        }}
        padding={0}
      >
        <AppShell.Header
          withBorder
          bg="light-dark(rgba(255, 255, 255, 0.94), rgba(26, 27, 30, 0.94))"
        >
          <Container size="xl" h="100%">
            <Group h="100%" justify="space-between" wrap="nowrap">
              <Group flex={1}>
                <Logo />
              </Group>
              <WebHeader />
              <Group flex={1} justify="flex-end" gap="xs" wrap="nowrap">
                <Group gap="xs" visibleFrom="md" wrap="nowrap">
                  <ActionButtons />
                  <ToggleTheme />
                </Group>
                <CartButton />
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="md"
                  size="sm"
                  aria-label={CONTENT.header.toggleNavigationAriaLabel}
                />
              </Group>
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <MobileHeader close={close} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Container size="xl" py={48}>
            <Outlet />
          </Container>
          <Footer />
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default MasterLayout;
