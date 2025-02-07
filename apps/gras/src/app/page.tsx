import { Carousel, CarouselSlide } from '@mantine/carousel';
import { dispensaries } from '@/dispensaries.data';
import { DispensaryCard }from '@gras/ui/src/components/dispensary-card';
import { Group, Input, Title } from '@mantine/core';
import { Container } from '@mantine/core';
import { getPosts } from '@/lib/sanity';
import { InfoCard } from '@/components/blog';

export default async function HomePage() {
  const posts = await getPosts();
  return (
    <Container fluid px={0} pb={40} m={0}>
    <Group content='center' justify="space-between">
      <Title order={2}>{`Find 🔥 events and dispensaries near you`}</Title>
      <Input placeholder='Look up your city..' size='md' flex={.8} />
      </Group>

    <Carousel 
    py={10}
    controlSize={40}
    type="container"
    align="start"
    slideGap={{ base: 0, '300px': 'md', '500px': 'lg' }}
    slideSize={{ base: '100%', '500px': '50%', '800px': '33%', '1000px': '25%' }}
    loop>
      {dispensaries.map((d, i) => (
        <CarouselSlide key={i} title={d.siteSetting?.bannerText}>
          <DispensaryCard dispensary={d} />
          </CarouselSlide>
          ))}
    </Carousel>

    <Title order={3}>{`Read Our Blog`}</Title>
    <Carousel py={10}
    controlSize={40}
            type="container"
            align="start"
            slideGap={{ base: 0, '300px': 'md', '500px': 'lg' }}
            slideSize={{ base: '50%', '500px': '33.33%', '800px': '25%', '1000px': '20%' }}
    loop>
      {posts.map((post, i) => (
        <CarouselSlide key={i} title={post.title}>
          <InfoCard info={post} />
          </CarouselSlide>
          ))}
    </Carousel>
    </Container>
  );
}
