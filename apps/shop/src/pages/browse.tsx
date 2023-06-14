import { selectSelectedLocationState, selectShopState, selectUserState } from '@cd/core-lib/src/reduxDir';
import { Carousel, FlexBox, Grid, H1, H2, H3, H4, H5, Page } from '@cd/ui-lib';
import { StaticImageData } from 'next/image';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import DispensaryCardMockData from 'uat/dispensaryCardMock';
import { DispensaryCard } from '../components';
import backdrop from '/public/marijuana-backdrop.png';
export default function MarketPlace({ host }: { host: string}) {

    const { dispensaries, isLoading, isError, isSuccess } = useSelector(selectShopState)
    const selectedLocation = useSelector(selectSelectedLocationState);

    const { user } = useSelector(selectUserState)
    
    return (
        <Page gradient='pink' className="lg:px-0">
            <div className='relative cursor-default lg:px-8'>
                <H1 color="light" className='px-2 whitespace-normal'>
                    Cannabis,&nbsp;Delivered{'\xa0'}🌴</H1>
                {/* <Ticker text={'Delivery by Gras now available in Baltimore, Maryland!'} /> */}
                <H3 className='px-4 text-inverse'>
                    Good day{user.firstName && `, ${ user.firstName}`}!</H3>
            </div>
            <Grid className="space-y-5 relative">
                {/* { isError && <Center className='m-auto grow border'>
                    There's a problem loading your Gras shop. Please contact support for help.</Center>} */}
                <Carousel
                title={'Gras is now available in Baltimore, Maryland!'} 
                Component={DispensaryCard}
                loading={isLoading}
                data={DispensaryCardMockData}
                dataKey='dispensary'
                slidesPresented={3}
                />
                <Carousel 
                title={`Dispensaries Near You ( ${selectedLocation.address.city} )`} 
                Component={DispensaryCard}
                loading={isLoading}
                data={dispensaries}
                dataKey='dispensary'
                slidesPresented={3}
                interval={10000}
                />
                
            <FlexBox className="cursor-default bg-inverse shadow shadow-md shadow-lg hover:shadow-xl hover:scale-101 duration-500 p-12 rounded max-w-[559px] margin-auto place-self-center space-y-2">
                <H2 className='font-black text-gray'>
                    What is Gras?</H2>
                <H5>{`Gras is a home-grown service provider for cannabis lovers.
                    We serve the people of our communities, that enjoy cannabis, by offering a bridge of communication, clarity and support.`}</H5>
                    </FlexBox>

            </Grid>
            
            
        </Page>

    );
}

const Ticker =(props: {text: string}) => {
    const 
    [ticker, setTicker] = useState(0);

    let
    length = 600,
    speed = 10;
    // position = 0;
    // let shift = length + speed;

    const style:React.CSSProperties = {
        transition: !ticker ? `none` : `transform ${speed}s linear`,
        transform: ticker ? `translateX(-${length}px)` : `translateX(${length}px)`,
        right: `${length * ticker === 0 ? -1 : 1}px`,
    }

    function runTicker () {
        setTicker(1);
        setTimeout(() => {
            setTicker(0);
        }, 13000);
    }

    useEffect(() => {
        if (ticker === 0){
            setTimeout(() => {
                runTicker();
            }, 1000);
        }
    }, [ticker]);

    return (
        <div className={twMerge(styles.container, 'shadow, shadow-lg, rounded')}>
            <ImageBackDrop src={backdrop}>
                <div className='absolute h-full' style={ style }>
                    <H4 className='text-inverse-soft tracking-wide text-xl z-10 h-full items-center flex'>
                        { props.text }</H4>
                </div>
            </ImageBackDrop>
        </div>
    );
}

const styles = {
    container: ["border w-[340px] m-0 md:w-[600px] lg:mr-[120px] place-self-center lg:place-self-end relative h-12 overflow-hidden shadow shadow-md rounded"]
}

const ImageBackDrop = ({ src, children }: { src: string | StaticImageData } & PropsWithChildren) => {
    return (
        <div 
        className="absolute h-full w-full"
        style={{ clipPath: 'inset(0 0 0 0)' }}
        >
            <div 
            className='rounded'
                style={{
                    backgroundColor: 'rgba(12,22,5,0.38)',
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    left: '0',
                    top: '0'
                }}
            ></div>
            {children}
        </div>
    );
};