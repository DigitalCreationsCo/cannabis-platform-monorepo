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
    interval = 1500,
    slidesPresented = 1,
    }: CarouselProps) {

    const length = data.length;
    const numActive = Math.min(length, slidesPresented);
    const [active, setActive, handlers, style] = useCarousel(length, { slidesPresented: numActive, interval: 20000000 });
    const beforeIndices = makeIndices(data.length - 1, -1, numActive);
    const afterIndices = makeIndices(0, +1, numActive);

    const 
    styles = {
        carousel: [
            'overflow-visible', 'relative',
        ],
        carouselContent: [
            'flex', 
            'p-2',
            axis === 'horizontal' ? 'flex-row space-x-6' : 'flex-col space-y-6', 
            'overflow-visible', 'relative', 'min-w-full'
        ],
        carouselButton: [
            "h-full top-0 absolute z-10 min-w-20 px-2",
            'hidden', 'sm:block'
        ]
    }
    return (
        <div className="relative overflow-hidden">
            {title && <H5 className='px-4'>{title}</H5>}
            <div className='px-4 overflow-hidden w-full h-full relative'>
                <Button onClick={() => setActive(active > 1 ? active - 1 : active)} className={twMerge(styles.carouselButton, 'left-0')}>
                    <IconWrapper Icon={Icons.ChevronLeft}/></Button>
                <div { ...handlers } style={style} className={twMerge(styles.carousel)}>
                    <div className={twMerge(styles.carouselContent)} >
                    { beforeIndices.map(i => 
                    <div key={'before-' + i} className="max-w-fit carousel-item">
                    <Component key={dataKey + '-before-' + i} data={data[i]} /></div> )}
                    {/* <div className="w-fit border carousel-item">
                    <Component data={data[active]} /></div> */}
                    { data.map((el, index) => 
                        <div key={dataKey + '-container-' + index} className="max-w-fit carousel-item">
                        <Component key={dataKey + '-' + index} data={el} /></div> )}
                    { afterIndices.map(i => 
                    <div key={'after-' + i} className="max-w-fit carousel-item">
                    <Component key={dataKey + '-after-' + i} data={data[i]} /></div> )}
                    {/* <div className="w-fit border carousel-item">
                    <Component data={data[0]} /></div> */}
                    </div>
                </div>
                <Button onClick={() => setActive(active < data.length ? active + 1 : active)} className={twMerge(styles.carouselButton, 'right-0')}>
                    <IconWrapper Icon={Icons.ChevronRight}/></Button>
            </div>
        </div>
    );
}

export default Carousel;