import { Button, H5 } from '@cd/shared-ui';
import { useState } from 'react';
import DispensaryCard from './DispensaryCard';

type DispensaryListProps = {
    title: string;
    list: { name: string; id: string }[];
};
function DispensaryListCarousel({ title, list }: DispensaryListProps) {
    const [slideIndex, setSlideindex] = useState(0);
    const decrement = (e) => {
        e.stopPropagation();
        if (slideIndex > 0) setSlideindex(slideIndex - 1);
    };
    const increment = (e) => {
        e.stopPropagation();
        if (slideIndex < list.length - 1) setSlideindex(slideIndex + 1);
    };

    return (
        <>
            <H5 className="pl-4 sm:!pl-12">{title}</H5>

            <div className="flex flex-row items-center overflow-auto">
                <a onClick={decrement} href={'#dispensary-card-' + slideIndex}>
                    <Button bg="transparent" size="sm" className="px-4 hidden sm:block" hover="transparent">
                        ❮
                    </Button>
                </a>
                <div className="carousel items-center p-2 space-x-4 rounded-box carousel-center">
                    {list.map((dispensary, index) => (
                        <div key={'dispensary-card-' + index} id={'dispensary-card-' + index} className="carousel-item">
                            <DispensaryCard key={'dispensary-' + dispensary.id} dispensary={dispensary} />
                        </div>
                    ))}
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
