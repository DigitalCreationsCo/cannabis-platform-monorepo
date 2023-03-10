import { Button, H5 } from '@cd/shared-ui';
import { useState } from 'react';
import DispensaryCard from './DispensaryCard';

type DispensaryListProps = {
    title: string;
    list: unknown[];
};
function DispensaryListCarousel({ title, list }: DispensaryListProps) {
    const [slideIndex, setSlideindex] = useState(0);
    const decrement = () => {
        if (slideIndex > 0) setSlideindex(slideIndex - 1);
    };
    const increment = () => {
        if (slideIndex < list.length - 1) setSlideindex(slideIndex + 1);
    };

    return (
        <>
            <H5>{title}</H5>
            <div className="flex flex-row items-center">
                <a onClick={decrement} href={'#dispensary-card-' + slideIndex}>
                    <Button bg="transparent" size="sm" className="px-4" hover="transparent">
                        ❮
                    </Button>
                </a>
                <div className="w-full border carousel items-center">
                    {list.map((dispensary, index) => (
                        <div key={'dispensary-card-' + index} id={'dispensary-card-' + index} className="border w-full">
                            <DispensaryCard
                                key={'dispensary-' + dispensary.id}
                                dispensary={dispensary}
                                className="carousel-item relative"
                            />
                        </div>
                    ))}
                    {/* <div id="slide1" className="carousel-item relative w-full">
                <Image src="/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">
                        ❮
                    </a>
                    <a href="#slide2" className="btn btn-circle">
                        ❯
                    </a>
                </div>
            </div> */}
                </div>
                <a onClick={increment} href={'#dispensary-card-' + slideIndex}>
                    <Button bg="transparent" size="sm" className="px-4" hover="transparent">
                        ❯
                    </Button>
                </a>
            </div>
        </>
    );
}

export default DispensaryListCarousel;
