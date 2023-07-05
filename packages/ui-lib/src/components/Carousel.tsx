import { useCarousel } from '@cd/core-lib/src/hooks';
import { useRef } from 'react';
import Slider, { Settings as CarouselSettings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { twMerge } from 'tailwind-merge';
import Icons from '../icons';
import { Button } from './button';
import IconWrapper from './IconWrapper';
import { H5 } from './Typography';

type CarouselComponent<DataType> = React.FC<{ data: DataType }>;

type CarouselProps<DataType> = CarouselSettings & {
  Component: CarouselComponent<DataType>;
  title?: string;
  titleSize?: 'md' | 'lg';
  data: DataType[];
  dataKey: string;
  axis?: 'horizontal' | 'vertical';
  interval?: number;
  slidesPresented: number;
  infinite?: boolean;
  run?: boolean;
};

export default function Carouse<D>({
  Component,
  title,
  titleSize = 'md',
  data,
  dataKey,
  axis = 'horizontal', // not implemented for vertical
  interval = 6000,
  slidesPresented = 1,
  variableWidth = true,
  autoplay,
  speed = 5000,
}: CarouselProps<D>) {
  const length = data.length;
  const numActive = Math.min(length, slidesPresented);
  const beforeIndices = makeIndices(data.length - 1, -1, numActive);
  const afterIndices = makeIndices(0, +1, numActive);
  const [active, setActive, handlers, style] = useCarousel(length, {
    slidesPresented: numActive,
    interval,
  });

  var settings: CarouselSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    swipeToSlide: true,
    slidesToScroll: 1,
    nextArrow: undefined,
    prevArrow: undefined,
  };

  const styles = {
    overFlowContainer: ['relative overflow-hidden'],
    // container: ['relative cursor-default max-h-20'],
    container: [''],
    title: [
      'flex pt-1 px-8 bottom-0 whitespace-nowrap justify-center',
      'cursor-default',
      'h-fit',
      titleSize === 'lg' && 'text-xl',
      titleSize === 'md' && 'text-lg',
    ],
    control: ['flex space-x-4 justify-center'],
    carousel: ['overflow-visible', 'relative', 'flex'],
    content: [
      'flex',
      axis === 'horizontal' ? 'flex-row space-x-6' : 'flex-col space-y-6',
      'overflow-visible',
      'relative',
      'min-w-full',
      'py-4', // for drop shadow
    ],
    carouselItem: ['max-w-fit carousel-item'],
    carouselButton: [
      'h-full top-0 absolute z-10 min-w-20 px-2',
      'hidden',
      'sm:block',
    ],
  };

  const sliderRef = useRef<Slider>(null);

  return (
    <div className={twMerge(styles.container)}>
      <div className={twMerge(styles.control)}>
        <CarouselButton
          direction={axis === 'horizontal' ? 'left' : 'up'}
          onClick={sliderRef?.current?.slickPrev}
        />
        <CarouselButton
          direction={axis === 'horizontal' ? 'right' : 'down'}
          onClick={sliderRef?.current?.slickNext}
        />
      </div>
      {title && <H5 className={twMerge(styles.title)}>{title}</H5>}
      <Slider ref={sliderRef} className="w-screen" {...settings}>
        {data.map((el, index) => (
          <div
            key={dataKey + '-container-' + index}
            className="max-w-fit carousel-item"
          >
            <Component key={dataKey + '-' + index} data={el} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function makeIndices(start: number, delta: number, num: number) {
  const indices: Array<number> = [];

  while (indices.length < num) {
    indices.push(start);
    start += delta;
  }

  return indices;
}

type CarouselButtonProps = {
  direction: 'left' | 'right' | 'up' | 'down';
  onClick: (() => void) | undefined;
};

const CarouselButton = ({ direction, onClick }: CarouselButtonProps) => {
  const arrowIcon = () => {
    switch (direction) {
      case 'left':
        return Icons.ChevronLeft;
      case 'right':
        return Icons.ChevronRight;
      case 'up':
        return Icons.ChevronUp;
      case 'down':
        return Icons.ChevronDown;
    }
  };

  const styles = {
    container: ['z-10 relative h-fit', 'hidden', 'md:block'],
    button: [
      'p-4',
      'h-12 w-20',
      'rounded-lg bg-inverse-soft hover:bg-accent-soft active:bg-accent',
    ],
  };

  return (
    <div className={twMerge(styles.container)}>
      <Button onClick={onClick} className={twMerge(styles.button)}>
        <IconWrapper Icon={arrowIcon()} />
      </Button>
    </div>
  );
};
