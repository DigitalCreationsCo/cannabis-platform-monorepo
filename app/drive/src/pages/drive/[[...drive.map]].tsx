/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	selectDriverState,
	selectSocketState,
	socketActions,
	TextContent,
	useAfterMount,
	useAppDispatch,
	useAppSelector,
} from '@cd/core-lib';
import {
	Button,
	ErrorBoundary,
	FlexBox,
	H1,
	H2,
	LoadingDots,
	Page,
} from '@cd/ui-lib';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useRef, useEffect, useState } from 'react';

const center = { lat: -34.397, lng: 150.644 };
const zoom = 4;

const render = (status: Status) => {
	switch (status) {
		case Status.LOADING:
			return <LoadingDots />;
		case Status.FAILURE:
			return <ErrorBoundary />;
		case Status.SUCCESS:
			return <MyMapComponent center={center} zoom={zoom} />;
	}
};

function MapScreen() {
	const [updateOnlineStatus, setUpdateOnlineStatus] = useState(false);

	const { isOnline } = useAppSelector(selectDriverState).driver.driverSession;
	const {
		connectionOpenInit,
		connectionCloseInit,
		isConnectedToDispatch,
		errorMessage,
		message,
		incomingOrder: { newOrder },
	} = useAppSelector(selectSocketState);

	useAfterMount(() => {
		updateOnlineStatus
			? dispatch(socketActions.openConnection())
			: dispatch(socketActions.closingConnection());
		// }
	}, [updateOnlineStatus]);

	const { driver } = useAppSelector(selectDriverState);
	const dispatch = useAppDispatch();

	return (
		<Page className="text-light bg-secondary px-4 pb-0">
			<H1>{`Hi, ${driver.user.firstName}`}</H1>
			<H2>go online to start delivering</H2>
			<FlexBox className="grow place-content-end">
				<Button
					size="lg"
					disabled={connectionOpenInit}
					onClick={() => setUpdateOnlineStatus(!updateOnlineStatus)}
				>
					{isOnline
						? TextContent.dispatch.status.STOP_DELIVERING
						: TextContent.dispatch.status.START_DELIVERING}
				</Button>
			</FlexBox>
			{/* <Wrapper
				apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY_DRIVE_PWA as string}
				render={render}
			/> */}
		</Page>
	);
}

function MyMapComponent({
	center,
	zoom,
}: {
	center: google.maps.LatLngLiteral;
	zoom: number;
}) {
	const ref = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	new window.google.maps.Map(ref.current!, {
	// 		center,
	// 		zoom,
	// 	});
	// });

	return <div ref={ref} id="map" className="w-[200px] h-[200px]" />;
}

export default MapScreen;
