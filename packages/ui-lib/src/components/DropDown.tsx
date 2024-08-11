import { ChevronDownIcon as ChevronDown } from '@heroicons/react/24/outline';
import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useOnClickOutside } from 'usehooks-ts';

const AnimatedDropdown = ({
	title = '',
	ButtonComponent,
	items,
	isOpen,
	setIsOpen,
	openDirection = 'down',
	origin,
}: {
	title?: string;
	ButtonComponent?: React.FC;
	items: React.ReactNode;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	openDirection?: 'up' | 'down';
} & {
	origin?:
		| 'top-right'
		| 'top-left'
		| 'bottom-right'
		| 'bottom-left'
		| 'center'
		| 'left'
		| 'top'
		| 'bottom'
		| 'right';
}) => {
	useEffect(() => {
		if (document.activeElement) {
			(document.activeElement as HTMLElement).blur();
		}
	}, [isOpen]);

	const ref = useRef(null);
	useOnClickOutside(
		ref,
		() => {
			setIsOpen(false);
		},
		'touchend',
		{
			passive: true,
		}
	);

	const AnimatedChevron = ({ openDirection = 'down', isOpen }) => {
		const baseRotation = openDirection === 'down' ? 0 : 180;
		const rotation = isOpen ? baseRotation + 180 : baseRotation;

		return (
			<ChevronDown
				className="w-6 h-6 transition-transform ease-in-out"
				style={{ transform: `rotate(${rotation}deg)` }}
			/>
		);
	};

	return (
		<>
			{ButtonComponent && <ButtonComponent />}
			{!ButtonComponent && (
				<button
					type="button"
					className="btn btn-ghost rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					onClick={() => setIsOpen(!isOpen)}
				>
					{title}
					<AnimatedChevron openDirection="down" isOpen={isOpen} />
				</button>
			)}

			<div
				className={twMerge(
					(openDirection === 'down' && 'bottom-0') || 'top-0',
					`-z-0 left-0 absolute w-full shadow-lg bg-gray-200 ring-1 ring-black ring-opacity-5 transition-all ease-in-out`,
					isOpen
						? `transform opacity-100 ${(openDirection === 'down' && 'rounded-md translate-y-full') || 'rounded-t-md -translate-y-full'} scale-[1.01]`
						: `transform translate-y-full opacity-0 pointer-events-none ${(origin && 'scale-0 origin-' + origin) || 'scale-95'}`
				)}
			>
				{/* <ul
					// className="py-1 dropdown-content dark:border-gray-600 p-2 shadow-md bg-light w-full rounded-b border-t"
					className="shadow-md w-full text-dark"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="options-menu"
				> */}
				{items}
				{/* </ul> */}
			</div>
		</>
	);
};

export default AnimatedDropdown;
