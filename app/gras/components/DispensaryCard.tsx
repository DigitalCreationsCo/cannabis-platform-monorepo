import React from 'react'
import { Card, BackgroundImage, Text, Badge, Button, Group, Title } from '@mantine/core';
import logo from "../public/logo.png"
import OpenBadge from './OpenBadge';
type Props = {
    dispensary: any
}

export default function DispensaryCard({dispensary}: Props) {
  return (
    <Card shadow="sm" padding="lg" radius="md" 
    h={200}
    withBorder>
        <BackgroundImage
          src={dispensary?.images?.[0]?.location || logo.src}
        />

      <Group justify="space-between" mt="md" mb="xs">
        <Title order={2}>{dispensary.name}</Title>
        <OpenBadge schedule={dispensary.schedule} />
      </Group>

      <Text size="sm" c="dimmed">
        {dispensary.address.street1}
      </Text>

      <Button color="blue" mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  )
}