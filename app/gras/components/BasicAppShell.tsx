"use client"

import { AppShell, Burger, Grid, Group, Skeleton, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Footer from './Footer';

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
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}