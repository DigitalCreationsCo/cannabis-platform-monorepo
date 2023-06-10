import { Button, H5 } from '@cd/ui-lib';
import { useMemo, useState } from 'react';
import DispensaryCard from './DispensaryCard';

type DispensaryListProps = {
    title: string;
    list: { 
        name: string; 
        id: string; 
        subdomainId: string;
    }[];
};
function DispensaryListCarousel({ title, list }: DispensaryListProps) {

    const dispensaryList = useMemo(() => list, [list]);

    const [slideIndex, setSlideindex] = useState(0);
    const decrement = (e: any) => {
        e.stopPropagation();
        if (slideIndex > 0) setSlideindex(slideIndex - 1);
    };
    const increment = (e: any) => {
        e.stopPropagation();
        if (slideIndex < list.length - 1) setSlideindex(slideIndex + 1);
    };

    const styles = {
        carouselButton: 'px-6 hidden sm:block'
    };
    return (
        <>
            <H5 className="pl-4 sm:!pl-12">
                {title}
            </H5>

            <div className="flex flex-row items-center overflow-auto">
                <a onClick={decrement} href={'#dispensary-card-' + slideIndex}>
                    <Button bg="transparent" size="sm" className={styles.carouselButton} hover="transparent">
                        ❮
                    </Button>
                </a>
                <div className="carousel items-center w-full p-2 space-x-4 rounded-box carousel-center">
                    {dispensaryList.length > 0 ? 
                        dispensaryList.map((dispensary, index) => (
                        <div key={'dispensary-card-' + index} id={'dispensary-card-' + index} className="carousel-item">
                            <DispensaryCard key={'dispensary-' + dispensary.id} dispensary={dispensary as any} />
                        </div>
                    )): [0,1,2,3].map((el) => (<div key={'loading-dispensary-card-' + el} className="carousel-item">
                        <DispensaryCard key={'dispensary-' + el} loading />
                        </div>))
                    }
                </div>
                <a onClick={increment} href={'#dispensary-card-' + slideIndex}>
                    <Button bg="transparent" size="sm" className={styles.carouselButton} hover="transparent">
                        ❯
                    </Button>
                </a>
            </div>
        </>
    );
}

export default DispensaryListCarousel;
