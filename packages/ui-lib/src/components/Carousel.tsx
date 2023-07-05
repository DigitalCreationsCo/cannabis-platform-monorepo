import { useRef } from 'react';
import Slider, { Settings as CarouselSettings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { twMerge } from 'tailwind-merge';
import Icons from '../icons';
import { Button } from './button';
import IconWrapper from './IconWrapper';
import { H5 } from './Typography';

// TO DO: make responsive showSlides, slidesPresented, and variableWidth
// clean up interface


type CarouselComponent<DataType> = React.FC<{ data: DataType }>;

type CarouselProps<DataType> = CarouselSettings & {
  Component: CarouselComponent<DataType>;
  title?: string;
  titleSize?: 'md' | 'lg';
  data: DataType[];
  dataKey: string;
  interval?: number;
  infinite?: boolean;
  run?: boolean;
};

export default function Carouse<D>({
  Component,
  title,
  titleSize = 'md',
  data,
  dataKey,
  ...props
}: CarouselProps<D>) {
    
  const length = data.length;
  const slidesToShow = Math.min(length, 4);

  var settings: CarouselSettings = {
    ...props,
    lazyLoad: 'anticipated',
    arrows: false,
    infinite: true,
    edgeFriction: 100,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: props.autoplaySpeed || 5000,
    rows: 1,
    cssEase: 'ease-out',
    slidesToShow,
    swipeToSlide: true,
    slidesToScroll: 1,
    adaptiveHeight: true,
    speed: 500,
    responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
  };

  const styles = {
    container: ['lg:px-12 max-h-fit overflow-hidden'],
    title: [
      'flex pt-1 px-8 bottom-0 whitespace-nowrap justify-center',
      'cursor-default',
      'h-fit',
      titleSize === 'lg' && 'text-xl',
      titleSize === 'md' && 'text-lg',
    ],
    control: ['flex space-x-4 justify-center'],
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
          direction={settings.vertical ? 'up' : 'left'}
          onClick={sliderRef?.current?.slickPrev}
        />
        <CarouselButton
          direction={settings.vertical ? 'down' : 'right'}
          onClick={sliderRef?.current?.slickNext}
        />
      </div>

      {title && <H5 className={twMerge(styles.title)}>
        {title}</H5>}
        
      <Slider ref={sliderRef} className="w-screen" {...settings}>
        {data.map((el, index) => (
          <div
            key={dataKey + '-container-' + index}
            className="max-w-fit carousel-item m-2"
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
      'h-10 w-20',
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
