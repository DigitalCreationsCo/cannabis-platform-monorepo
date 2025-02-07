"use client"

import { AppShell, Group, Title } from '@mantine/core';
import Footer from '@gras/ui/src/components/footer';

export function BasicAppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      px="md"
    >
      <AppShell.Main mih={500}>
        <Title>Gras</Title>
        {children}</AppShell.Main>
      <AppShell.Footer pos='relative' withBorder={false}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}