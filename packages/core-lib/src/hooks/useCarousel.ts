// import { useEffect, useReducer, useState } from 'react';
// import { SwipeableHandlers, useSwipeable } from 'react-swipeable';

// // defines the time for the animation between slides in milliseconds
// const transitionTime = 400;
// // defines the threshold when to accept a swipe
// const threshold = 0.3;
// // defines the limit for swiping (max. the next full and a bit)
// const limit = 1.2;
// // animation to be used when bouncing back
// const elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
// // animation to be used when automatically sliding
// const smooth = `transform ${transitionTime}ms ease`;

// interface CarouselState {
//   dragOffset: number;
//   desired: number;
//   active: number;
// }

// const initialCarouselState: CarouselState = {
//   dragOffset: 0,
//   desired: 0,
//   active: 0,
// };

// interface CarouselNextAction {
//   type: 'next';
//   length: number;
// }

// interface CarouselPrevAction {
//   type: 'prev';
//   length: number;
// }

// interface CarouselJumpAction {
//   type: 'jump';
//   desired: number;
// }

// interface CarouselDoneAction {
//   type: 'done';
// }

// interface CarouselDragAction {
//   type: 'drag';
//   dragOffset: number;
// }

// type CarouselAction =
//   | CarouselJumpAction
//   | CarouselNextAction
//   | CarouselPrevAction
//   | CarouselDragAction
//   | CarouselDoneAction;

// function previous(length: number, current: number) {
//   return (current - 1 + length) % length;
// }

// function next(length: number, current: number) {
//   return (current + 1) % length;
// }

// function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
//   switch (action.type) {
//     case 'jump':
//       return {
//         ...state,
//         desired: action.desired,
//       };
//     case 'next':
//       return {
//         ...state,
//         desired: next(action.length, state.active),
//       };
//     case 'prev':
//       return {
//         ...state,
//         desired: previous(action.length, state.active),
//       };
//     case 'done':
//       return {
//         ...state,
//         dragOffset: NaN,
//         active: state.desired,
//       };
//     case 'drag':
//       return {
//         ...state,
//         dragOffset: action.dragOffset,
//       };
//     default:
//       return state;
//   }
// }

// function swiped(
//   delta: number,
//   dispatch: React.Dispatch<CarouselAction>,
//   length: number,
//   dir: 1 | -1,
//   container: HTMLElement,
// ) {
//   const t = container.clientWidth * threshold;
//   const d = dir * delta;

//   if (d >= t) {
//     dispatch(dir > 0 ? { type: 'next', length } : { type: 'prev', length });
//   } else {
//     dispatch({
//       type: 'drag',
//       dragOffset: 0,
//     });
//   }
// }

// export interface CarouselOptions {
//   slidesPresented?: number;
// }

// export default function useCarousel(
//   length: number,
//   interval: number,
//   options: CarouselOptions = {},
// ): [number, (n: number) => void, SwipeableHandlers, React.CSSProperties] {
  
//   const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);
//   const [container, setContainer] = useState<HTMLElement | undefined>(undefined);
//   const { ref, onMouseDown } = useSwipeable({
//     onSwiping(e) {
//       const sign = e.deltaX > 0 ? -1 : 1;
//       dispatch({
//         type: 'drag',
//         dragOffset: sign * Math.min(Math.abs(e.deltaX), limit * (container as HTMLElement).clientWidth),
//       });
//     },
//     onSwipedLeft(e) {
//       swiped(e.deltaX, dispatch, length, 1, container as HTMLElement);
//     },
//     onSwipedRight(e) {
//       swiped(e.deltaX, dispatch, length, -1, container as HTMLElement);
//     },
//     trackMouse: true,
//     trackTouch: true,
//   });
//   const handlers = {
//     onMouseDown,
//     ref(container: HTMLElement) {
//       setContainer(container?.firstElementChild as any);
//       return ref(container);
//     },
//   };

//   useEffect(() => {
//     const id = setTimeout(() => dispatch({ type: 'next', length }), interval);
//     return () => clearTimeout(id);
//   }, [state.dragOffset, state.active]);

//   useEffect(() => {
//     const id = setTimeout(() => dispatch({ type: 'done' }), transitionTime);
//     return () => clearTimeout(id);
//   }, [state.desired]);

//   const { slidesPresented = 1 } = options;

//   const n = Math.max(1, Math.min(slidesPresented, length));
//   const totalWidth = 100 / n;
//   const shadowSlides = 2 * slidesPresented;

//   const
//   slideWidth = container?.getElementsByClassName('carousel-item')?.[0]?.clientWidth;
  
//   const style: React.CSSProperties = {
//     transform: 'translateX(0)',
//     width: `${totalWidth * (length + shadowSlides)}%`,
//     // left: `-${(state.active + 1) * totalWidth}%`,

//     left: `-${(state.active + 1) * length}%`,
//     // left: `-${slideWidth && (totalWidth * (state.active + 1) + (slideWidth))}%`,
//     // left: `-${((((slideWidth && slideWidth + state.active * 2 - shadowSlides)) * state.active + 2))}%`,
//     // left: `-${slideWidth && ((totalWidth - slideWidth))}px`,
//   };

