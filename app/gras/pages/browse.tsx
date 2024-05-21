/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable i18next/no-literal-string */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/no-unknown-property */
import {
  getCoordinatePairFromCoordinates,
  isValidZipcode,
  // selectBlogsByTag,
  modalActions,
  modalTypes,
  // selectBlogState,
  // selectLocationState,
  // selectMarketPlaceDispensaries,
  // selectSelectedLocationState,
  // selectShopState,
  // selectUserState,
  TextContent,
  useEvents,
  useLocalDispensaries,
  // debounce,
} from '@cd/core-lib';
import {
  type Coordinates,
  dispensaries,
  productCategories,
  Dispensary,
} from '@cd/data-access';
import {
  Grid,
  H1,
  Page,
  H4,
  Footer,
  Carousel,
  H5,
  H2,
  H3,
  Header,
} from '@cd/ui-lib';
import mapboxgl, { type MapboxGeoJSONFeature } from 'mapbox-gl';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import markerImage from '../public/map-marker.png';
import { DispensaryCard } from '@/components/shared';
import {
  Post,
  Settings,
  getClient,
  getPosts,
  getSettings,
  readToken,
} from '@/lib/sanity';
import { InfoCard } from '@/components/blog';
import Image from 'next/image';
import { Error } from '@/components/shared';

// import { shopTour } from '../../tour';
// eslint-disable-next-line no-var
// /organization/zipcode=${zipcode}&limit=${limit}&radius=${radius}

import {
  getFacebookLoginStatus,
  initFacebookSdk,
  fbLogin,
} from '@cd/core-lib/src/lib/facebookIG';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import app from '@/lib/app';
import Head from 'next/head';
import env from '@/lib/env';
import { TopBar } from '@/components/layouts';
import EventCard from '@/components/shared/EventCard';

function FBInit() {
  useEffect(() => {
    console.log('Started use effect');
    initFacebookSdk().then(() => {
      getFacebookLoginStatus().then((response) => {
        if (response == null) {
          console.log('No login status for the person');
        } else {
          console.log(response);
        }
      });
    });
  }, []);

  function login() {
    console.log('reached log in button');
    fbLogin().then((response) => {
      console.log(response);
      if ((response as any).status === 'connected') {
        console.log('Person is connected');
      } else {
        // something
      }
    });
  }

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}

