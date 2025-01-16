import { Carousel, CarouselSlide } from '@mantine/carousel';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { dispensaries } from '@/dispensaries.data';
import DispensaryCard from '@/components/DispensaryCard';
import { Group, Input, Title } from '@mantine/core';
import { Container } from '@mantine/core';

export default function HomePage() {
  return (
    <Container fluid p={0} m={0}>
    <Group content='center' justify="space-between">
      <Title order={2}>{`Find 🔥 events and dispensaries near you`}</Title>
      <Input placeholder='Look up your city..' size='md' flex={.8}/>
      </Group>

    <Carousel py={10}
    controlSize={40}
            type="container"
            align="start"
            slideGap={{ base: 0, '300px': 'md', '500px': 'lg' }}
            slideSize={{ base: '100%', '300px': '50%', '1000px': '33.333333%' }}

    loop>
      {dispensaries.map((d) => (
        <CarouselSlide>
          <DispensaryCard dispensary={d} />
          </CarouselSlide>
          ))}
    </Carousel>
    </Container>
  );
}