//   if (state.desired !== state.active) {
//     const dist = Math.abs(state.active - state.desired);
//     const pref = Math.sign(state.dragOffset || 0);
//     const dir = (dist > length / 2 ? 1 : -1) * Math.sign(state.desired - state.active);
//     const shift = (totalWidth * (pref || dir)) / (length + shadowSlides);
//     style.transition = smooth;
//     // style.transform = `translateX(${shift}%)`;
//   } else if (!isNaN(state.dragOffset)) {
//     if (state.dragOffset !== 0) {
//       style.transform = `translateX(${state.dragOffset}px)`;
//     } else {
//       style.transition = elastic;
//     }
//   }

//   return [state.active, n => dispatch({ type: 'jump', desired: n }), handlers, style];
// }
import { useEffect, useReducer, useState } from 'react';
import { SwipeableHandlers, useSwipeable } from 'react-swipeable';

interface UseCarouselOptions {
  slidesPresented?: number;
  interval?: number;
  transitionTime?: number;
}

// swiped function does not handle vertical swipes
export default function useCarousel(length: number, options: UseCarouselOptions = {}): [number, (n: number) => void, SwipeableHandlers, React.CSSProperties] {

  const 
  [state, dispatch] = useReducer(carouselReducer, initialCarouselState),
  [container, setContainer] = useState<HTMLElement | null>(null);

  const { 
    slidesPresented = 1, 
    transitionTime = 400,
    interval = 5500 
  } = options;

  const
  maxActiveSlides = Math.max(1, Math.min(slidesPresented, length)),
  totalWidth = 100 / maxActiveSlides,
  borderSlides = slidesPresented * 2,
  slideWidth = container?.getElementsByClassName('carousel-item')?.[0]?.clientWidth as number + 24;

  // console.log('active', state.active);
  
  const style: React.CSSProperties = {
    transform: 'translateX(0)',
    width: `${totalWidth * (length + borderSlides)}%`,
    left: `-${((totalWidth + (slideWidth * (maxActiveSlides + (state.active)) - 64 )))}px`,
  }

  // console.log('total width', style.width);
  // console.log('left', style.left);
  
  // longer timeout after swipe to allow for more movement
  // useEffect(() => {
  //   const id = setTimeout(() => dispatch({ type: 'done' }), interval * 20);
  //   return () => clearTimeout(id);
  // }, [state.dragOffset]);

  // timeout for next slide
  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'next', length: length }), interval);
    return () => clearTimeout(id);
  }, [state.dragOffset, state.active]);

  // send done after desired state change
  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: 'done' }), transitionTime);
    return () => clearTimeout(id);
  }, [state.desired]);

  const 
  animation = {
    elastic: `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
    smooth: `transform ${transitionTime}ms ease`
  };

  if (state.desired !== state.active) {
    const
    distance = Math.abs(state.active - state.desired),
    dragDirection = Math.sign(state.dragOffset || 0),
    carouselDirection = (distance > length / 2 ? 1 : -1) * Math.sign(state.desired - state.active),
    // shift = ( (slideWidth / maxActiveSlides) / (state.active + 1) + borderSlides);
    shift = slideWidth && slideWidth * (carouselDirection);
    console.log('shift', shift);
    style.transition = animation.smooth;
    style.transform = `translateX(${shift}px)`;
  }
  else if (!isNaN(state.dragOffset)) {
    if (state.dragOffset !== 0) {
      style.transform = `translateX(${state.dragOffset}px)`;
    } else {
      style.transition = animation.elastic;
    }
  }

  const
  swipeLowerLimit = 0.3,
  containerSwipeLowerThreshold = (container as HTMLElement)?.clientWidth * swipeLowerLimit,
  swipeUpperLimit = 1.2,
  containerSwipeUpperThreshold = (container as HTMLElement)?.clientWidth * swipeUpperLimit;

  const 
  { ref, onMouseDown } = useSwipeable({
    onSwiping(e) {
      const
      direction = e.deltaX > 0 ? -1 : 1;
      dispatch({
        type: 'drag',
        dragOffset: direction * Math.min(Math.abs(e.deltaX), containerSwipeUpperThreshold)
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

  function swiped ( delta: number, direction: 1 | -1 ) {
    const
    scrollDelta = direction * delta;

    if (scrollDelta >= containerSwipeLowerThreshold) {
      dispatch(direction > 0 ? { type: 'next', length: length }: { type: 'prev', length: length })
    }
    else
    // dispatch({ type: 'drag', dragOffset: scrollDelta })
    dispatch({ type: 'drag', dragOffset: 0 })
  }

  const
  handlers = {
    onMouseDown,
    ref(container: HTMLElement) {
      setContainer(container);
      return ref(container);
    }
  }
  
  return [state.active, n => dispatch({ type: 'goto', desired: n }), handlers, style];
}



function carouselReducer (state: CarouselState, action: CarouselAction): CarouselState {
  switch (action.type) {
    case 'prev':
      return {
        ...state,
        desired: previous(action.length, state.active)
      }
    case 'next':
      return {
        ...state,
        desired: next(action.length, state.active)
      }
    case 'goto':
      return {
        ...state,
        desired: action.desired
      }
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
