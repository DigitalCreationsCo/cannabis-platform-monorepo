// @ts-nocheck
import { Article, ImageArticle } from '@cd/data-access';
const _infoCardMockData: (Article & { image: ImageArticle })[] = [
  {
    id: '1',
    name: 'dispensaries-thrive-with-gras',
    title: `Dispensaries Thrive With Gras`,
    description: 'Connect with people who love what you do.',
    href: '12345',
    image: {
      id: '1',
      location:
        'https://greenstocknews.com/images/placeholder/cannabis/medicinal/md1.jpg',
      blurhash: '',
    },
  },
  {
    id: '2',
    name: 'offering-delivery-service',
    title: 'Fast and Safe Delivery',
    description: 'Delivered By Our Trained Professionals',
    href: '123457',
    image: {
      id: '2',
      location:
        'https://img.freepik.com/premium-photo/delivery-person-holding-parcel-with-food-delivery-against-yellow-surface_93675-111653.jpg',
      blurhash: 'LTMrO.]mvO11}9FZNer_M#odXRnj',
    },
  },
  {
    id: '3',
    title: 'Gras Is Here To Serve',
    name: 'gras-is-here',
    description: 'Sign Up For Home Delivery',
    href: '12377456',
    image: {
      id: '3',
      location:
        'https://gras-dispensary-images.us-southeast-1.linodeobjects.com/loveweed.png',
      blurhash: 'LTMrO.]mvO11}9FZNer_M#odXRnj',
    },
  },
];

export { _infoCardMockData };
