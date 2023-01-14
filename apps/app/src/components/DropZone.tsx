import { Button, FlexBox, H5, H6, Paragraph, Small } from '@cd/shared-ui';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

export interface DropZoneProps {
    onChange?: (files: []) => void;
    title?: string;
    imageSize?: string;
}

export default function DropZone({
    onChange,
    title = 'Drag & drop product image here',
    imageSize = 'Upload 280*280 image',
}: DropZoneProps) {
    const onDrop = useCallback((acceptedFiles) => {
        if (onChange) onChange(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 3,
        multiple: true,
        accept: { 'image/*': [] },
    });
    return (
        <FlexBox
            {...getRootProps({
                className: twMerge(
                    'min-h-[200px] items-center border rounded-btn bg-light border-accent flex-col justify-center',
                    isDragActive ? 'bg-accent' : 'transparent',
                    'transition outline-none',
                    'dropzone'
                ),
            })}
        >
            <input {...getInputProps()} />
            <H6>{title}</H6>
            <div className="w-[200px] mx-auto"></div>
            <Paragraph className={twMerge('px-2 mb-2 mt-1', isDragActive ? 'bg-accent' : 'bg-dark-soft')}>on</Paragraph>
            <Button type="button" onClick={open}>
                Select files
            </Button>
            <Small>{imageSize}</Small>
        </FlexBox>
    );
}
