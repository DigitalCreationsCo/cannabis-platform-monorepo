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
	Center,
	ErrorBoundary,
	FlexBox,
	H1,
	H2,
	IconWrapper,
	LoadingDots,
	Page,
	Paragraph,
	TextField,
} from '@cd/ui-lib';
import icons from '@cd/ui-lib/src/icons';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { errors } from 'formidable';
import { AnimatePresence, motion } from 'framer-motion';
import { set } from 'immer/dist/internal';
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
		isError,
		errorMessage,
		message,
		incomingOrder: { newOrder },
	} = useAppSelector(selectSocketState);

	const [connectionIsBusy, setConnectionIsBusy] = useState(false);

	useAfterMount(() => {
		setConnectionIsBusy(true);
		console.info('use after mount, updateOnlineStatus:', updateOnlineStatus);
		updateOnlineStatus
			? dispatch(socketActions.openConnection())
			: dispatch(socketActions.closingConnection());
		setConnectionIsBusy(connectionOpenInit || connectionCloseInit);
	}, [updateOnlineStatus]);

	const { driver } = useAppSelector(selectDriverState);
	const dispatch = useAppDispatch();

	return (
		<Page className="text-light bg-secondary px-4 pb-0 h-[90vh]">
			<H1>{`Hi, ${driver.user.firstName}`}</H1>
			<H2>go online to start delivering</H2>

			<div className="my-8 h-full">
				<AnimatePresence>
					{isOnline ? (
						<Wrapper
							apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY_DRIVE_PWA as string}
							render={render}
						/>
					) : (
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0, opacity: 0 }}
							className="h-full"
						>
							<Center className="h-full">
								<IconWrapper Icon={icons.Earth} iconSize={66} />
							</Center>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<FlexBox className="place-content-end items-center">
				<Button
					size="lg"
					loading={connectionIsBusy}
					disabled={connectionOpenInit}
					onClick={() => setUpdateOnlineStatus(!updateOnlineStatus)}
				>
					{isOnline
						? TextContent.dispatch.status.STOP_DELIVERING
						: TextContent.dispatch.status.START_DELIVERING}
				</Button>
				<Paragraph>{isError && errorMessage}</Paragraph>
			</FlexBox>
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

	useEffect(() => {
		new window.google.maps.Map(ref.current!, {
			center,
			zoom,
			mapTypeControl: false,
			rotateControl: false,
			streetViewControl: false,
			fullscreenControl: false,
			keyboardShortcuts: false,
		});
	});

	return (
		<motion.div
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{ scale: 0, opacity: 0 }}
			className="h-full w-full"
		>
			<div ref={ref} id="map" className="h-full w-full rounded" />
		</motion.div>
	);
}

export default MapScreen;
