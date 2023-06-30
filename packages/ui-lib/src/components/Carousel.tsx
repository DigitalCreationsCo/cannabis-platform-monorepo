import { useCarousel } from "@cd/core-lib/src/hooks";
import { twMerge } from "tailwind-merge";
import Icons from "../icons";
import { Button } from "./button";
import IconWrapper from "./IconWrapper";
import { H5 } from "./Typography";

type CarouselComponent = {
    data: any;
}

interface CarouselProps {
    Component: React.FC<CarouselComponent>;
    title?: string;
    titleSize?: 'md' | 'lg';
    data: any[];
    dataKey: string;
    axis?: 'horizontal' | 'vertical';
    interval?: number;
    slidesPresented: number;
    infinite?: boolean;
    run?: boolean;
}

export default function Carousel({ 
    Component, 
    title, 
    titleSize = 'md',
    data, 
    dataKey, 
    axis = "horizontal", // not implemented for vertical
    interval = 6000,
    slidesPresented = 1,
    }: CarouselProps) {

    const length = data.length;
    const numActive = Math.min(length, slidesPresented);
    const beforeIndices = makeIndices(data.length - 1, -1, numActive);
    const afterIndices = makeIndices(0, +1, numActive);
    const [active, setActive, handlers, style] = useCarousel(length, { slidesPresented: numActive, interval });

    const 
    styles = {
        overFlowContainer: ['relative overflow-hidden'],
        container: ['relative cursor-default max-h-20'],
        title: [
            'flex pt-1 px-8 bottom-0 whitespace-nowrap justify-center',
            'cursor-default',
            'h-fit',
            titleSize === 'lg' && 'text-xl',
            titleSize === 'md' && 'text-lg'
        ],
        control: [
            'flex space-x-4 justify-center',
        ],
        carousel: [
            'overflow-visible', 'relative', 'flex',
        ],
        content: [
            'flex', 
            axis === 'horizontal' ? 'flex-row space-x-6' : 'flex-col space-y-6', 
            'overflow-visible', 'relative', 'min-w-full',
            'py-4', // for drop shadow
        ],
        carouselItem: [
            "max-w-fit carousel-item"
        ],
        carouselButton: [
            "h-full top-0 absolute z-10 min-w-20 px-2",
            'hidden', 'sm:block'
        ]
    }
    return (
        <div className={twMerge(styles.overFlowContainer)}>

            <div className={twMerge(styles.container)}>
                <div className={twMerge(styles.control)}>
                    <CarouselButton 
                    direction={axis === 'horizontal' ? 'left' : 'up'} 
                    onClick={() => setActive(active > 1 ? active - 1 : active)}
                    />
                    <CarouselButton 
                    direction={axis === 'horizontal' ? 'right' : 'down'}
                    onClick={() => setActive(active < data.length ? active + 1 : active)} 
                    />
                </div>       
                {title && 
                <H5 className={twMerge(styles.title)}>
                    {title}</H5>}
            </div>         
                
            <div className={twMerge(styles.carousel)}
            { ...handlers } style={style}>

                <div className={twMerge(styles.content)}>
                    
                { beforeIndices.map(i => 
                <div key={'before-' + i} className="max-w-fit carousel-item">
                <Component key={dataKey + '-before-' + i} data={data[i]} /></div> )}
                {/* <div className="w-fit border carousel-item">
                <Component data={data[active]} /></div> */}

                { data.map((el, index) => <div key={dataKey + '-container-' + index} className="max-w-fit carousel-item">
                    <Component key={dataKey + '-' + index} data={el} /></div>
                )}
                    
                { afterIndices.map(i => 
                <div key={'after-' + i} className="max-w-fit carousel-item">
                <Component key={dataKey + '-after-' + i} data={data[i]} /></div> )}
                {/* <div className="w-fit border carousel-item">
                <Component data={data[0]} /></div> */}

                </div>
            </div>
        </div>
    );
}

function makeIndices(start: number, delta: number, num: number) {
    
    const 
    indices: Array<number> = [];
  
    while (indices.length < num) {
      indices.push(start);
      start += delta;
    }
  
    return indices;
}

type CarouselButtonProps = {
    direction: 'left' | 'right' | 'up' | 'down';
    onClick: () => void;
}

const CarouselButton = ({ 
    direction, 
    onClick
 }: CarouselButtonProps ) => {

    const
    arrowIcon = () => {
        switch(direction) {
        case 'left': 
        return Icons.ChevronLeft;
        case 'right': return Icons.ChevronRight;
        case 'up': return Icons.ChevronUp;
        case 'down': return Icons.ChevronDown;
        }
    };
    
    const 
    styles = {
        container: [
            'z-10 relative h-fit',
            'hidden', 'md:block'
        ],
        button: [
            "p-4",
            "h-12 w-20",
            'rounded-lg bg-inverse-soft hover:bg-accent-soft active:bg-accent'
        ],
    };

    return (
        <div className={twMerge(styles.container)}>
            <Button onClick={onClick}
            className={twMerge(styles.button)}>
                <IconWrapper Icon={arrowIcon()}/>
            </Button>
        </div>
     );
};