"use client"

import { AppShell, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Footer from '@gras/ui/src/components/footer';

export function BasicAppShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      // navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      px="md"
    >
      <AppShell.Header withBorder={false}>
        <Group h="100%" px="md">
          <Title>Gras</Title>
          {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
        </Group>
      </AppShell.Header>
      {/* <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar> */}
      <AppShell.Main mih={500}>{children}</AppShell.Main>
      <AppShell.Footer pos='relative' withBorder={false}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}