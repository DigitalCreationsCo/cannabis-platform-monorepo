import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { H6, Small } from './Typography';

export interface DropZoneProps {
	onChange?: any;
	title?: string;
	imageSize?: string;
	maxFiles?: number;
}

export default function DropZone({
	onChange,
	title = 'Drag & drop image here',
	imageSize = 'Upload 280*280 image',
	maxFiles = 3,
}: DropZoneProps) {
	const onDrop = useCallback(
		(acceptedFiles: any) => {
			if (onChange) onChange(acceptedFiles);
		},
		[onChange],
	);
	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		onDrop,
		maxFiles: maxFiles,
		multiple: true,
		accept: {
			'image/jpeg': [],
			'image/png': [],
		},
		noClick: true,
	});
	return (
		<div
			{...getRootProps({
				className: twMerge(
					'min-h-[200px] items-center border rounded-btn bg-light border-accent flex flex-col justify-center',
					isDragActive ? 'bg-accent' : 'transparent',
					'transition outline-none',
					'dropzone',
				),
			})}
		>
			<input {...getInputProps()} />
			<H6>{title}</H6>
			<div className="w-[200px] mx-auto"></div>
			<Button type="button" onClick={open}>
				Select files
			</Button>
			<Small>{imageSize}</Small>
		</div>
	);
}
