import { TextContent } from '@cd/core-lib';
import {
  FlexBox,
  Paragraph,
  GrasSignature,
  styles,
  Button,
  Page,
  H1,
  H2,
  Footer,
  Over21Button,
} from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, type ReactElement, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import env from '@/lib/env';
import { type NextPageWithLayout } from '@/lib/next.types';
import SEOMetaTags from '@/lib/SEOMetaTags';
import friendsVideo from '../public/Gras-community-clip.mp4';
import logo from '../public/logo.png';

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation('common');

  const parentRef = useRef<any>(null);
  const gridRef = useRef<any>(null);
  const [gridHeight, setGridHeight] = useState(0);

  // useEffect(() => {
  //   const updateGridHeight = () => {
  //     if (gridRef.current) {
  //       setGridHeight(gridRef.current.offsetHeight);
  //       centerGrid();
  //     }
  //   };

  //   const centerGrid = () => {
  //     if (gridRef.current && parentRef.current) {
  //       const parentWidth = parentRef.current.offsetWidth;
  //       const gridWidth = gridRef.current.scrollWidth;

  //       console.info('parentWidth: ', parentWidth)
  //       console.info('gridWidth: ', gridWidth)

  //         const marginHorizontal = (parentWidth - gridWidth) / 2;
  //         gridRef.current.style.marginLeft = `${marginHorizontal}px`;
  //         gridRef.current.style.marginRight = `${marginHorizontal}px`;
  //     }
  //   };

  //   // Update the height initially
  //   updateGridHeight();

  //   // Add an event listener to update the height on window resize
  //   window.addEventListener('resize', updateGridHeight);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', updateGridHeight);
  //   };
  // }, []);

  useEffect(() => {
    const updateGridHeight = () => {
      if (gridRef.current) {
        setGridHeight(gridRef.current.offsetHeight);
        centerGrid();
      }
    };

    const centerGrid = () => {
      if (gridRef.current && parentRef.current) {
        const parentWidth = parentRef.current.offsetWidth;
        const gridWidth = gridRef.current.scrollWidth;

        console.info('parentWidth: ', parentWidth);
        console.info('gridWidth: ', gridWidth);

        const marginHorizontal = (parentWidth - gridWidth) / 2;
        gridRef.current.style.marginLeft = `${marginHorizontal}px`;
        gridRef.current.style.marginRight = `${marginHorizontal}px`;
      }
    };

    const handleResize = () => {
      window.requestAnimationFrame(updateGridHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (parentRef.current) {
      resizeObserver.observe(parentRef.current);
    }

    // Update the height initially
    updateGridHeight();

    // Clean up the observer and event listener on component unmount
    return () => {
      if (parentRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(parentRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  const gridItem =
    'object-cover rounded-lg max-w-xs aspect-square shrink-0 min-h-full';
  return (
    <>
      <Head>
        <SEOMetaTags />
      </Head>

      <Page
        className={twMerge(
          gradient,
          'relative',
          '!pt-0 md:pt-0 px-0 lg:px-0 pb-0',
          'text-light'
          // 'overflow-hidden'
        )}
      >
        <div className={twMerge(styles.TOPBAR.topbar, 'bg-transparent')}>
          <div>
            <FlexBox className="flex-row items-center">
              <Link href={'/'} className="z-50">
                <GrasSignature className="text-inverse text-4xl pt-1 pb-0 mb-0 leading-3">
                  {t('gras')}
                </GrasSignature>
              </Link>
              <Link
                href={'/'}
                className="p-0.25 ml-4 bg-inverse w-fit rounded-full"
              >
                <Image alt="Gras" className="w-[36px] md:w-[48px]" src={logo} />
              </Link>
            </FlexBox>
            <Link href={'/'}>
              <Paragraph
                className={twMerge(styles.TOPBAR.tagline, 'text-inverse-soft')}
              >
                {TextContent.info.CANNABIS_DELIVERED_TEXT}
              </Paragraph>
            </Link>
          </div>
          <div className="flex-none">
            <ul className="flex items-center gap-2 sm:gap-4">
              <li>
                <Link href="/auth/login">
                  <Button
                    className={twMerge(
                      styles.BUTTON.highlight,
                      'hover:border-light text-light'
                    )}
                    size="sm"
                    bg="transparent"
                    hover="transparent"
                  >
                    {t('sign-in')}
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <Gallery images={[
   {
      src: require('public/events-1.png'),
      width: 400,
      height: 400,
   }]} /> */}
        <div
          ref={parentRef}
          className="hidden lg:block"
          style={{
            position: 'relative',
            width: '100%',
            height: `${gridHeight}px`,
            marginTop: '-250px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={gridRef}
            style={{
              minHeight: '100%',
              position: 'absolute',
              // top: '50%',
              // left: '50%',
              // transform: 'translate(-50%, -50%)',
              gap: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
              margin: '-40px',
            }}
            // className="grid grid-cols-5 grid-rows-3 m-auto"
          >
            {/* <div className='col-span-full row-span-1 flex flex-row'> */}
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            {/* </div> */}

            {/* <div className='col-span-full row-span-1 flex flex-row'> */}
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            <div
              className="flex flex-row w-full min-h-full grow col-span-3"
              // col-span-3 row-span-1 flex flex-row items-center min-h-full flex-shrink-0 w-full border grow
            >
              <div
                className="m-auto items-center"
                // className="min-w-[440px] z-10 m-auto lg:!m-0"
              >
                <H1 className="text-center">Welcome to Gras</H1>
                <H2 className="text-center">Serving People And Cannabis</H2>
                <Over21Button />
              </div>
              <video
                className={twMerge(
                  'flex-1 w-full opacity-25',
                  'lg:max-w-lg lg:rounded-lg lg:opacity-100',
                  'min-h-full',
                  'shadow'
                )}
                // className="w-full opacity-25 min-h-full lg:opacity-100 lg:max-w-lg shrink-0 lg:rounded-lg lg:p-0 shadow"
                style={{
                  aspectRatio: 'auto',
                  width: '100%',
                  height: '100%',
                  // zIndex: -1,
                  objectFit: 'cover',
                  objectPosition: '40% 40%',
                  left: '0',
                  top: '0',
                }}
                src={friendsVideo}
                autoPlay
                loop
                muted
              />
            </div>
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            {/* </div> */}

            {/* <div className='col-span-full row-span-1 flex flex-row'> */}
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            <Image
              src={require('public/events-1.png')}
              alt={`cannabis-events`}
              className={gridItem}
            />
            {/* </div> */}
          </div>
        </div>

        <div
          className="lg:hidden flex flex-row w-full h-[550px] min-h-full grow col-span-3"
          // col-span-3 row-span-1 flex flex-row items-center min-h-full flex-shrink-0 w-full border grow
        >
          <video
            className={twMerge(
              'absolute flex-1 w-full opacity-25',
              'lg:max-w-lg lg:rounded-lg lg:opacity-100',
              'min-h-full',
              'shadow'
            )}
            // className="w-full opacity-25 min-h-full lg:opacity-100 lg:max-w-lg shrink-0 lg:rounded-lg lg:p-0 shadow"
            style={{
              aspectRatio: 'auto',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '40% 40%',
              left: '0',
              top: '0',
            }}
            src={friendsVideo}
            autoPlay
            loop
            muted
          />
          <div
            className="z-10 m-auto items-center"
            // className="min-w-[440px] z-10 m-auto lg:!m-0"
          >
            <H1 className="text-center">Welcome to Gras</H1>
            <H2 className="text-center">Serving People And Cannabis</H2>
            <Over21Button />
          </div>
        </div>
      </Page>
    </>
  );
};

const gradient = [
  'bg-gradient-to-b',
  'from-10%',
  'from-secondary-light',
  'to-secondary',
];

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Redirect to login page if landing page is disabled
  if (env.hideLandingPage) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: true,
      },
    };
  }

  const { locale } = context;

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};

export default Home;