//IMPLEMENT GET STATIC PATHS > BLOG
export default function Browse({
  token,
  posts,
}: {
  token: string;
  posts: Post[];
  settings: Settings;
}) {
  const saveZipcodeToLocalStorage = (zipcode: string): void => {
    if (isValidZipcode(zipcode)) {
      localStorage.setItem('zipcode', zipcode.toString());
    }
    setZipcode(zipcode);
  };

  const getZipcodeLocalStorage = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zipcode') || null;
    }
    return null;
  };
  const radius = 11000;
  const [zipcode, setZipcode] = useState(getZipcodeLocalStorage() || '10011');
  const [zipcodeError, setZipcodeError] = useState('');

  const { isLoading, isError, dispensaries } = useLocalDispensaries({
    zipcode,
    radius,
    token,
  });
  const events = useEvents({ token });

  // function startShopTour() {
  // 	shopTour.start();
  // }

  // useEffect(() => {
  // 	if (!user.isSignUpComplete) startShopTour();
  // }, [user.isSignUpComplete]);

  const styles = {
    responsiveHeading: [
      'text-2xl pb-0 lg:px-5 whitespace-normal font-semibold',
    ],
  };
  const [current, setCurrent] = useState(0);

  function openStoreFrontModal() {
    // dispatch(
    //   modalActions.openModal({
    //     modalType: modalTypes.StoreFrontModal,
    //     organization: dispensaries[current],
    //   })
    // );
  }

  if (isError) {
    return <Error message={isError.message} />;
  }
  return (
    <>
      <Head>
        <NextSeo
          title={app.name}
          description={app.description}
          openGraph={{
            url: app.url,
            title: app.opengraph.title,
            type: 'website',
            description: app.description,
            images: [
              {
                url: app.opengraph.image,
                alt: app.opengraph.title,
                width: 300,
              },
            ],
            site_name: app.name,
          }}
          twitter={{
            cardType: 'summary_large_image',
            site: app.url,
            handle: '@grascannabis',
          }}
        />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></script>
      </Head>

      <Page
        gradient="green"
        className="!pt-0 md:pt-0 px-0 lg:px-0 pb-0 min-h-[440px]"
      >
        <div>
          <TopBar SearchComponent={<></>} />
          {/* <Header/> */}
        </div>

        {/* <Script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></Script>
            
  <>
  {( typeof window !== 'undefined' && (window.fbAsyncInit = function() {
    FB.init({
      appId            : '311994885263192',
      xfbml            : true,
      version          : 'v19.0'
    })
  }))}
  {( typeof window !== 'undefined' && 
    FB.login(function(response) {
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
  })
  )}
  </> */}

        <Grid className="relative grid-cols-3 pb-16">
          {/* <div
            id={'shop-tour-step1'}
            className="row-start-1 cursor-default pt-5 px-5 col-start-1 col-span-full lg:col-span-2"
          > */}
          {/* <H2
            className={twMerge(
              styles.responsiveHeading,
              'text-inverse-soft drop-shadow'
            )}
          >
            {TextContent.info.CANNABIS_DELIVERED}
          </H2>
          <FBInit /> */}
          {/* </div> */}
          <div className="col-span-full pb-2">
            <H1 className="text-inverse-soft pt-2 px-4 leading-2 drop-shadow text-left">
              {`Find flower, edibles, dispensaries near you`}
            </H1>
            <Carousel
              items={
                !isLoading && dispensaries.length
                  ? dispensaries?.map((d, index) => (
                      <DispensaryCard
                        loading={isLoading}
                        key={`dispensary-card-${index}`}
                        data={d}
                      />
                    ))
                  : [1, 2, 3, 4, 5, 6].map((d, index) => (
                      <DispensaryCard
                        loading={isLoading}
                        key={`dispensary-card-${index}`}
                        data={d as unknown as Required<Dispensary>}
                      />
                    ))
              }
            />
          </div>

          {/* <div className='col-span-full flex flex-col gap-1'>
          <H3 className="px-4 pt-2 text-inverse-soft leading-2 drop-shadow text-left">
            🎁 Get What You Want
          </H3>
          <div className="col-span-full grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
            {productCategories.map((c, index) => (
              <div key={`category-card-${index}`} className="min-w-28">
                <div className="h-16 w-16 bg-secondary rounded-full p-3 mx-auto hover:border">
                  <Image src={c.icon || ''} alt={c.title} layout="fill" />
                </div>
                <H5 className="text-center">{c.title}</H5>
              </div>
            ))}
            </div>
        </div> */}

          {/* <div className="col-span-full">
          <H3 className="col-span-full px-7 pt-2 lg:!px-11 text-inverse-soft leading-2 drop-shadow text-left">
            Recent Dispensaries
          </H3>
          <Carousel
            items={
              !isLoading
                ? dispensaries?.map((d, index) => (
                    <DispensaryCard
                      loading={isLoading}
                      key={`dispensary-card-${index}`}
                      data={d}
                    />
                  ))
                : [1, 2, 3, 4, 5, 6].map((d, index) => (
                    <DispensaryCard
                      loading={isLoading}
                      key={`dispensary-card-${index}`}
                      data={d as any}
                    />
                  ))
            }
          />
        </div> */}

          {/* <div className="col-span-full">
          <H3 className="col-span-full px-7 pt-2 lg:!px-11 text-inverse-soft leading-2 drop-shadow text-left">
            New Arrivals
          </H3>
          <Carousel
            items={posts.map((post, index) => (
              <InfoCard
                loading={isLoading}
                key={`blog-card-${index}`}
                data={post}
                showDescription={false}
              />
            ))}
          />
        </div> */}

          <div className="col-span-full">
            <H2 className="col-span-full pt-2 px-3 md:px-4 text-inverse-soft leading-2 drop-shadow text-left">
              🎉 Events Near You
            </H2>
            <Carousel
              items={
                !events.isLoading && events.events.length
                  ? events.events.map((event, index) => (
                      <EventCard
                        key={`event-card-${index}`}
                        loading={events.isLoading}
                        event={event}
                      />
                    ))
                  : [1, 2, 3, 4, 5, 6].map((d, index) => (
                      <EventCard
                        key={`event-card-${index}`}
                        loading={events.isLoading}
                        event={d as any}
                      />
                    ))
              }
            />
          </div>

          <div className="col-span-full">
            <H2 className="col-span-full pt-2 px-2 md:px-4 text-inverse-soft leading-2 drop-shadow text-left">
              🍍 Fresh from our blog
            </H2>
            <Carousel
              title="Fresh from the Blog"
              items={posts.map((post, index) => (
                <InfoCard
                  loading={isLoading}
                  key={`blog-card-${index}`}
                  data={post}
                  showDescription={false}
                />
              ))}
            />
          </div>

          {/* <div className="col-span-full px-24">
          <H3 className="col-span-full px-7 pt-2 lg:!px-11 text-inverse-soft leading-2 drop-shadow text-left">
            🎨 Celebrate Artists
          </H3>
          <Carousel
            items={posts.map((post, index) => (
              <InfoCard
                loading={isLoading}
                key={`blog-card-${index}`}
                data={post}
                showDescription={false}
              />
            ))}
          />
        </div> */}

          {/* <div className="col-span-full px-24">
          <H3 className="col-span-full px-7 pt-2 lg:!px-11 text-inverse-soft leading-2 drop-shadow text-left">
            Read Reviews
          </H3>
          <Carousel
            items={posts.map((post, index) => (
              <InfoCard
                loading={isLoading}
                key={`blog-card-${index}`}
                data={post}
                showDescription={false}
              />
            ))}
          />
        </div> */}

          {/* <div className="row-start-2 sm:col-start-2 col-span-full sm:col-span-1 lg:col-start-3 lg:row-start-1 px-4 py-2">
					<TextField
						className="text-dark"
						type="number"
						name="zipcode"
						maxLength={5}
						label="search your zipcode"
						value={zipcode}
						onBlur={undefined}
						onChange={(e: any) =>
							// eslint-disable-next-line sonarjs/no-use-of-empty-return-value
							debounce(saveZipcodeToLocalStorage(e.target.value), 2000)
						}
						error={!!zipcodeError}
						helperText={zipcodeError}
					/>
				</div> */}

          {/* <div className="p-4 row-start-3 lg:row-start-2 col-span-3 lg:col-span-1 space-y-4">
					<RenderMapBox
						data={dispensaries}
						current={current}
						setCurrent={setCurrent}
					/>
				</div> */}
        </Grid>

        {/* || <Center>
                    <H6 color='light' className='whitespace-pre-line'>
                        Want to see your favorite Dispensary?{'\n'}
                        Ask them to start a Gras account!</H6>
                    <Link className='mx-auto' 
                    href="/find-my-dispensary">
                        <H6 className="underline text-lg text-center">
                            {TextContent.prompt.FIND_DISPENSARY}</H6>
                    </Link>
                </Center>
                } */}

        {/* <FlexBox className="cursor-default bg-inverse shadow shadow-md shadow-lg hover:shadow-xl hover:scale-101 duration-500 p-12 rounded max-w-[559px] margin-auto place-self-center space-y-2">
                <H2 className='font-black text-gray'>
                    What is Gras?</H2>
                <H5>{`Gras is a home-grown service provider for cannabis lovers.
                    We serve the people of our communities, that enjoy cannabis, by offering a bridge of communication, clarity and support.`}</H5>
                    </FlexBox> */}
        {/* </Grid> */}

        <Footer className="bg-transparent bg-gradient-to-b from-transparent to-secondary" />
      </Page>
    </>
  );
}

