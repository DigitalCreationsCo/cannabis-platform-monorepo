import { Carousel, CarouselSlide } from '@mantine/carousel';
import { dispensaries } from '@/dispensaries.data';
import { DispensaryCard }from '@gras/ui/src/components/dispensary-card';
import { Group, Input, Title } from '@mantine/core';
import { Container } from '@mantine/core';
// import { getPosts } from '@/lib/sanity';
// import { InfoCard } from '@/components/blog';

export default async function HomePage() {
  // const posts = await getPosts();
  return (
    <Container fluid p={0} m={0}>
    <Group content='center' justify="space-between">
      <Title order={2}>{`Find 🔥 events and dispensaries near you`}</Title>
      <Input placeholder='Look up your city..' size='md' flex={.8}/>
      </Group>

    <Carousel 
    py={10}
    controlSize={40}
    type="container"
    align="start"
    slideGap={{ base: 0, '300px': 'md', '500px': 'lg' }}
    slideSize={{ base: '100%', '500px': '50%', '1000px': '33.333333%' }}
    loop>
      {dispensaries.map((d, i) => (
        <CarouselSlide key={i} title={d.siteSetting?.bannerText}>
          <DispensaryCard dispensary={d} />
          </CarouselSlide>
          ))}
    </Carousel>
    
    {/* <Carousel py={10}
    controlSize={40}
            type="container"
            align="start"
            slideGap={{ base: 0, '300px': 'md', '500px': 'lg' }}
            slideSize={{ base: '100%', '300px': '50%', '1000px': '33.333333%' }}
    loop>
      {posts.map((post) => (
        <CarouselSlide title={post.title}>
          <InfoCard info={post} />
          </CarouselSlide>
          ))}
    </Carousel> */}
    </Container>
  );
}
