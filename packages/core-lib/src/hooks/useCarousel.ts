import { useEffect, useReducer, useState } from 'react';
import { SwipeableHandlers, useSwipeable } from 'react-swipeable';

interface UseCarouselOptions {
	slidesPresented?: number;
	interval?: number;
	transitionTime?: number;
}

// swiped function does not handle vertical swipes
export default function useCarousel(
	length: number,
	options: UseCarouselOptions = {},
): [number, (n: number) => void, SwipeableHandlers, React.CSSProperties] {
	const [state, dispatch] = useReducer(carouselReducer, initialCarouselState),
		[container, setContainer] = useState<HTMLElement | null>(null);

	const {
		slidesPresented = 1,
		transitionTime = 400,
		interval = 4800,
	} = options;

	const maxActiveSlides = Math.max(1, Math.min(slidesPresented, length)),
		totalWidth = 100 / maxActiveSlides,
		borderSlides = slidesPresented * 2,
		slideWidth =
			(container?.getElementsByClassName('carousel-item')?.[0]
				?.clientWidth as number) + 24;

	const style: React.CSSProperties = {
		transform: 'translateX(0)',
		width: `${totalWidth * (length + borderSlides)}%`,
		left: `-${
			totalWidth + (slideWidth * (maxActiveSlides + state.active) - 64)
		}px`,
	};

	// longer timeout after swipe to allow for more movement
	// useEffect(() => {
	//   const id = setTimeout(() => dispatch({ type: 'done' }), interval * 20);
	//   return () => clearTimeout(id);
	// }, [state.dragOffset]);

	// timeout for next slide
	useEffect(() => {
		const id = setTimeout(
			() => dispatch({ type: 'next', length: length }),
			interval,
		);
		return () => clearTimeout(id);
	}, [state.dragOffset, state.active]);

	// send done after desired state change
	useEffect(() => {
		const id = setTimeout(() => dispatch({ type: 'done' }), transitionTime);
		return () => clearTimeout(id);
	}, [state.desired]);

	const animation = {
		elastic: `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
		smooth: `transform ${transitionTime}ms ease`,
	};

	if (state.desired !== state.active) {
		const distance = Math.abs(state.active - state.desired),
			dragDirection = Math.sign(state.dragOffset || 0),
			carouselDirection =
				(distance > length / 2 ? 1 : -1) *
				Math.sign(state.desired - state.active),
			shift = slideWidth && slideWidth * carouselDirection;
		style.transition = animation.smooth;
		style.transform = `translateX(${shift}px)`;
	} else if (!isNaN(state.dragOffset)) {
		if (state.dragOffset !== 0) {
			style.transform = `translateX(${state.dragOffset}px)`;
		} else {
			style.transition = animation.elastic;
		}
	}

	const swipeLowerLimit = 0.3,
		containerSwipeLowerThreshold =
			(container as HTMLElement)?.clientWidth * swipeLowerLimit,
		swipeUpperLimit = 1.2,
		containerSwipeUpperThreshold =
			(container as HTMLElement)?.clientWidth * swipeUpperLimit;

	const { ref, onMouseDown } = useSwipeable({
		onSwiping(e) {
			const direction = e.deltaX > 0 ? -1 : 1;
			dispatch({
				type: 'drag',
				dragOffset:
					direction *
					Math.min(Math.abs(e.deltaX), containerSwipeUpperThreshold),
			});
		},
		onSwipedLeft(e) {
			swiped(e.deltaX, 1);
		},
		onSwipedRight(e) {
			swiped(e.deltaX, -1);
		},
		onSwipedUp(e) {
			swiped(e.deltaY, 1);
		},
		onSwipedDown(e) {
			swiped(e.deltaY, -1);
		},
		trackMouse: true,
		trackTouch: true,
	});

	function swiped(delta: number, direction: 1 | -1) {
		const scrollDelta = direction * delta;

		if (scrollDelta >= containerSwipeLowerThreshold) {
			dispatch(
				direction > 0
					? { type: 'next', length: length }
					: { type: 'prev', length: length },
			);
		} else dispatch({ type: 'drag', dragOffset: 0 });
	}

	const handlers = {
		onMouseDown,
		ref(container: HTMLElement) {
			setContainer(container);
			return ref(container);
		},
	};

	return [
		state.active,
		(n) => dispatch({ type: 'goto', desired: n }),
		handlers,
		style,
	];
}

function carouselReducer(
	state: CarouselState,
	action: CarouselAction,
): CarouselState {
	switch (action.type) {
		case 'prev':
			return {
				...state,
				desired: previous(action.length, state.active),
			};
		case 'next':
			return {
				...state,
				desired: next(action.length, state.active),
			};
		case 'goto':
			return {
				...state,
				desired: action.desired,
			};
		case 'drag':
			return {
				...state,
				dragOffset: action.dragOffset,
			};
		case 'done':
			return {
				...state,
				dragOffset: NaN,
				active: state.desired,
			};
		default:
			return state;
	}
}

function previous(length: number, current: number) {
	return (current - 1 + length) % length;
}

function next(length: number, current: number) {
	return (current + 1) % length;
}

interface CarouselState {
	dragOffset: number;
	active: number;
	desired: number;
}

const initialCarouselState = {
	dragOffset: 0,
	active: 0,
	desired: 0,
};

interface CarouselPrevAction {
	type: 'prev';
	length: number;
}

interface CarouselNextAction {
	type: 'next';
	length: number;
}

interface CarouselGoToAction {
	type: 'goto';
	desired: number;
}

interface CarouselDragAction {
	type: 'drag';
	dragOffset: number;
}

interface CarouselDoneAction {
	type: 'done';
}

type CarouselAction =
	| CarouselPrevAction
	| CarouselNextAction
	| CarouselGoToAction
	| CarouselDragAction
	| CarouselDoneAction;
