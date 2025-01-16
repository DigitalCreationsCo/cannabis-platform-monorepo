import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { H4 } from './Typography';

const Ticker = (props: { text: string }) => {
	const [ticker, setTicker] = useState(0);

	const length = 600,
		speed = 10;
	// position = 0;
	// let shift = length + speed;

	const style: React.CSSProperties = {
		transition: !ticker ? `none` : `transform ${speed}s linear`,
		transform: ticker ? `translateX(-${length}px)` : `translateX(${length}px)`,
		right: `${length * ticker === 0 ? -1 : 1}px`,
	};

	function runTicker() {
		setTicker(1);
		setTimeout(() => {
			setTicker(0);
		}, 13000);
	}

	useEffect(() => {
		if (ticker === 0) {
			setTimeout(() => {
				runTicker();
			}, 1000);
		}
	}, [ticker]);

	return (
		<div className={twMerge('shadow, shadow-lg, rounded')}>
			<div className="absolute h-full" style={style}>
				<H4 className="text-inverse-soft z-10 flex h-full items-center text-xl tracking-wide">
					{props.text}
				</H4>
			</div>
		</div>
	);
};

export default Ticker;
