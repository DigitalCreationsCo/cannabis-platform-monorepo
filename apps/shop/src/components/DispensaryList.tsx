import DispensaryCard from './DispensaryCard';

function DispensaryListCarousel() {
    const organizations = [
        { name: 'Dispensary 1', id: '234' },
        { name: 'Dispensary 2', id: '345' },
        { name: 'Dispensary 3', id: '456' }
    ];
    return (
        <div className="carousel rounded-box">
            {organizations.map((dispensary, index) => (
                <div id={'slide-' + index} key={'dispensary-card' + index} className="carousel-item relative">
                    {/* <a href="#slide-{index - 1}" className="btn btn-circle">
                            ❮
                        </a> */}
                    <DispensaryCard key={'dispensary-' + dispensary.id} dispensary={dispensary} />
                    {/* <a href="#slide-{index + 1}" className="btn btn-circle">
                            ❯
                        </a> */}
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
    );
}

export default DispensaryListCarousel;