// const RenderGoogleMap = () => {
// 	return (
// 		<iframe
// 			title="embed-map"
// 			className="w-full"
// 			height="250"
// 			width="250"
// 			style={{ border: 0 }}
// 			loading="eager"
// 			allowFullScreen
// 			referrerPolicy="no-referrer-when-downgrade"
// 			src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_EMBED_API_KEY}&q=New+York,NY&zoom=14`}
// 		></iframe>
// 	);
// };

const RenderMapBox = ({
  data,
  current,
  setCurrent,
}: {
  data: any[];
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}) => {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    // eslint-disable-next-line import/no-named-as-default-member
    map.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 11.5,
      center: [-74.006, 40.72],
      attributionControl: false,
      // center: [lng, lat],
      // zoom: zoom,
    });
  }, []);

  useEffect(() => {
    function addMarkersToMapBox(geojson: any) {
      // add markers to map
      if (!map.current || !geojson) return;
      for (const feature of geojson.features) {
        const index = geojson.features.indexOf(feature);
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        // el.textContent = feature.properties.title;
        el.style.backgroundImage = `url(${feature.properties.image})`;
        el.style.width = `15px`;
        el.style.height = `19px`;
        el.style.padding = '2px';
        el.style.backgroundSize = '100%';
        el.style.cursor = 'pointer';
        // rotate the image 20 degrees
        el.style.transform = 'rotate(20deg)';

        // create a box that points to the location
        // const pointer = document.createElement('div');
        // pointer.className = 'pointer';
        // el.appendChild(pointer);
        // pointer.style.width = '20px';
        // pointer.style.height = '20px';
        // pointer.style.borderLeft = '10px solid transparent';
        // pointer.style.borderRight = '10px solid transparent';
        // pointer.style.borderTop = '10px solid #13622a';
        // pointer.style.position = 'absolute';
        // pointer.style.bottom = '-2px';

        // el.className = 'marker';
        // el.style.backgroundImage = `url(${feature.properties.image})`; // Set background image
        // el.style.backgroundColor = '#fff'; // Set background color (change #fff to any color you desire)
        // el.style.display = 'inline-block';
        // el.style.width = `30px`;
        // el.style.height = `30px`;
        // el.style.border = '1px solid #13622a';
        // el.style.borderWidth = '2px';
        // el.style.borderRadius = '50%';
        // // el.textContent = feature.properties.message;
        // el.style.backgroundSize = 'cover'; // Set background size to cover
        el.style.backgroundPosition = 'bottom'; // Set background position to center
        // el.style.cursor = 'pointer';

        // Create a container for SVG
        // const svgContainer = document.createElement('div');
        // svgContainer.style.cursor = 'pointer';
        // svgContainer.className = 'marker';
        // svgContainer.style.width = '50px';
        // svgContainer.style.height = '50px';
        // svgContainer.style.position = 'relative';

        // // Create SVG element
        // const svg = document.createElementNS(
        // 	'http://www.w3.org/2000/svg',
        // 	'svg',
        // );
        // svg.style.overflow = 'hidden';
        // svg.setAttribute('viewBox', '4.8878 5.6099 130 130');
        // svg.setAttribute('width', '62.092');
        // svg.setAttribute('height', '73.517');

        // // Create ellipse element
        // const ellipse = document.createElementNS(
        // 	'http://www.w3.org/2000/svg',
        // 	'ellipse',
        // );
        // ellipse.setAttribute('cx', '93.602');
        // ellipse.setAttribute('cy', '66.515');
        // ellipse.setAttribute('rx', '30.351');
        // ellipse.setAttribute('ry', '30.351');
        // ellipse.setAttribute(
        // 	'style',
        // 	'stroke: #13622a; stroke-width: 6px; fill: #fff;',
        // );

        // // Create path elements
        // const path1 = document.createElementNS(
        // 	'http://www.w3.org/2000/svg',
        // 	'path',
        // );
        // path1.setAttribute(
        // 	'd',
        // 	'M 93.228 108.65 C 94.776 110.522 67.77 96.027 62.825 74.35',
        // );
        // path1.setAttribute('style', 'stroke: #13622a; fill: #13622a');

        // const path2 = document.createElementNS(
        // 	'http://www.w3.org/2000/svg',
        // 	'path',
        // );
        // path2.setAttribute(
        // 	'd',
        // 	'M 63.209 72.998 C 74.003 110.29 122.582 104.207 124.91 70.755 C 125.06 72.201 123.067 92.899 92.689 109.681',
        // );
        // path2.setAttribute('style', 'stroke: #13622a; fill: #13622a');

        // // Create image element
        // const image = document.createElementNS(
        // 	'http://www.w3.org/2000/svg',
        // 	'image',
        // );
        // image.setAttributeNS(
        // 	'http://www.w3.org/1999/xlink',
        // 	'href',
        // 	feature.properties.image,
        // ); // Set image source
        // image.setAttribute('width', '60'); // Adjust image size as needed
        // image.setAttribute('height', '60'); // Adjust image size as needed
        // image.setAttribute('x', '64'); // Adjust x and y position to center the image within the white section of the path
        // image.setAttribute('y', '36'); // Adjust x and y position to center the image within the white section of the path

        // // Append ellipse and paths to SVG
        // svg.appendChild(ellipse);
        // svg.appendChild(path1);
        // svg.appendChild(path2);
        // // Append image to SVG
        // svg.appendChild(image);

        // // // Append SVG to container div
        // svgContainer.appendChild(svg);

        // 				const svgContainer = document.createElement('div');
        // 				svgContainer.className = 'marker';
        // svgContainer.style.width = '50px';
        // svgContainer.style.height = '50px';
        // svgContainer.style.position = 'relative';

        // // Create SVG element
        // const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        // svg.setAttribute('width', '100%');
        // svg.setAttribute('height', '100%');
        // svg.setAttribute('viewBox', '0 0 50 50'); // Adjust viewBox based on marker dimensions

        // // Create path for the marker shape
        // const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        // path.setAttribute('d', 'M25 0C34 0 41.3 2.7 46.9 8.1 51.8 13.9 54.8 21.9 54.8 31.2c0 6.5-2.7 12.3-7.1 17.1-3.7 4.2-8.7 7.7-14.2 10.6-5.5-2.9-10.5-6.4-14.2-10.6-4.4-4.8-7.1-10.6-7.1-17.1 0-9.3 3-17.3 8.1-23.1C8.7 2.7 16 0 25 0zM25 7.8c-6.7 0-12.1 5.4-12.1 12.1 0 5.4 7.7 12.9 12.1 17 4.4-4.1 12.1-11.6 12.1-17C37.1 13.2 31.7 7.8 25 7.8z'); // Define the path for the marker shape
        // path.setAttribute('fill', '#fff'); // Set background color (change #fff to desired color)
        // path.setAttribute('stroke', '#000'); // Set border color
        // path.setAttribute('stroke-width', '1px'); // Set border width

        // // Append path to SVG
        // svg.appendChild(path);

        // // Create image element
        // const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        // image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', feature.properties.image); // Set image source
        // image.setAttribute('width', '30'); // Adjust image size as needed
        // image.setAttribute('height', '30'); // Adjust image size as needed
        // image.setAttribute('x', '10'); // Adjust x and y position to center the image within the white section of the path
        // image.setAttribute('y', '10'); // Adjust x and y position to center the image within the white section of the path

        // // Append image to SVG
        // svg.appendChild(image);

        // // Append SVG to container
        // svgContainer.appendChild(svg);

        el.addEventListener('click', () => {
          setCurrent(index);
        });

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .addTo(map.current);

        // add marker to a layer
        // map.current?.addLayer({
        // 	id: `marker-${index}`,
        // 	type: 'symbol',
        // 	source: {
        // 		type: 'geojson',
        // 		data: {
        // 			type: 'FeatureCollection',
        // 			features: [feature],
        // 		},
        // 	},
        // 	maxzoom: 15,
        // 	minzoom: 10,
        // 	layout: {
        // 		'icon-image': 'marker',
        // 		'icon-size': 0.25,
        // 	},
        // });
      }
    }
    if (data.length > 0 && map.current?.isStyleLoaded) {
      addMarkersToMapBox(generateGEOJSONDataFromDispensaries(data));
    }
  }, [data]);

  useEffect(() => {
    // fly to current on map load
    if (data.length > 0 && map.current?.isStyleLoaded) {
      const { address } = data[current];
      const [lng, lat] = getCoordinatePairFromCoordinates(
        address.coordinates as Coordinates
      );
      map.current?.flyTo({
        center: [lng, lat],
        zoom: 11,
        speed: 2,
        animate: true,
      });
    }
  }, [map.current]);

  useEffect(() => {
    // fly to the selected location
    if (data.length > 0 && map.current?.isStyleLoaded) {
      const { address } = data[current];
      const [lng, lat] = getCoordinatePairFromCoordinates(
        address.coordinates as Coordinates
      );
      map.current?.flyTo({
        center: [lng, lat],
        speed: 2,
        animate: true,
      });
    }
  }, [current]);

  function generateGEOJSONDataFromDispensaries(data: any[]) {
    return {
      type: 'FeatureCollection',
      features: data.map((dispensary) => {
        const { address, name } = dispensary;
        const [lng, lat] = getCoordinatePairFromCoordinates(
          address.coordinates as Coordinates
        );
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          properties: {
            title: name,
            message: name,
            // image: dispensary.images[0].location || Logo.src,
            image: markerImage.src,
          },
        };
      }),
    };
  }
  return (
    <>
      <div
        id="map"
        ref={mapContainer}
        className="rounded overflow-hidden shadow"
        style={{ width: '100%', height: '220px', float: 'right' }}
      >
        <style global jsx>{`
          .mapbox-logo {
            display: none;
          }
          .mapboxgl-ctrl-logo {
            display: none !important;
          }
          .mapbox-improve-map {
            display: none;
          }
          .mapboxgl-ctrl-compass {
            display: none;
          }
        `}</style>
      </div>
    </>
  );
};

// export const getStaticProps: GetStaticProps = async (
// 	ctx,
// ) => {
// 	const { draftMode = false } = ctx;
// 	const client = getClient(draftMode ? { token: readToken } : undefined);

// 	const [settings, posts = []] = await Promise.all([
// 		getSettings(client),
// 		getPosts(client),
// 	]);

//   console.info('GSP posts from sanity', posts);
// 	return {
// 		props: {
// 			posts,
// 			settings,
// 			draftMode,
// 			token: draftMode ? readToken : '',
// 		},
// 	};
// };

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authToken = env.nextAuth.secret;

  const { draftMode = false, locale } = ctx;
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const [settings, posts = []] = await Promise.all([
    getSettings(client),
    getPosts(client),
  ]);

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      posts,
      settings,
      draftMode,
      token: authToken,
    },
  };
};

Browse.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
