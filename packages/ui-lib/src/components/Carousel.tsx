import { useCarousel } from "@cd/core-lib/src/hooks";
import { twMerge } from "tailwind-merge";
import { H5 } from "./Typography";

type CarouselComponent = {
    data: any;
}

interface CarouselProps {
    Component: React.FC<CarouselComponent>;
    loading: boolean;
    title?: string;
    data: any[];
    dataKey: string;
    axis?: 'horizontal' | 'vertical';
    interval?: number;
    slidesPresented: number;
}

function makeIndices(start: number, delta: number, num: number) {
    const indices: Array<number> = [];
  
    while (indices.length < num) {
      indices.push(start);
      start += delta;
    }
  
    return indices;
}


function Carousel({ 
    Component, 
    loading = true, 
    title, 
    data, 
    dataKey, 
    axis = "horizontal", 
    interval = 5000,
    slidesPresented = 3,
    }: CarouselProps) {

    const length = data.length;
    const numActive = Math.min(length, slidesPresented);
    const [active, setActive, handlers, style] = useCarousel(length, interval, { slidesPresented: numActive });
    const beforeIndices = makeIndices(data.length - 1, -1, numActive);
    const afterIndices = makeIndices(0, +1, numActive);

    const 
    styles = {
        carousel: [
            'overflow-hidden', 'relative',
        ],
        carouselContent: [
            'flex',
            'p-2',
            axis === 'horizontal' ? 'flex-row space-x-6' : 'flex-col space-y-6', 
            'overflow-hidden', 'w-full', 'relative'
        ]
    }
    return (
        <div 
        className='px-4 overflow-hidden'
        >
            {title && <H5>{title}</H5>}
            <div { ...handlers } style={style} className={twMerge(styles.carousel)}>
                <div className={twMerge(styles.carouselContent)} >
                { beforeIndices.map(i => 
                <div className="w-fit">
                <Component key={i} data={data[i]} /></div> )}
                { data.map((el, index) => 
                    <div key={index} className="w-fit">
                    <Component key={dataKey + index} data={el} /></div> )}
                { afterIndices.map(i => 
                <div className="w-fit">
                <Component key={i} data={data[i]} /></div> )}
                </div>
            </div>
        </div>
    );
}

export default Carousel;