import CloseButton from '@cd/ui-lib/src/components/button/CloseButton';
import { Paragraph, Small } from '@cd/ui-lib/src/components/Typography';
import { getBreakpointValue } from '@cd/ui-lib/src/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/img/logo120.png';
import styles from '../styles/theme';
import { type ViewProps } from '../types';

function Launch({ expanded, setExpand, dispensaryName, className }: ViewProps) {
	const [screenwidth, setScreenwidth] = useState(window.innerWidth);
	const setWindowDimensions = () => {
		setScreenwidth(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener('resize', setWindowDimensions);
		return () => {
			window.removeEventListener('resize', setWindowDimensions);
		};
	}, []);
	const md = getBreakpointValue('md');

	const openWidget = () => setExpand(true);
	const closeWidget = (e: any) => {
		e.stopPropagation();
		setExpand(false);
	};

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			onClick={openWidget}
			className={twMerge([styles.launch_f(expanded), className])}
		>
			{expanded ? (
				<div className="flex flex-row items-center">
					<div className="p-6"></div>

					<div className="flex flex-col p-2">
						<Paragraph className="m-auto" color="light">
							{dispensaryName || 'Your dispensary'} is teaming up with Gras for
							home delivery.{' '}
						</Paragraph>

						<Paragraph className="m-auto text-inverse" color="light">
							Place your order at checkout
						</Paragraph>
					</div>

					<div>
						<CloseButton
							iconSize={32}
							className="relative p-2 pr-4 text-light"
							theme={'light'}
							onClick={closeWidget}
						/>
					</div>
				</div>
			) : (
				<div className="flex flex-row items-center">
					{screenwidth >= md && (
						<img
							src={logo}
							alt="Delivery By Gras"
							height={40}
							width={40}
							className="object-contain animate-shake"
						/>
					)}
					<Small color="light" className="items-center">
						Delivery by Gras&nbsp;now at checkout
					</Small>
					{screenwidth >= md && <div className="w-[20px]"></div>}
				</div>
			)}
		</div>
	);
}

export default Launch;
