"use client"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';

const Video = ({ Embed }: { Embed: () => JSX.Element }) => {
	const [playVideo, setPlayVideo] = useState(false);

	return (
		<FlexBox className="m-auto h-full max-w-[420px] w-full justify-end">
			<div
				onClick={() => setPlayVideo(!playVideo)}
				className={twMerge(
					'm-auto place-items-center flex items-center content-center relative cursor-pointer bg-gradient-to-tr from-primary hover:from-primary to-primary-light hover:to-secondary-light',
					!playVideo ? 'rounded-full p-2 w-full' : 'w-full h-full'
				)}
			>
				{!playVideo && (
					<button className="w-full items-center self-center text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-16 w-16  lg:h-20 lg:w-20"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="sr-only">Play Video</span>
					</button>
				)}
				{playVideo && <Embed />}
			</div>
		</FlexBox>
	);
};

export default Video;
